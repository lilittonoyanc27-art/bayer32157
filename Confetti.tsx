/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  spin: number;
}

const CONFETTI_COLORS = [
  '#FF1493', '#00BFFF', '#32CD32', '#FFD700', '#FF4500', 
  '#9370DB', '#00FA9A', '#FF00FF', '#40E0D0', '#FF8C00'
];

export default function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Initialize 120 confetti particles
    const initialParticles: Particle[] = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: -10 - Math.random() * 20, // percentage offscreen top
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 8,
      speedY: 2 + Math.random() * 3,
      speedX: -1.5 + Math.random() * 3,
      rotation: Math.random() * 360,
      spin: -5 + Math.random() * 10
    }));

    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => {
            const nextY = p.y + p.speedY;
            return {
              ...p,
              y: nextY,
              x: p.x + p.speedX + Math.sin(nextY / 10) * 0.3,
              rotation: p.rotation + p.spin
            };
          })
          .filter(p => p.y < 110) // Filter out fallen ones
      );
    }, 30);

    return () => clearInterval(interval);
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            borderRadius: p.id % 2 === 0 ? '50%' : '2px',
            opacity: 0.9,
            transition: 'transform 30ms linear'
          }}
        />
      ))}
    </div>
  );
}
