// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import { Terminal, Code2, TestTube, Lightbulb, FileCode, Bug } from "lucide-react";
// import { ChatPreview } from "./ChatPreview";

// const stages = [
//   { icon: Terminal, title: "Problem Understanding", description: "Break down the problem." },
//   { icon: TestTube, title: "Test Case Analysis", description: "Analyze edge cases." },
//   { icon: Lightbulb, title: "Logic Building", description: "Build approach." },
//   { icon: Code2, title: "Algorithm", description: "Design algorithm." },
//   { icon: FileCode, title: "Implementation", description: "Write code." },
//   { icon: Bug, title: "Debug", description: "Fix issues." },
// ];

// function StageCard({ stage, index }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref });
//   const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

//   const Icon = stage.icon;

//   return (
//     <motion.div ref={ref} style={{ y }} className="py-4 ml-48 bg-gray-100 rounded-lg shadow">
//       <div className="flex items-center gap-4 ">
//         <Icon />
//         <div>
//           <h3 className="font-semibold">{stage.title}</h3>
//           <p>{stage.description}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export function FeaturesSection() {
//   return (
//     <section className="container mt-10">
//       <div className="space-y-8">
//         {stages.map((s, i) => (
//           <StageCard key={i} stage={s} index={i} />
//         ))}
//       </div>
//       <ChatPreview />
//     </section>
//   );
// }
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Terminal,
  Code2,
  TestTube,
  Lightbulb,
  FileCode,
  Bug,
} from "lucide-react";
import { ChatPreview } from "./ChatPreview";
import Footer from "./Footer";
// import { TestimonialsSection } from "./TestimonialsSection";

const stages = [
  {
    icon: Terminal,
    title: "Problem Understanding",
    description:
      "Break down the problem, analyze requirements, and identify constraints.",
  },
  {
    icon: TestTube,
    title: "Test Case Analysis",
    description: "Review test cases and edge cases.",
  },
  {
    icon: Lightbulb,
    title: "Logic Building",
    description: "Develop a clear approach and solution strategy.",
  },
  {
    icon: Code2,
    title: "Algorithm & Pseudocode",
    description: "Design step-by-step algorithm and analyze complexity.",
  },
  {
    icon: FileCode,
    title: "Implementation",
    description: "Write clean and structured code.",
  },
  {
    icon: Bug,
    title: "Dry Run & Debug",
    description: "Test logic, fix bugs, and optimize.",
  },
];

function StageCard({ stage, index }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 2]);

  const Icon = stage.icon;

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative flex gap-4 p-6 ml-16 rounded-lg shadow-lg bg-zinc-900"
    >
      {/* Step Number */}
      <div className="absolute flex items-center justify-center text-sm font-bold text-black -translate-y-1/2 bg-green-500 rounded-full -left-10 top-1/2 h-7 w-7">
        {index + 1}
      </div>

      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10">
        <Icon className="w-6 h-6 text-green-400" />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
        <p className="text-sm text-gray-400">{stage.description}</p>
      </div>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container max-w-4xl px-4 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-black">
            Find Your Flow with CodeZen
          </h2>
          <p className="max-w-2xl mx-auto mt-3 text-gray-400">
            CodeZen guides you step by step — from understanding the problem to
            writing optimized code with clarity and confidence.{" "}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 w-px left-7 bg-green-500/30" />

          <div className="space-y-10">
            {stages.map((stage, index) => (
              <StageCard key={stage.title} stage={stage} index={index} />
            ))}
          </div>
        </div>

        {/* Chat Preview */}
        <div className="-ml-48 -mt-14">
          <ChatPreview />
          {/* <Footer /> */}
          {/* <TestimonialsSection /> */}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
