import React, { useEffect, useRef } from 'react';

const SnakeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snake: { x: number; y: number }[] = [{ x: 10, y: 10 }];
    let direction = { x: 1, y: 0 };
    
    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Move snake
      const head = { ...snake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Wrap around edges
      if (head.x >= canvas.width / 10) head.x = 0;
      if (head.x < 0) head.x = canvas.width / 10 - 1;
      if (head.y >= canvas.height / 10) head.y = 0;
      if (head.y < 0) head.y = canvas.height / 10 - 1;

      snake.unshift(head);
      if (snake.length > 20) snake.pop();

      // Draw snake
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
      snake.forEach((segment, i) => {
        const alpha = 1 - i / snake.length;
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.5})`;
        ctx.fillRect(segment.x * 10, segment.y * 10, 8, 8);
      });

      // Randomly change direction
      if (Math.random() < 0.02) {
        const directions = [
          { x: 1, y: 0 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: -1 },
        ];
        direction = directions[Math.floor(Math.random() * directions.length)];
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default SnakeBackground;