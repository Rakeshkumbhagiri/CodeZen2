import { motion } from "framer-motion";
import LanguagesOrbit from "./LanguagesOrbit";
import AuthModal from "./AuthModal";
import { useState } from "react";

export function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 1500);
  };

  return (
    <section className="container relative flex flex-col items-center gap-8 px-20 py-18 md:flex-row">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <span className="items-start font-serif text-5xl">
          <a href="/">CodeZen</a>
        </span>
        <h1 className="mt-10 text-5xl font-bold">
          AI-Powered Debugging of DSA Problems
        </h1>
        <p className="mt-4 text-lg">Learn step by step</p>
        <button
          onClick={(e) => {
            handleGetStarted(e);

            const button = e.currentTarget;
            button.classList.remove("spring-animate");
            void button.offsetWidth;
            button.classList.add("spring-animate");

            const circle = document.createElement("span");
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
            circle.className = "ripple";

            const ripple = button.getElementsByClassName("ripple")[0];
            if (ripple) ripple.remove();

            button.appendChild(circle);
          }}
          disabled={loading}
          className="
    relative overflow-hidden
    inline-block px-6 py-2 mt-6 text-lg text-green-400 rounded
    bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed

    transform-gpu
    transition-all duration-300
    shadow-[0_8px_0_0_rgb(15_23_42)]
  "
        >
          {loading ? "Loading..." : "Get Started"}
        </button>
      </motion.div>
      
        <LanguagesOrbit />
      
      {loading && <AnimatedLoader />}
      {showModal && (
        <AuthModal mode="login" close={() => setShowModal(false)} />
      )}
    </section>
  );
}

function AnimatedLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        className="absolute w-24 h-24 border-4 border-green-300 rounded-full"
        animate={{
          scale: [0.8, 1.5],
          opacity: [1, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <div className="w-6 h-6 bg-green-400 rounded-full" />
    </div>
  );
}
