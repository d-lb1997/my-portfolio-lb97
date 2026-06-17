"use client";

import Image from "next/image";
import { WORK_NAV_WIDTH } from "@/lib/pages";
import {
  getLayerContent,
  type WorkContentBlock,
  type WorkProject,
} from "@/lib/work-data";
import { useWorkPage } from "@/lib/work-page-context";

const BODY_CLASS =
  "text-[clamp(0.9375rem,2.1vw,1.0625rem)] leading-relaxed text-text-secondary";

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
    case "image":
      return (
        <figure className="overflow-hidden rounded-xl border border-border-subtle bg-surface-white/70 shadow-sm">
          <Image
            src={block.src}
            alt={block.alt}
            width={960}
            height={540}
            className="h-auto w-full object-cover"
          />
          {block.caption ? (
            <figcaption className="px-4 py-2.5 text-[0.8125rem] text-text-secondary">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    case "placeholder":
      return (
        <div
          className="flex w-full items-center justify-center rounded-xl border border-dashed border-border-subtle bg-surface-white/70 shadow-sm"
          style={{ aspectRatio: block.aspectRatio ?? "16 / 10" }}
        >
          <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-text-secondary">
            {block.label}
          </span>
        </div>
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
  const layerContent = getLayerContent(project, selectedLayerId);

  if (!layerContent) {
    return null;
  }

  return (
    <div
      className="absolute top-[72px] flex max-h-[calc(100%-88px)] w-[min(52rem,calc(100%-3rem))] flex-col overflow-y-auto pr-6 pb-10"
      style={{ left: WORK_NAV_WIDTH + 48 }}
      data-no-pan
    >
      {project.description && (
        <p className="mb-6 max-w-[40rem] text-[clamp(1rem,2.4vw,1.125rem)] leading-relaxed text-text-secondary">
          {project.description}
        </p>
      )}

      <div className="flex flex-col gap-5">
        {layerContent.heading ? (
          <h2 className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold tracking-[-0.02em] text-text-primary">
            {layerContent.heading}
          </h2>
        ) : null}

        <div className="flex flex-col gap-4">
          {layerContent.blocks.map((block, index) => (
            <ContentBlock key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
