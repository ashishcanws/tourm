import React, { useEffect, useRef } from "react";

const travelIcons = [
  {
    icon: "🛟",
    left: 80,
    top: 120,
    size: 40,
    speed: 0.4,
  },
  {
    icon: "🧳",
    left: 160,
    top: 130,
    size: 42,
    speed: 0.5,
  },
  {
    icon: "👒",
    left: 260,
    top: 120,
    size: 38,
    speed: 0.3,
  },
  {
    icon: "🛂",
    left: 360,
    top: 125,
    size: 42,
    speed: 0.4,
  },
  {
    icon: "🧭",
    left: 470,
    top: 130,
    size: 38,
    speed: 0.5,
  },
  {
    icon: "⭐",
    left: 580,
    top: 120,
    size: 30,
    speed: 0.4,
  },
  {
    icon: "📍",
    left: 690,
    top: 125,
    size: 34,
    speed: 0.5,
  },
  {
    icon: "🏝️",
    left: 810,
    top: 130,
    size: 36,
    speed: 0.4,
  },
  {
    icon: "🥾",
    left: 930,
    top: 120,
    size: 40,
    speed: 0.5,
  },
  {
    icon: "🍮",
    left: 1040,
    top: 130,
    size: 42,
    speed: 0.4,
  },
  {
    icon: "🎈",
    left: 1160,
    top: 120,
    size: 40,
    speed: 0.3,
  },
  {
    icon: "⛱️",
    left: 1280,
    top: 125,
    size: 50,
    speed: 0.5,
  },
  {
    icon: "🧳",
    left: 1420,
    top: 135,
    size: 38,
    speed: 0.4,
  },
  {
    icon: "🕶️",
    left: 1540,
    top: 130,
    size: 40,
    speed: 0.3,
  },
  {
    icon: "🧳",
    left: 1660,
    top: 120,
    size: 42,
    speed: 0.5,
  },
];

export default function TravelFloatingIcons() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = 220 * dpr;

    canvas.style.width = "100%";
    canvas.style.height = "220px";

    ctx.scale(dpr, dpr);

    const particles = travelIcons.map((item) => ({
      ...item,
      float: Math.random() * 100,
    }));

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, 220);

      particles.forEach((item) => {
        item.left -= item.speed;

        if (item.left < -80) {
          item.left = window.innerWidth + 100;
        }

        const floatY =
          item.top + Math.sin(Date.now() * 0.001 + item.float) * 8;

        ctx.save();

        ctx.font = `${item.size}px Arial`;
        ctx.fillText(item.icon, item.left, floatY);

        ctx.restore();
      });

      requestAnimationFrame(render);
    };

    render();

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = 220 * dpr;

      canvas.style.width = "100%";
      canvas.style.height = "220px";

      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="travel-wrapper">
      {/* Floating Icons Area */}
      <div className="travel-animation">
        <canvas ref={canvasRef}></canvas>

        
      </div>

      {/* Bottom Background */}
      <div className="travel-bottom-bg"></div>

    </div>
  );
}