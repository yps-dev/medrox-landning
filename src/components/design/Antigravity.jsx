import { useEffect, useRef } from 'react';

const Antigravity = ({
    count = 250,
    color = '#9ec8ff',
    particleSize = 3
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Mouse tracking
        const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Create particles
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                baseX: Math.random() * canvas.width,
                baseY: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * particleSize + 0.5,
                angle: Math.random() * Math.PI * 2,
                angleSpeed: (Math.random() - 0.5) * 0.02
            });
        }

        // Animation loop
        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                // Calculate distance to mouse
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const magnetRadius = 150;

                // Magnetic effect
                if (dist < magnetRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (magnetRadius - dist) / magnetRadius;
                    const ringRadius = 100;

                    // Move towards ring around mouse
                    const targetX = mouse.x + Math.cos(angle + particle.angle) * ringRadius;
                    const targetY = mouse.y + Math.sin(angle + particle.angle) * ringRadius;

                    particle.x += (targetX - particle.x) * 0.05 * force;
                    particle.y += (targetY - particle.y) * 0.05 * force;

                    particle.angle += particle.angleSpeed;
                } else {
                    // Return to base position
                    particle.x += (particle.baseX - particle.x) * 0.01;
                    particle.y += (particle.baseY - particle.y) * 0.01;

                    // Gentle drift
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Wrap around edges
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.y < 0) particle.y = canvas.height;
                    if (particle.y > canvas.height) particle.y = 0;
                }

                // Draw particle
                ctx.fillStyle = color;
                ctx.globalAlpha = dist < magnetRadius ? 0.8 : 0.4;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [count, color, particleSize]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
};

export default Antigravity;
