"use client";

import Image from "next/image";

const BADGES = [
  { label: "Based in Munich", color: "#FF3CAC", style: { top: "-20px", right: "40px" } },
  { label: "5 years in the field", color: "#2DCC70", style: { bottom: "60px", left: "-30px" } },
  {
    label: "Currently: Open to work",
    color: "#3498DB",
    style: { bottom: "-10px", right: "20px" },
  },
];

export function AboutFrame() {
  return (
    <section
      className="relative flex h-[700px] w-[1000px] items-center rounded-sm bg-surface-white px-12 py-10 shadow-sm"
      aria-label="About"
    >
      {BADGES.map((badge) => (
        <div
          key={badge.label}
          className="absolute z-10"
          style={badge.style}
        >
          <span
            className="inline-block rounded-md px-3 py-1.5 text-[13px] font-semibold text-white shadow-md"
            style={{ backgroundColor: badge.color }}
          >
            {badge.label}
          </span>
        </div>
      ))}

      <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex justify-center">
          <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border-[6px] border-white shadow-lg">
            <Image
              src="/images/portrait.png"
              alt="Portrait of Lukas"
              fill
              className="object-cover"
              sizes="280px"
              priority
            />
          </div>
        </div>

        <div>
          <h2 className="text-[36px] font-semibold tracking-[-0.02em] text-text-primary">
            About me
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-text-secondary">
            Hi — I&apos;m Lukas, an experience designer focused on human-centered
            products. I work across research, visual design, and interaction to
            make interfaces feel natural and useful.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-text-secondary">
            This isn&apos;t a resumé — it&apos;s me talking to you like a human. I
            think in systems, in space, in structure. And I care deeply about the
            people on the other side of the screen.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-2 text-[15px] text-text-primary">
            <li>Product & UX design</li>
            <li>Prototyping & testing</li>
            <li>Design systems</li>
            <li>Interaction & motion</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
