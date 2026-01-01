"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { mat4, quat, vec2, vec3 } from 'gl-matrix';
import Section from "./Section";
import InteractiveHint from "./InteractiveHint";
import { benefits } from "../constants";
import './InfiniteMenu.css';

// --- WebGL Shaders ---
const discVertShaderSource = `#version 300 es
uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;
in vec3 aModelPosition;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;
out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;
void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);
    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    float radius = length(centerPos.xyz);
    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0., abs(strength) - 1.);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
        worldPosition.xyz += stretchDir * strength;
    }
    worldPosition.xyz = radius * normalize(worldPosition.xyz);
    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;
    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}`;

const discFragShaderSource = `#version 300 es
precision highp float;
uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;
out vec4 outColor;
in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;
void main() {
    int itemIndex = vInstanceId % uItemCount;
    int cellsPerRow = uAtlasSize;
    int cellX = itemIndex % cellsPerRow;
    int cellY = itemIndex / cellsPerRow;
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;
    ivec2 texSize = textureSize(uTex, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float containerAspect = 1.0;
    float scale = max(imageAspect / containerAspect, containerAspect / imageAspect);
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = (st - 0.5) * scale + 0.5;
    st = clamp(st, 0.0, 1.0);
    st = st * cellSize + cellOffset;
    outColor = texture(uTex, st);
    outColor.a *= vAlpha;
}`;

// --- Geometry Helpers ---
class Face { constructor(a, b, c) { this.a = a; this.b = b; this.c = c; } }
class Vertex {
  constructor(x, y, z) {
    this.position = vec3.fromValues(x, y, z);
    this.normal = vec3.create();
    this.uv = vec2.create();
  }
}
class Geometry {
  constructor() { this.vertices = []; this.faces = []; }
  addVertex(...args) {
    for (let i = 0; i < args.length; i += 3) {
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));
    }
    return this;
  }
  addFace(...args) {
    for (let i = 0; i < args.length; i += 3) {
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));
    }
    return this;
  }
  get lastVertex() { return this.vertices[this.vertices.length - 1]; }
  subdivide(divisions = 1) {
    const midPointCache = {};
    let f = this.faces;
    for (let div = 0; div < divisions; ++div) {
      const newFaces = new Array(f.length * 4);
      f.forEach((face, ndx) => {
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);
        const i = ndx * 4;
        newFaces[i + 0] = new Face(face.a, mAB, mCA);
        newFaces[i + 1] = new Face(face.b, mBC, mAB);
        newFaces[i + 2] = new Face(face.c, mCA, mBC);
        newFaces[i + 3] = new Face(mAB, mBC, mCA);
      });
      f = newFaces;
    }
    this.faces = f;
    return this;
  }
  spherize(radius = 1) {
    this.vertices.forEach(vertex => {
      vec3.normalize(vertex.normal, vertex.position);
      vec3.scale(vertex.position, vertex.normal, radius);
    });
    return this;
  }
  get data() {
    return {
      vertices: new Float32Array(this.vertices.flatMap(v => Array.from(v.position))),
      indices: new Uint16Array(this.faces.flatMap(f => [f.a, f.b, f.c])),
      normals: new Float32Array(this.vertices.flatMap(v => Array.from(v.normal))),
      uvs: new Float32Array(this.vertices.flatMap(v => Array.from(v.uv)))
    };
  }
  getMidPoint(ndxA, ndxB, cache) {
    const cacheKey = ndxA < ndxB ? `k_${ndxB}_${ndxA}` : `k_${ndxA}_${ndxB}`;
    if (cache[cacheKey] !== undefined) return cache[cacheKey];
    const a = this.vertices[ndxA].position;
    const b = this.vertices[ndxB].position;
    const ndx = this.vertices.length;
    cache[cacheKey] = ndx;
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    return ndx;
  }
}

class IcosahedronGeometry extends Geometry {
  constructor() {
    super();
    const t = Math.sqrt(5) * 0.5 + 0.5;
    this.addVertex(-1, t, 0, 1, t, 0, -1, -t, 0, 1, -t, 0, 0, -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t, t, 0, -1, t, 0, 1, -t, 0, -1, -t, 0, 1)
      .addFace(0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1);
  }
}

class DiscGeometry extends Geometry {
  constructor(steps = 4, radius = 1) {
    super();
    steps = Math.max(4, steps);
    const alpha = (2 * Math.PI) / steps;
    this.addVertex(0, 0, 0);
    this.lastVertex.uv[0] = 0.5; this.lastVertex.uv[1] = 0.5;
    for (let i = 0; i < steps; ++i) {
      const x = Math.cos(alpha * i); const y = Math.sin(alpha * i);
      this.addVertex(radius * x, radius * y, 0);
      this.lastVertex.uv[0] = x * 0.5 + 0.5; this.lastVertex.uv[1] = y * 0.5 + 0.5;
      if (i > 0) this.addFace(0, i, i + 1);
    }
    this.addFace(0, steps, 1);
  }
}

// --- WebGL Context Helpers ---
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.error(gl.getShaderInfoLog(shader)); gl.deleteShader(shader); return null;
}
function createProgram(gl, shaderSources, transformFeedbackVaryings, attribLocations) {
  const program = gl.createProgram();
  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {
    const shader = createShader(gl, type, shaderSources[ndx]);
    if (shader) gl.attachShader(program, shader);
  });
  if (attribLocations) { for (const attrib in attribLocations) gl.bindAttribLocation(program, attribLocations[attrib], attrib); }
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  console.error(gl.getProgramInfoLog(program)); gl.deleteProgram(program); return null;
}
function makeVertexArray(gl, bufLocNumElmPairs, indices) {
  const va = gl.createVertexArray(); gl.bindVertexArray(va);
  for (const [buffer, loc, numElem] of bufLocNumElmPairs) {
    if (loc === -1) continue;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);
  }
  if (indices) {
    const indexBuffer = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  }
  gl.bindVertexArray(null); return va;
}
function makeBuffer(gl, sizeOrData, usage) {
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage); gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return buf;
}
function createAndSetupTexture(gl, minFilter, magFilter, wrapS, wrapT) {
  const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
  return texture;
}

class ArcballControl {
  constructor(canvas, updateCallback) {
    this.canvas = canvas; this.updateCallback = updateCallback || (() => null);
    this.isPointerDown = false; this.orientation = quat.create(); this.pointerRotation = quat.create();
    this.rotationVelocity = 0; this.rotationAxis = vec3.fromValues(1, 0, 0);
    this.snapDirection = vec3.fromValues(0, 0, -1); this.snapTargetDirection = null;
    this.pointerPos = vec2.create(); this.previousPointerPos = vec2.create();
    this._rotationVelocity = 0; this._combinedQuat = quat.create();
    canvas.addEventListener('pointerdown', e => {
      vec2.set(this.pointerPos, e.clientX, e.clientY); vec2.copy(this.previousPointerPos, this.pointerPos);
      this.isPointerDown = true;
    });
    canvas.addEventListener('pointerup', () => this.isPointerDown = false);
    canvas.addEventListener('pointerleave', () => this.isPointerDown = false);
    canvas.addEventListener('pointermove', e => { if (this.isPointerDown) vec2.set(this.pointerPos, e.clientX, e.clientY); });
    canvas.style.touchAction = 'none';
  }
  update(deltaTime, targetFrameDuration = 16) {
    const timeScale = deltaTime / targetFrameDuration + 0.00001;
    let angleFactor = timeScale; let snapRotation = quat.create();
    if (this.isPointerDown) {
      const INTENSITY = 0.3 * timeScale; const ANGLE_AMPLIFICATION = 5 / timeScale;
      const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);
      vec2.scale(midPointerPos, midPointerPos, INTENSITY);
      if (vec2.sqrLen(midPointerPos) > 0.1) {
        vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);
        const p = this.#project(midPointerPos); const q = this.#project(this.previousPointerPos);
        const a = vec3.normalize(vec3.create(), p); const b = vec3.normalize(vec3.create(), q);
        vec2.copy(this.previousPointerPos, midPointerPos);
        angleFactor *= ANGLE_AMPLIFICATION;
        this.quatFromVectors(a, b, this.pointerRotation, angleFactor);
      } else { quat.slerp(this.pointerRotation, this.pointerRotation, quat.create(), INTENSITY); }
    } else {
      const INTENSITY = 0.1 * timeScale; quat.slerp(this.pointerRotation, this.pointerRotation, quat.create(), INTENSITY);
      if (this.snapTargetDirection) {
        const SNAPPING_INTENSITY = 0.2; const a = this.snapTargetDirection; const b = this.snapDirection;
        const sqrDist = vec3.squaredDistance(a, b);
        angleFactor *= SNAPPING_INTENSITY * Math.max(0.1, 1 - sqrDist * 10);
        this.quatFromVectors(a, b, snapRotation, angleFactor);
      }
    }
    const combinedQuat = quat.multiply(quat.create(), snapRotation, this.pointerRotation);
    this.orientation = quat.multiply(quat.create(), combinedQuat, this.orientation); quat.normalize(this.orientation, this.orientation);
    quat.slerp(this._combinedQuat, this._combinedQuat, combinedQuat, 0.8 * timeScale); quat.normalize(this._combinedQuat, this._combinedQuat);
    const rad = Math.acos(this._combinedQuat[3]) * 2.0; const s = Math.sin(rad / 2.0);
    let rv = 0;
    if (s > 0.000001) {
      rv = rad / (2 * Math.PI);
      this.rotationAxis[0] = this._combinedQuat[0] / s; this.rotationAxis[1] = this._combinedQuat[1] / s; this.rotationAxis[2] = this._combinedQuat[2] / s;
    }
    this._rotationVelocity += (rv - this._rotationVelocity) * 0.5 * timeScale;
    this.rotationVelocity = this._rotationVelocity / timeScale;
    this.updateCallback(deltaTime);
  }
  quatFromVectors(a, b, out, angleFactor = 1) {
    const axis = vec3.cross(vec3.create(), a, b); vec3.normalize(axis, axis);
    const d = Math.max(-1, Math.min(1, vec3.dot(a, b))); const angle = Math.acos(d) * angleFactor;
    quat.setAxisAngle(out, axis, angle); return { q: out, axis, angle };
  }
  #project(pos) {
    const r = 2; const w = this.canvas.clientWidth; const h = this.canvas.clientHeight; const s = Math.max(w, h) - 1;
    const x = (2 * pos[0] - w - 1) / s; const y = (2 * pos[1] - h - 1) / s;
    let z = 0; const xySq = x * x + y * y; const rSq = r * r;
    if (xySq <= rSq / 2.0) z = Math.sqrt(rSq - xySq); else z = rSq / Math.sqrt(xySq);
    return vec3.fromValues(-x, y, z);
  }
}

class InfiniteGridMenu {
  TARGET_FRAME_DURATION = 1000 / 60;
  SPHERE_RADIUS = 2;
  constructor(canvas, items, onActiveItemChange, onMovementChange, onInit = null, scale = 1.0) {
    this.canvas = canvas; this.items = items || []; this.onActiveItemChange = onActiveItemChange || (() => { });
    this.onMovementChange = onMovementChange || (() => { }); this.scaleFactor = scale;
    this.camera = { matrix: mat4.create(), near: 0.1, far: 40, fov: Math.PI / 4, aspect: 1, position: vec3.fromValues(0, 0, 3 * scale), up: vec3.fromValues(0, 1, 0), matrices: { view: mat4.create(), projection: mat4.create(), inversProjection: mat4.create() } };
    this.#time = 0; this.#init(onInit);
  }
  #time = 0; #frames = 0;
  resize() {
    const gl = this.gl;
    const dpr = Math.min(2, window.devicePixelRatio);
    const displayWidth = Math.round(gl.canvas.clientWidth * dpr); const displayHeight = Math.round(gl.canvas.clientHeight * dpr);
    if (gl.canvas.width !== displayWidth || gl.canvas.height !== displayHeight) { gl.canvas.width = displayWidth; gl.canvas.height = displayHeight; }
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    this.camera.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const height = this.SPHERE_RADIUS * 0.35; const distance = this.camera.position[2];
    this.camera.fov = (this.camera.aspect > 1) ? 2 * Math.atan(height / distance) : 2 * Math.atan(height / this.camera.aspect / distance);
    mat4.perspective(this.camera.matrices.projection, this.camera.fov, this.camera.aspect, this.camera.near, this.camera.far);
  }
  run(time = 0) {
    const deltaTime = Math.min(32, time - this.#time); this.#time = time;
    const deltaFrames = deltaTime / this.TARGET_FRAME_DURATION; this.#frames += deltaFrames;
    this.control.update(deltaTime, this.TARGET_FRAME_DURATION);
    const gl = this.gl;
    const positions = (this.icoGeo.vertices.map(v => v.position)).map(p => vec3.transformQuat(vec3.create(), p, this.control.orientation));
    positions.forEach((p, ndx) => {
      const s = (Math.abs(p[2]) / this.SPHERE_RADIUS) * 0.6 + 0.4; const finalScale = s * 0.25; const matrix = mat4.create();
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));
      mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));
      mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale]));
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]));
      this.discInstances.matrices[ndx].set(matrix);
    });
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer); gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.discInstances.matricesArray);
    this.#onControlUpdate(deltaTime);
    gl.useProgram(this.discProgram); gl.enable(gl.CULL_FACE); gl.enable(gl.DEPTH_TEST); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, mat4.create()); gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view); gl.uniformMatrix4fv(this.discLocations.uProjectionMatrix, false, this.camera.matrices.projection);
    gl.uniform3fv(this.discLocations.uCameraPosition, this.camera.position); gl.uniform4f(this.discLocations.uRotationAxisVelocity, this.control.rotationAxis[0], this.control.rotationAxis[1], this.control.rotationAxis[2], this.control.rotationVelocity * 1.1);
    gl.uniform1i(this.discLocations.uItemCount, this.items.length); gl.uniform1i(this.discLocations.uAtlasSize, this.atlasSize);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.tex); gl.bindVertexArray(this.discVAO);
    gl.drawElementsInstanced(gl.TRIANGLES, this.discGeo.data.indices.length, gl.UNSIGNED_SHORT, 0, this.icoGeo.vertices.length);
    requestAnimationFrame(t => this.run(t));
  }
  #init(onInit) {
    this.gl = this.canvas.getContext('webgl2', { antialias: true }); const gl = this.gl;
    this.discProgram = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, { aModelPosition: 0, aModelUvs: 2, aInstanceMatrix: 3 });
    this.discLocations = { aModelPosition: 0, aModelUvs: 2, aInstanceMatrix: 3, uWorldMatrix: gl.getUniformLocation(this.discProgram, 'uWorldMatrix'), uViewMatrix: gl.getUniformLocation(this.discProgram, 'uViewMatrix'), uProjectionMatrix: gl.getUniformLocation(this.discProgram, 'uProjectionMatrix'), uCameraPosition: gl.getUniformLocation(this.discProgram, 'uCameraPosition'), uRotationAxisVelocity: gl.getUniformLocation(this.discProgram, 'uRotationAxisVelocity'), uTex: gl.getUniformLocation(this.discProgram, 'uTex'), uItemCount: gl.getUniformLocation(this.discProgram, 'uItemCount'), uAtlasSize: gl.getUniformLocation(this.discProgram, 'uAtlasSize') };
    this.discGeo = new DiscGeometry(56, 1);
    this.discVAO = makeVertexArray(gl, [[makeBuffer(gl, this.discGeo.data.vertices, gl.STATIC_DRAW), 0, 3], [makeBuffer(gl, this.discGeo.data.uvs, gl.STATIC_DRAW), 2, 2]], this.discGeo.data.indices);
    this.icoGeo = new IcosahedronGeometry(); this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);
    this.discInstances = { matricesArray: new Float32Array(this.icoGeo.vertices.length * 16), matrices: [], buffer: gl.createBuffer() };
    for (let i = 0; i < this.icoGeo.vertices.length; ++i) { this.discInstances.matrices.push(new Float32Array(this.discInstances.matricesArray.buffer, i * 16 * 4, 16)); }
    gl.bindVertexArray(this.discVAO); gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer); gl.bufferData(gl.ARRAY_BUFFER, this.discInstances.matricesArray.byteLength, gl.DYNAMIC_DRAW);
    for (let j = 0; j < 4; ++j) { const loc = 3 + j; gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 64, j * 16); gl.vertexAttribDivisor(loc, 1); }
    this.atlasSize = Math.ceil(Math.sqrt(this.items.length)); this.tex = createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
    const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d'); const cellSize = 512;
    canvas.width = this.atlasSize * cellSize; canvas.height = this.atlasSize * cellSize;
    Promise.all(this.items.map(item => new Promise(resolve => { const img = new Image(); img.crossOrigin = 'anonymous'; img.onload = () => resolve(img); img.src = item.image; }))).then(images => {
      images.forEach((img, i) => { ctx.drawImage(img, (i % this.atlasSize) * cellSize, Math.floor(i / this.atlasSize) * cellSize, cellSize, cellSize); });
      gl.bindTexture(gl.TEXTURE_2D, this.tex); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas); gl.generateMipmap(gl.TEXTURE_2D);
    });
    this.control = new ArcballControl(this.canvas); this.resize(); if (onInit) onInit(this);
  }
  #onControlUpdate(deltaTime) {
    const isMoving = this.control.isPointerDown || Math.abs(this.control.rotationVelocity) > 0.01;
    if (isMoving !== this.movementActive) { this.movementActive = isMoving; this.onMovementChange(isMoving); }
    if (!this.control.isPointerDown) {
      const n = this.control.snapDirection; const nt = vec3.transformQuat(vec3.create(), n, quat.conjugate(quat.create(), this.control.orientation));
      let maxD = -1, nearestIdx;
      for (let i = 0; i < this.icoGeo.vertices.length; ++i) { const d = vec3.dot(nt, this.icoGeo.vertices[i].position); if (d > maxD) { maxD = d; nearestIdx = i; } }
      this.onActiveItemChange(nearestIdx % this.items.length);
      this.control.snapTargetDirection = vec3.normalize(vec3.create(), vec3.transformQuat(vec3.create(), this.icoGeo.vertices[nearestIdx].position, this.control.orientation));
    }
    this.camera.position[2] += ((this.control.isPointerDown ? (3 * this.scaleFactor + this.control.rotationVelocity * 80 + 2.5) : (3 * this.scaleFactor)) - this.camera.position[2]) / (this.control.isPointerDown ? 7 : 5);
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up); mat4.invert(this.camera.matrices.view, this.camera.matrix);
  }
}

// --- React Component ---
export default function Benefits() {
  const canvasRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [scale, setScale] = useState(1.0);

  // Map benefits to the menu format
  const menuItems = benefits.map(b => ({
    image: b.backgroundUrl,
    title: b.title,
    description: b.text,
    icon: b.iconUrl
  }));

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 768) setScale(0.6);
      else if (window.innerWidth < 1024) setScale(0.8);
      else setScale(1.0);
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const sketch = new InfiniteGridMenu(canvas, menuItems, idx => setActiveItem(menuItems[idx]), setIsMoving, sk => sk.run(), scale);
    const handleResize = () => sketch.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('resize', handleResize);
    };
  }, [scale]);

  return (
    <Section id="Services">
      <div className="relative w-full h-[850px] md:h-[800px] bg-white overflow-hidden py-10">
        <div className="absolute top-8 left-0 w-full z-30 pointer-events-none px-4">
          <AnimatedHeading />
        </div>

        <div className="w-full h-full relative z-10 flex flex-col md:block">
          <canvas ref={canvasRef} id="infinite-grid-menu-canvas" className="z-0" />

          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 pointer-events-none">
            <InteractiveHint
              isVisible={!isMoving}
            />
          </div>

          {activeItem && (
            <div className="absolute inset-0 pointer-events-none z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isMoving ? 0 : 1,
                  y: isMoving ? 10 : 0
                }}
                className={`face-title-wrapper ${isMoving ? 'inactive' : 'active'}`}
              >
                <h2 className="face-title px-6 text-center md:text-left">
                  {activeItem.title}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isMoving ? 0 : 1,
                  y: isMoving ? 10 : 0
                }}
                className={`face-description-wrapper ${isMoving ? 'inactive' : 'active'}`}
              >
                <p className="face-description px-6 text-center md:text-left">
                  {activeItem.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: isMoving ? 0 : 1.2,
                  opacity: isMoving ? 0 : 1
                }}
                className={`action-button ${isMoving ? 'inactive' : 'active'}`}
              >
                <img src={activeItem.icon} alt="Icon" className="action-button-icon" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

const AnimatedHeading = () => {
  const words = ["Why", "Medrox", "Stands", "Apart"];
  return (
    <div className="relative inline-block w-full text-center">
      <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight flex flex-wrap justify-center gap-x-4">
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="relative inline-block overflow-hidden">
            {word.split("").map((char, charIdx) => (
              <motion.span
                key={charIdx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: (wordIdx * 0.2) + (charIdx * 0.05) }}
                className={`inline-block ${word === "Medrox" || word === "Apart" ? "bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent" : "text-slate-900"}`}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h1>
    </div>
  );
}
