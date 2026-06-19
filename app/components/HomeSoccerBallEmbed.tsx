"use client";

export const HOME_SOCCER_BALL_EMBED_URL =
  "https://sketchfab.com/models/ecb011fedb1b4bef8247283ad57bbf3b/embed?autostart=1&autospin=0.12&ui_controls=0&ui_infos=0&ui_watermark=0&ui_stop=0&ui_inspector=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&transparent=1";

export function HomeSoccerBallEmbed() {
  return (
    <div className="home-soccer-ball-embed pointer-events-none" aria-hidden="true">
      <iframe
        src={HOME_SOCCER_BALL_EMBED_URL}
        title="2026 FIFA World Cup ball Trionda"
        loading="lazy"
        className="home-soccer-ball-embed-frame"
        allow="autoplay; fullscreen; xr-spatial-tracking"
      />
    </div>
  );
}
