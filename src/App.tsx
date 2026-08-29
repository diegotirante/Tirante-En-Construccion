/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "motion/react";

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
    className={`flex flex-col gap-2 cursor-pointer group select-none ${className || "items-center"}`}
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
      animate={{ color: bgIsRed ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.4)" }}
      transition={{ duration: 0.8 }}
      className="text-[10px] md:text-xs font-light tracking-[0.4em] uppercase group-hover:opacity-80 transition-opacity"
    >
      Resultados que trascienden.
    </motion.span>
  </div>
);

const words = [
  "PINAMAR", "OSTENDE", "VALERIA DEL MAR", "CARILO", "COSTA ESMERALDA", "MADARIAGA",
  "CASA", "DEPARTAMENTO", "LOCAL", "TERRENO", "COMPRA", "VENTA", "ALQUILERES", "NEGOCIOS"
];

const FloatingText = ({ text, bgIsRed }: { text: string; bgIsRed: boolean; key?: React.Key }) => {
  const [initialPos] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 3, // 1rem to 4rem
    opacity: 0.05 + Math.random() * 0.1,
    duration: 30 + Math.random() * 30,
  });

  return (
    <motion.span
      initial={{ x: `${initialPos.x}vw`, y: `${initialPos.y}vh`, opacity: 0 }}
      animate={{ 
        opacity: initialPos.opacity,
        x: [`${initialPos.x}vw`, `${(initialPos.x + 10) % 100}vw`, `${initialPos.x}vw`],
        y: [`${initialPos.y}vh`, `${(initialPos.y + 10) % 100}vh`, `${initialPos.y}vh`],
        color: bgIsRed ? "#E30613" : "#1a1a1a" // Crimson vs Dark Gray (light black)
      }}
      transition={{
        duration: initialPos.duration,
        repeat: Infinity,
        ease: "linear",
        color: { duration: 0.8 }
      }}
      className="absolute font-bold whitespace-nowrap pointer-events-none select-none"
      style={{
        fontSize: `${initialPos.size}rem`,
        filter: "blur(1px)",
      }}
    >
      {text}
    </motion.span>
  );
};

const BackgroundText = ({ bgIsRed }: { bgIsRed: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(25)].map((_, i) => (
        <FloatingText key={i} text={words[i % words.length]} bgIsRed={bgIsRed} />
      ))}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<"default" | "doors">("doors");
  const whatsappNumber = "+542267532829";
  const whatsappMessage = encodeURIComponent("Estoy interesado en conocer tu Inmobiliria TIRANTE® | Bienes Raices.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const toggleView = () => {
    setView((prev) => (prev === "default" ? "doors" : "default"));
  };

  return (
    <div className="relative min-h-screen w-full font-sans bg-black overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {view === "default" ? (
          /* ========================================================
             VISTA 1: DEFAULT (FONDO NEGRO, BOKEH, APERTURA 2027)
             ======================================================== */
          <motion.div
            key="default-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative min-h-screen w-full flex flex-col items-center justify-center text-white px-6 overflow-hidden bg-black"
          >
            <BokehBackground bgIsRed={false} />
            <BackgroundText bgIsRed={false} />

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
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                className="space-y-8 flex flex-col items-center"
              >
                <p className="text-[10px] md:text-xs font-medium text-white/60 tracking-[0.6em] uppercase">
                  PRÓXIMA APERTURA DE OFICINA
                </p>
                <Logo bgIsRed={false} onClick={toggleView} />
              </motion.div>
            </main>

            {/* Footer / Copyright */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
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
            <div className="absolute top-0 left-0 w-full h-full p-8 sm:p-10 pointer-events-none hidden sm:block z-10">
              <div className="absolute top-10 left-10 text-[10px] uppercase tracking-[0.5em] font-light opacity-20 transform -rotate-90 origin-top-left">
                Exclusividad & Visión
              </div>
              <div className="absolute top-10 right-10 text-[10px] uppercase tracking-[0.5em] font-light opacity-20">
                Pinamar • 2027
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================
             VISTA 2: DOORS (FONDO IMAGEN PUERTA, CONTENIDO REORGANIZADO)
             ======================================================== */
          <motion.div
            key="doors-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative min-h-screen w-full flex flex-col justify-between text-[#0A0A0A] font-sans overflow-hidden"
          >
            {/* Background Layer with Responsive Orientation & Position */}
            <div 
              className="absolute inset-0 pointer-events-none z-0 bg-no-repeat bg-cover 
                bg-[url('/images/puerta-celular.png')] bg-center 
                portrait:sm:bg-[url('/images/puerta-escritorio.png')] portrait:sm:scale-x-[-1] portrait:sm:bg-[right_center] portrait:sm:bg-cover
                landscape:sm:bg-[url('/images/puerta-escritorio.png')] landscape:sm:bg-[right_center] landscape:sm:bg-cover"
            />

            {/* 1. TABLET/DESKTOP LANDSCAPE (Horizontal / Apaisada - sm: y superior en landscape, o lg: siempre) */}
            <div className="hidden landscape:sm:flex lg:flex flex-1 items-center z-10 w-full max-w-7xl mx-auto px-6 sm:pl-10 md:pl-16 lg:pl-24 py-8 md:py-16">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="w-full sm:w-[48%] md:w-[46%] lg:w-[44%] flex flex-col items-start text-left space-y-3.5 sm:space-y-4 md:space-y-6 scale-[0.85] sm:scale-[0.82] md:scale-[0.9] lg:scale-100 origin-left"
              >
                {/* a. Badge */}
                <div className="inline-flex items-center px-3.5 sm:px-4 py-1.5 rounded-full bg-[#E30613] text-white text-[9px] sm:text-[10px] lg:text-xs font-semibold tracking-[0.25em] uppercase shadow-sm">
                  SITIO EN CONSTRUCCIÓN
                </div>

                {/* b. Title en 3 líneas */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase text-[#0A0A0A] leading-[1.08]">
                  ESTAMOS<br />
                  CONSTRUYENDO<br />
                  ALGO NUEVO<span className="text-[#E30613] font-medium">.</span>
                </h1>

                {/* c. Línea roja separadora */}
                <div className="w-10 sm:w-12 h-[2px] bg-[#E30613]" />

                {/* d. Texto de apoyo */}
                <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm lg:text-base font-light text-[#1E1E1E]/80 leading-relaxed">
                  <p>Un nuevo espacio para <strong className="font-bold text-[#0A0A0A]">encontrar</strong> tu lugar.</p>
                  <p>Resultados que <strong className="font-bold text-[#0A0A0A]">trascienden</strong>.</p>
                  <p>Ya casi está <strong className="font-bold text-[#0A0A0A]">listo</strong>.</p>
                </div>

                {/* e. Logo & f. Próxima apertura */}
                <div className="pt-2 sm:pt-3 md:pt-4 flex flex-col items-start gap-3 sm:gap-4">
                  <Logo bgIsRed={true} onClick={toggleView} className="items-start" />
                  <p className="text-[9px] sm:text-[10px] lg:text-xs font-medium text-neutral-500 tracking-[0.4em] sm:tracking-[0.5em] uppercase">
                    PRÓXIMA APERTURA DE OFICINA
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 2. TABLET PORTRAIT (Vertical - sm a md/lg en portrait): El texto va a la derecha de la puerta */}
            <div className="hidden portrait:sm:flex portrait:lg:hidden flex-1 items-center justify-end z-10 w-full max-w-5xl mx-auto px-6 sm:pr-8 md:pr-12 py-12">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="w-[50%] sm:w-[48%] md:w-[46%] flex flex-col items-start text-left space-y-3.5 sm:space-y-4 scale-[0.88] md:scale-[0.92] origin-right"
              >
                {/* a. Badge */}
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#E30613] text-white text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] uppercase shadow-sm">
                  SITIO EN CONSTRUCCIÓN
                </div>

                {/* b. Title en 3 líneas */}
                <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] font-medium tracking-tight uppercase text-[#0A0A0A] leading-[1.08]">
                  ESTAMOS<br />
                  CONSTRUYENDO<br />
                  ALGO NUEVO<span className="text-[#E30613] font-medium">.</span>
                </h1>

                {/* c. Línea roja separadora */}
                <div className="w-10 sm:w-12 h-[2px] bg-[#E30613]" />

                {/* d. Texto de apoyo */}
                <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm font-light text-[#1E1E1E]/80 leading-relaxed">
                  <p>Un nuevo espacio para <strong className="font-bold text-[#0A0A0A]">encontrar</strong> tu lugar.</p>
                  <p>Resultados que <strong className="font-bold text-[#0A0A0A]">trascienden</strong>.</p>
                  <p>Ya casi está <strong className="font-bold text-[#0A0A0A]">listo</strong>.</p>
                </div>

                {/* e. Logo & f. Próxima apertura */}
                <div className="pt-2 sm:pt-3 flex flex-col items-start gap-3">
                  <Logo bgIsRed={true} onClick={toggleView} className="items-start" />
                  <p className="text-[9px] sm:text-[10px] font-medium text-neutral-500 tracking-[0.38em] uppercase">
                    PRÓXIMA APERTURA DE OFICINA
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 3. MOBILE VIEW LAYOUT (Solo debajo de sm:) */}
            <div className="sm:hidden flex flex-col items-center text-center z-10 pt-7 px-4">
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-center space-y-3.5 max-w-xs transform scale-[0.77] origin-top"
              >
                {/* 1. Badge */}
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#E30613] text-white text-[9px] font-semibold tracking-[0.2em] uppercase shadow-sm">
                  SITIO EN CONSTRUCCIÓN
                </div>

                {/* 2. Título */}
                <h1 className="text-3xl font-medium tracking-tight uppercase text-[#0A0A0A] leading-[1.1]">
                  ESTAMOS<br />
                  CONSTRUYENDO<br />
                  ALGO NUEVO<span className="text-[#E30613] font-medium">.</span>
                </h1>

                {/* 3. Línea roja */}
                <div className="w-10 h-[2px] bg-[#E30613]" />

                {/* 4. Texto de apoyo */}
                <div className="space-y-1 text-xs font-light text-[#1E1E1E]/80 leading-snug">
                  <p>Un nuevo espacio para <strong className="font-bold text-[#0A0A0A]">encontrar</strong> tu lugar.</p>
                  <p>Resultados que <strong className="font-bold text-[#0A0A0A]">trascienden</strong>.</p>
                  <p>Ya casi está <strong className="font-bold text-[#0A0A0A]">listo</strong>.</p>
                </div>

                {/* 5. Logo */}
                <div className="pt-2 flex flex-col items-center gap-2">
                  <Logo bgIsRed={true} onClick={toggleView} />
                  {/* 6. Próxima apertura */}
                  <p className="text-[9px] font-medium text-neutral-500 tracking-[0.35em] uppercase">
                    PRÓXIMA APERTURA DE OFICINA
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Footer / Copyright */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="relative sm:absolute sm:bottom-12 sm:inset-x-0 pb-8 sm:pb-0 z-10 text-center flex flex-col items-center gap-2"
            >
              <p className="text-[10px] md:text-xs font-light tracking-wider text-neutral-800/50">
                Copyright de TIRANTE® | Bienes Raíces - 2026
              </p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] md:text-sm font-medium tracking-[0.2em] text-neutral-800/80 hover:text-black transition-colors duration-300"
              >
                2267-532829
              </a>
              <p className="text-[9px] md:text-[10px] font-light text-neutral-800/40 tracking-widest">
                www.tirante.com.ar
              </p>
            </motion.footer>

            {/* Aesthetic Accents - Corners */}
            <div className="absolute top-0 left-0 w-full h-full p-8 sm:p-10 pointer-events-none hidden sm:block z-10">
              <div className="absolute top-10 left-10 text-[10px] uppercase tracking-[0.5em] font-light text-neutral-800/30 transform -rotate-90 origin-top-left">
                Exclusividad & Visión
              </div>
              <div className="absolute top-10 right-10 text-[10px] uppercase tracking-[0.5em] font-light text-neutral-800/30">
                Pinamar • 2027
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
