const LanguagesOrbit = () => {
  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden -mr-44"> 
      
      {/* Center Text */}
<span className="z-10 font-bold text-transparent text-8xl bg-gradient-to-r from-black to-green-400 bg-clip-text">
  DSA
</span>

      {/* Inner Orbit */}
      <div className="absolute orbit w-[240px] h-[240px] rounded-full border border-black">
        <div className="absolute -translate-x-1/2 -top-6 left-1/2">
          <Icon src="/icons/python.webp"  loading="lazy"/>
        </div>
        <div className="absolute -translate-x-1/2 -bottom-6 left-1/2">
          <Icon src="/icons/cpp.webp" />
        </div>
      </div>

      {/* Outer Orbit (reverse) */}
      <div className="absolute orbit-reverse w-[380px] h-[380px] rounded-full border border-black">
        <div className="absolute -translate-x-1/2 -top-8 left-1/2">
          <Icon src="/icons/java.webp" size="large"  loading="lazy"/>
        </div>
        <div className="absolute -translate-x-1/2 -bottom-8 left-1/2">
          <Icon src="/icons/c.webp" size="large" />
        </div>
      </div>
    </div>
  );
}

function Icon({ src, size }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-white shadow-lg ${
        size === "large" ? "w-16 h-16" : "w-12 h-12"
      }`}
    >
      <img
        src={src}
        alt=""
        className={size === "large" ? "w-8 h-8" : "w-6 h-6"}
      />
    </div>
  );
}

export default LanguagesOrbit;
