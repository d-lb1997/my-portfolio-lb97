"use client";

import Spline from "@splinetool/react-spline";

export const WORK_OVERVIEW_SPLINE_SCENE =
  "https://prod.spline.design/y6jwcXpqnu8C0nXa/scene.splinecode";

export function WorkOverviewSpline() {
  return (
    <div className="work-spline-scene" data-no-pan>
      <Spline scene={WORK_OVERVIEW_SPLINE_SCENE} className="h-full w-full" />
    </div>
  );
}
