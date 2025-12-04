
import React, { useEffect, useRef } from 'react';
import type { InteractiveComponentProps } from '../../types';

const HeroIntro: React.FC<InteractiveComponentProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let particles: {x: number, y: number, vx: number, vy: number}[] = [];

        const initParticles = () => {
            particles = [];
            const count = Math.min(50, Math.floor(width / 20));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#A78BFA'; // brand-primary-light
            ctx.strokeStyle = 'rgba(167, 139, 250, 0.2)';

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(draw);
        };

        initParticles();
        draw();

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            initParticles();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 mb-12 group">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60"></canvas>
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/20 border border-brand-primary/50 text-brand-primary-light text-xs font-mono mb-4 animate-fade-in tracking-widest uppercase">
                    Module 1: Intelligence Architect
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg">
                    ZEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">VANGUARD</span>
                </h1>
                
                <p className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed animate-slide-in-up" style={{animationDelay: '200ms'}}>
                    Master the mechanics of the machine mind. From neural weights to agentic workflows.
                </p>

                <div className="mt-8 flex gap-4 animate-slide-in-up" style={{animationDelay: '400ms'}}>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white">40+</span>
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Interactive Labs</span>
                    </div>
                    <div className="w-px h-10 bg-slate-700"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-white">100%</span>
                        <span className="text-xs text-slate-400 uppercase tracking-wide">Project Based</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroIntro;
