"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

// --- Configuration ---
// Set gravityY to 0 for "Antigravity/Space" (floating), 1 for "Gravity" (falling)
const PHYSICS_CONFIG = {
    gravityY: 1,
    restitution: 0.8, // Bounciness (0-1)
    friction: 0.1,    // Slide friction
    wallThickness: 100,
};

const PhysicsContext = React.createContext({
    registerElement: () => { },
    unregisterElement: () => { },
    isActive: false,
});

export const PhysicsProvider = ({ children }) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);

    // Stores DOM elements and their corresponding physics bodies
    const elementsRef = useRef(new Map());
    const [isActive, setIsActive] = useState(false);

    // 1. Initialize Physics World
    useEffect(() => {
        if (!sceneRef.current) return;

        // Create Engine
        const engine = Matter.Engine.create();
        const world = engine.world;
        engine.gravity.y = 0; // Start with no gravity until triggered

        // Create Renderer (Invisible, just for mouse interaction/debugging if needed)
        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: "transparent",
                wireframes: false, // Set true to debug physics bodies
                showAngleIndicator: false,
            },
        });

        // Create Runner
        const runner = Matter.Runner.create();

        // Create Boundaries (Walls)
        const width = window.innerWidth;
        const height = window.innerHeight;
        const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true });
        const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });
        // Optional ceiling for "Antigravity" mode so things don't fly off
        const ceiling = Matter.Bodies.rectangle(width / 2, -500, width, 100, { isStatic: true });

        Matter.Composite.add(world, [ground, leftWall, rightWall, ceiling]);

        // Add Mouse Interaction
        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });
        Matter.Composite.add(world, mouseConstraint);

        // Sync scrolling
        render.mouse = mouse;

        // Save refs
        engineRef.current = engine;
        renderRef.current = render;
        runnerRef.current = runner;

        // Start Engine
        Matter.Render.run(render);
        Matter.Runner.run(runner, engine);

        // --- The Render Loop (Sync Physics -> DOM) ---
        const updateLoop = () => {
            if (!engineRef.current) return;

            elementsRef.current.forEach(({ element, body }) => {
                if (body) {
                    const { x, y } = body.position;
                    const angle = body.angle;
                    // Apply physics transforms to DOM
                    element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${angle}rad)`;
                }
            });
            requestAnimationFrame(updateLoop);
        };
        updateLoop();

        // Cleanup
        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
        };
    }, []);

    // 2. Trigger the "Fall"
    const triggerGravity = () => {
        if (isActive || !engineRef.current) return;
        setIsActive(true);

        const engine = engineRef.current;
        const world = engine.world;

        // Turn on gravity
        engine.gravity.y = PHYSICS_CONFIG.gravityY;

        // Convert registered DOM elements to Physics Bodies
        elementsRef.current.forEach((data, id) => {
            const { element } = data;
            const rect = element.getBoundingClientRect();

            // Calculate center based on current screen position
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            // Create rigid body matching DOM size
            const body = Matter.Bodies.rectangle(x, y, rect.width, rect.height, {
                restitution: PHYSICS_CONFIG.restitution,
                friction: PHYSICS_CONFIG.friction,
                density: 0.001, // Lighter items
            });

            // Save body to map
            data.body = body;

            // IMPORTANT: Set DOM to absolute so physics can control it
            // We freeze the width/height so it doesn't collapse when position becomes absolute
            element.style.width = `${rect.width}px`;
            element.style.height = `${rect.height}px`;
            element.style.position = "absolute";
            element.style.left = "0";
            element.style.top = "0";
            // Initial sync to prevent jump
            element.style.transform = `translate(${x - rect.width / 2}px, ${y - rect.height / 2}px)`;

            Matter.Composite.add(world, body);
        });
    };

    const registerElement = (id, element) => {
        elementsRef.current.set(id, { element });
    };

    const unregisterElement = (id) => {
        const data = elementsRef.current.get(id);
        if (data && data.body && engineRef.current) {
            Matter.Composite.remove(engineRef.current.world, data.body);
        }
        elementsRef.current.delete(id);
    };

    return (
        <PhysicsContext.Provider value={{ registerElement, unregisterElement, isActive }}>
            <div
                ref={sceneRef}
                className="fixed inset-0 pointer-events-none z-0"
            />

            <div className="relative z-10 w-full min-h-screen">
                {/* Click anywhere to start if not auto-started */}
                {!isActive && (
                    <div
                        onClick={triggerGravity}
                        className="absolute inset-0 z-50 cursor-pointer"
                        title="Click to break the website"
                    />
                )}
                {children}
            </div>
        </PhysicsContext.Provider>
    );
};

// --- The Wrapper for Items you want to fall ---
export const PhysicsBody = ({
    children,
    className
}) => {
    const { registerElement, unregisterElement } = React.useContext(PhysicsContext);
    const ref = useRef(null);
    const [id] = useState(() => Math.random().toString(36).substr(2, 9));

    useEffect(() => {
        if (ref.current) {
            registerElement(id, ref.current);
        }
        return () => unregisterElement(id);
    }, [id, registerElement, unregisterElement]);

    return (
        <div ref={ref} className={`inline-block ${className || ""}`}>
            {children}
        </div>
    );
};

// --- USAGE EXAMPLE: The Hero Section ---
export default function Hero() {
    return (
        <PhysicsProvider>
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-slate-900 overflow-hidden relative">

                {/* Navigation Bar */}
                <div className="absolute top-0 w-full flex justify-between p-8">
                    <PhysicsBody>
                        <span className="text-2xl font-bold">Medrox</span>
                    </PhysicsBody>
                    <div className="flex gap-6">
                        <PhysicsBody><a href="#" className="hover:underline">About</a></PhysicsBody>
                        <PhysicsBody><a href="#" className="hover:underline">Pricing</a></PhysicsBody>
                        <PhysicsBody>
                            <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center">
                                M
                            </div>
                        </PhysicsBody>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col items-center gap-8 z-20 pointer-events-none">
                    <PhysicsBody className="pointer-events-auto">
                        <h1 className="text-8xl font-black tracking-tighter text-slate-800">
                            <span className="text-blue-500">M</span>
                            <span className="text-red-500">e</span>
                            <span className="text-yellow-500">d</span>
                            <span className="text-blue-500">r</span>
                            <span className="text-green-500">o</span>
                            <span className="text-red-500">x</span>
                        </h1>
                    </PhysicsBody>

                    <PhysicsBody className="w-full max-w-xl pointer-events-auto">
                        <div className="flex items-center gap-4 px-6 py-4 rounded-full border border-slate-200 shadow-sm hover:shadow-md bg-white w-[600px]">
                            <span className="text-slate-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-1 outline-none text-lg"
                            />
                            <span className="text-blue-500">🏥</span>
                        </div>
                    </PhysicsBody>

                    <div className="flex gap-4 mt-4 pointer-events-auto">
                        <PhysicsBody>
                            <button className="px-6 py-3 bg-slate-100 rounded-md text-sm font-medium hover:bg-slate-200 text-slate-700">
                                Google Search
                            </button>
                        </PhysicsBody>
                        <PhysicsBody>
                            <button className="px-6 py-3 bg-slate-100 rounded-md text-sm font-medium hover:bg-slate-200 text-slate-700">
                                I'm Feeling Lucky
                            </button>
                        </PhysicsBody>
                    </div>

                    <p className="mt-12 text-sm text-slate-400 animate-pulse">
                        Click anywhere to break the site!
                    </p>
                </div>
            </div>
        </PhysicsProvider>
    );
}
