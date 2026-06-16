"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    id: "project-1",
    title: "Project Alpha",
    description: "End-to-end product design, prototyping, and user testing.",
    accent: "#FF3CAC",
  },
  {
    id: "project-2",
    title: "Project Beta",
    description: "Design system implementation and cross-platform components.",
    accent: "#2DCC70",
  },
  {
    id: "project-3",
    title: "Project Gamma",
    description: "Interaction design, motion, and microcopy improvements.",
    accent: "#3498DB",
  },
  {
    id: "project-4",
    title: "Project Delta",
    description: "Research-led redesign of a complex workflow tool.",
    accent: "#F39C12",
  },
];

export function WorkFrame() {
  return (
    <section className="w-[1100px]" aria-label="Work">
      <h2 className="mb-8 text-[36px] font-semibold tracking-[-0.02em] text-text-primary">
        Selected Work
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <motion.a
            key={project.id}
            href="#"
            className="group block rounded-sm bg-surface-white shadow-sm transition-shadow"
            style={{ borderTop: `3px solid ${project.accent}` }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 12px 40px var(--surface-shadow)",
            }}
            transition={{ duration: 0.2 }}
            data-no-pan
          >
            <div className="px-4 pt-3">
              <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-text-secondary">
                {project.title}
              </span>
            </div>
            <div className="work-card-thumb mx-4 mt-2 h-[140px] rounded-sm" />
            <div className="p-5 pt-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {project.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                {project.description}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-text-primary group-hover:underline">
                Case study →
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
