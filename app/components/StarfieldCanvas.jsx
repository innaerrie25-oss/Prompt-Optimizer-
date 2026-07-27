'use client';

import { useEffect, useRef } from 'react';

export default function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate star field particles
    const starCount = Math.floor((width * height) / 3000);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.01 + 0.003,
      color: ['#ffffff', '#a78bfa', '#38bdf8', '#f472b6'][
        Math.floor(Math.random() * 4)
      ],
    }));

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.speed = -star.speed;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.size > 1.2 ? 8 : 0;
        ctx.shadowColor = star.color;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Dynamic Nebulae Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-indigo-600/15 rounded-full blur-[160px]" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/20 rounded-full blur-[150px] animate-pulse" />
    </div>
  );
}

