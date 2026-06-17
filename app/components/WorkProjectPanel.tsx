"use client";

import { useEffect } from "react";
import {
  type WorkContentBlock,
  type WorkProject,
} from "@/lib/work-data";
import { useWorkPage } from "@/lib/work-page-context";

const BODY_CLASS =
  "text-[clamp(0.9375rem,2.1vw,1.0625rem)] leading-relaxed text-text-secondary";

function isTextBlock(block: WorkContentBlock): boolean {
  return (
    block.type === "paragraph" ||
    block.type === "list" ||
    block.type === "quote"
  );
}

function ContentBlock({ block }: { block: WorkContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className={BODY_CLASS}>{block.text}</p>;
    case "list":
      if (block.ordered) {
        return (
          <ol className={`${BODY_CLASS} list-decimal space-y-2 pl-5`}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className={`${BODY_CLASS} list-disc space-y-1.5 pl-5`}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-border-subtle pl-4">
          <p className={`${BODY_CLASS} italic text-text-primary`}>{block.text}</p>
          {block.attribution ? (
            <footer className="mt-2 text-[0.8125rem] text-text-secondary">
              — {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      );
    default:
      return null;
  }
}

type WorkProjectPanelProps = {
  project: WorkProject;
};

export function WorkProjectPanel({ project }: WorkProjectPanelProps) {
  const { selectedLayerId } = useWorkPage();

  useEffect(() => {
    if (!selectedLayerId) return;

    document
      .getElementById(`work-layer-${selectedLayerId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedLayerId, project.id]);

  return (
    <div className="flex w-full max-w-[40rem] flex-col pb-10">
      {project.description ? (
        <p className="mb-8 text-[clamp(1rem,2.4vw,1.125rem)] leading-relaxed text-text-secondary">
          {project.description}
        </p>
      ) : null}

      <div className="flex flex-col gap-10">
        {project.layers.map((layer) => {
          const textBlocks = layer.content.blocks.filter(isTextBlock);
          if (textBlocks.length === 0) {
            return null;
          }

          const isActive = selectedLayerId === layer.id;

          return (
            <section
              key={layer.id}
              id={`work-layer-${layer.id}`}
              className={`scroll-mt-6 flex flex-col gap-4 rounded-xl transition-colors ${
                isActive ? "bg-surface-white/40 p-4 -mx-4" : ""
              }`}
            >
              {layer.content.heading ? (
                <h2 className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold tracking-[-0.02em] text-text-primary">
                  {layer.content.heading}
                </h2>
              ) : null}

              <div className="flex flex-col gap-4">
                {textBlocks.map((block, index) => (
                  <ContentBlock key={`${layer.id}-${block.type}-${index}`} block={block} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
