/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

const BokehOrb = ({ delay, mouseX, mouseY, bgIsRed }: { delay: number; mouseX: any; mouseY: any; bgIsRed: boolean; key?: React.Key }) => {
  const [initialCoords] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });

  // Create a localized parallax shift based on mouse position
  const tx = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const ty = useSpring(mouseY, { damping: 50, stiffness: 100 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: bgIsRed ? [0.05, 0.1, 0.05] : [0.1, 0.25, 0.1],
        scale: [1, 1.2, 1],
        backgroundColor: bgIsRed ? "#0a1f44" : "#FFFFFF"
      }}
      style={{
        x: tx,
        y: ty,
        left: `${initialCoords.x}%`,
        top: `${initialCoords.y}%`,
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
      className="absolute rounded-full blur-[100px] w-64 h-64 md:w-[40rem] md:h-[40rem] pointer-events-none -translate-x-1/2 -translate-y-1/2"
    />
  );
};

const BokehBackground = ({ bgIsRed }: { bgIsRed: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate offset from center for parallax effect
      const x = (e.clientX - window.innerWidth / 2) / 15;
      const y = (e.clientY - window.innerHeight / 2) / 15;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <BokehOrb key={i} delay={i * 4} mouseX={mouseX} mouseY={mouseY} bgIsRed={bgIsRed} />
      ))}
    </div>
  );
};

const Logo = ({ className = "", bgIsRed = false, onClick }: { className?: string; bgIsRed?: boolean; onClick?: () => void }) => (
  <div 
    className={`flex flex-col items-center gap-2 cursor-pointer group select-none ${className}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div className="flex items-start">
        <motion.span 
          animate={{ color: bgIsRed ? "#000000" : "#FFFFFF" }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-none"
        >
          TIRANTE
        </motion.span>
        <motion.span 
          animate={{ color: bgIsRed ? "#000000" : "#FFFFFF" }}
          transition={{ duration: 0.8 }}
          className="text-[10px] md:text-[14px] font-bold leading-none mt-1"
        >
          ®
        </motion.span>
      </div>
      <motion.div 
        animate={{ backgroundColor: bgIsRed ? "#000000" : "#E30613" }}
        transition={{ duration: 0.8 }}
        className="w-[2px] h-8 md:h-10 self-center" 
      />
      <motion.span 
        animate={{ color: bgIsRed ? "#000000" : "rgba(255, 255, 255, 0.9)" }}
        transition={{ duration: 0.8 }}
        className="text-lg md:text-3xl font-light tracking-tight italic"
      >
        Bienes Raíces
      </motion.span>
    </div>
    <motion.span 
      animate={{ color: bgIsRed ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)" }}
      transition={{ duration: 0.8 }}
      className="text-[10px] md:text-xs font-light tracking-[0.4em] uppercase group-hover:opacity-60 transition-opacity"
    >
      Resultados que trascienden.
    </motion.span>
  </div>
);

export default function App() {
  const [bgIsRed, setBgIsRed] = useState(false);
  const whatsappNumber = "+542267532829";
  const whatsappMessage = encodeURIComponent("Estoy interesado en conocer tu Inmobiliria TIRANTE® | Bienes Raices.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const toggleBg = () => setBgIsRed(!bgIsRed);

  return (
    <motion.div 
      initial={{ backgroundColor: "#000000" }}
      animate={{ backgroundColor: bgIsRed ? "#B42023" : "#000000" }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-white px-6 font-sans overflow-hidden"
    >
      <BokehBackground bgIsRed={bgIsRed} />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center text-center space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.2, 0, 0.2, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter uppercase leading-[0.9] mb-4">
            Apertura
          </h1>
          <h2 className="text-5xl md:text-8xl font-medium tracking-tight leading-none text-white/80">
            2027.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          className="space-y-8 flex flex-col items-center"
        >
          <p className="text-[10px] md:text-xs font-medium text-white/60 tracking-[0.6em] uppercase">
            PRÓXIMA APERTURA DE OFICINA
          </p>
          <Logo bgIsRed={bgIsRed} onClick={toggleBg} />
        </motion.div>
      </main>

      {/* Footer / Copyright */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2 }}
        className="absolute bottom-12 z-10 text-center flex flex-col items-center gap-2"
      >
        <p className="text-[10px] md:text-xs font-light tracking-wider opacity-40">
          Copyright de TIRANTE® | Bienes Raíces - 2026
        </p>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] md:text-sm font-medium tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
        >
          2267-532829
        </a>
        <p className="text-[9px] md:text-[10px] font-light opacity-30 tracking-widest">
          www.tirante.com.ar
        </p>
      </motion.footer>

      {/* Aesthetic Accents - Corners */}
      <div className="absolute top-0 left-0 w-full h-full p-10 pointer-events-none hidden md:block z-10">
        <div className="absolute top-10 left-10 text-[10px] uppercase tracking-[0.5em] font-light opacity-20 transform -rotate-90 origin-top-left">
          Exclusividad & Visión
        </div>
        <div 
          className="absolute top-10 right-10 text-[10px] uppercase tracking-[0.5em] font-light opacity-20 cursor-pointer pointer-events-auto select-none"
          onClick={(e) => {
            if (e.ctrlKey) {
              const html = document.documentElement.outerHTML;
              const blob = new Blob([html], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "codigo_web_tirante.txt";
              a.click();
              URL.revokeObjectURL(url);
            }
          }}
        >
          Pinamar • 2027
        </div>
      </div>
    </motion.div>
  );
}
