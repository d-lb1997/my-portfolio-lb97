"use client";

export const WORK_OVERVIEW_SPLINE_EMBED_URL =
  "https://my.spline.design/liquidplaygroundmeetliquidglass-QBc0Gs4H45csTT9ogeuXmcx6-391/";

export function WorkOverviewSplineEmbed() {
  return (
    <div className="work-spline-embed pointer-events-auto" data-no-pan>
      <iframe
        src={WORK_OVERVIEW_SPLINE_EMBED_URL}
        title="Liquid Glass selected work showcase"
        loading="lazy"
        className="work-spline-embed-frame"
        allow="fullscreen"
      />
    </div>
  );
}
