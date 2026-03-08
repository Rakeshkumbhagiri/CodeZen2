// import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
const scrollToTop = () => window.scrollTo({top: 0,behavior: "smooth"});
const screenshots = [
  { src: "/chat-preview-1.png", alt: "Chat preview 1", x: "-20%", y: "0%" },
  { src: "/chat-preview-2.png", alt: "Chat preview 2", x: "0%", y: "-20%" },
  { src: "/chat-preview-3.png", alt: "Chat preview 3", x: "20%", y: "0%" },
];

function useParallax(strength = 20) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * strength;
      const y = (e.clientY / innerHeight - 0.5) * strength;

      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [strength]);

  return ref;
}

export function ChatPreview() {
  const [activeIndex, setActiveIndex] = useState(null);

  const parallaxRef = useParallax(10);
  return (
    // <section className="absolute w-full py-10 overflow-hidden">
    <section className="relative w-full py-20 ml-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[95vw]  " >
      <div className="max-w-3xl mx-auto mt-20 mb-16 space-y-2 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Experience Interactive Learning
        </h2>
        <p className="text-xl text-muted-foreground">
          Master Data Structures & Algorithms with AI-powered guidance
        </p>
      </div>
      </div>
      

      <div className="relative h-[600px] w-full max-w-7xl mx-auto overflow-visible -mt-8">
        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
          {screenshots.map((s, i) => {
            const isActive = activeIndex === i;

            return (
              <div
                key={s.src}
                ref={parallaxRef}
                onClick={() => setActiveIndex(i)}
                className={`absolute animate-float will-change-transform cursor-pointer transition-all duration-300 ${
                  isActive ? "scale-110" : ""
                }`}
                style={{
                  "--x": s.x,
                  "--y": s.y,
                  animationDelay: `${i * 0.2}s`,
                  zIndex: isActive ? 50 : screenshots.length - i,
                  // opacity: isActive ? 1 : 0.7,
                }}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  className="w-[700px] rounded-xl shadow-xl transition-transform duration-300 hover:scale-110"
                />
              </div>
            );
          })}
        </div>
      </div>
        {/* <Footer /> */}
    </section>
  );
}
