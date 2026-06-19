"use client";

export const ABOUT_STORY_EMBED_URL =
  "https://sketchfab.com/models/94cb7eddfe2a4d5b84a9cb9d564ad776/embed?autostart=1";

export function AboutStoryEmbed() {
  return (
    <div className="about-story-embed" data-no-pan>
      <iframe
        src={ABOUT_STORY_EMBED_URL}
        title="Spider-verse Web Comic"
        loading="lazy"
        className="about-story-embed-frame"
        allow="autoplay; fullscreen; xr-spatial-tracking"
      />
    </div>
  );
}
