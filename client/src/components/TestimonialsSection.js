import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  { name: "CSE 538", content: "Amazing platform!" },
  { name: "CSE 527", content: "Very helpful." },
  { name: "CSE 566", content: "My DSA skills improved!" },
];

export function TestimonialsSection() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", () => setIndex(embla.selectedScrollSnap()));
  }, [embla]);

  return (
    <div className="mt-96">
    <section className="py-12 mt-96 ml-52">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-full p-6">
              <p>"{t.content}"</p>
              <p className="mt-4 text-sm text-center text-gray-500">
                {index + 1} / {testimonials.length}
              </p>
              <strong>{t.name}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
