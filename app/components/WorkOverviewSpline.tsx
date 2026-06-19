"use client";

import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

export const WORK_OVERVIEW_SPLINE_SCENE =
  "https://prod.spline.design/y6jwcXpqnu8C0nXa/scene.splinecode";

const SPLINE_FIT_ZOOM = 0.68;

function handleSplineLoad(application: Application) {
  application.setZoom(SPLINE_FIT_ZOOM);
  application.setBackgroundColor("transparent");
}

export function WorkOverviewSpline() {
  return (
    <div className="work-spline-scene" data-no-pan>
      <Spline
        scene={WORK_OVERVIEW_SPLINE_SCENE}
        className="work-spline-canvas"
        onLoad={handleSplineLoad}
      />
    </div>
  );
}
