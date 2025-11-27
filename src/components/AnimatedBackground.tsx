import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system for subtle flowing lines
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      type: "line" | "sparkle";

      constructor(type: "line" | "sparkle" = "line") {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = type === "sparkle" ? Math.random() * 2 + 1 : Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.type = type;
        
        // Teal blue for lines, golden for sparkles
        this.color = type === "sparkle" 
          ? `rgba(214, 175, 54, ${this.opacity})` // Golden
          : `rgba(56, 142, 142, ${this.opacity})`; // Teal blue
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Subtle opacity pulse for sparkles
        if (this.type === "sparkle") {
          this.opacity = Math.sin(Date.now() * 0.001 + this.x) * 0.2 + 0.3;
        }
      }

      draw() {
        if (!ctx) return;
        
        if (this.type === "sparkle") {
          // Draw golden sparkle
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(214, 175, 54, ${this.opacity})`;
          ctx.fill();
          
          // Add glow
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(214, 175, 54, ${this.opacity * 0.8})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Draw teal particle
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
    }

    // Create particles - mostly lines with occasional sparkles
    const particles: Particle[] = [];
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    const sparkleCount = Math.min(15, Math.floor(particleCount / 5));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle("line"));
    }
    for (let i = 0; i < sparkleCount; i++) {
      particles.push(new Particle("sparkle"));
    }

    // Connect nearby particles with lines (knowledge flow effect)
    const connectParticles = () => {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only connect teal particles that are close
          if (distance < 120 && particles[i].type === "line" && particles[j].type === "line") {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 142, 142, ${0.08 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect particles
      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cursor glow effect
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Canvas for particle animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: "normal" }}
      />
      
      {/* Cursor glow effect */}
      <div
        ref={cursorGlowRef}
        className="fixed pointer-events-none z-50 hidden md:block"
        style={{
          width: "300px",
          height: "300px",
          marginLeft: "-150px",
          marginTop: "-150px",
          background: "radial-gradient(circle, rgba(56, 142, 142, 0.15) 0%, rgba(214, 175, 54, 0.08) 30%, transparent 70%)",
          filter: "blur(40px)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />
    </>
  );
};

export default AnimatedBackground;
