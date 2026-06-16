export function CanvasBackground() {
  return (
    <div className="canvas-scene pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="canvas-scene-base" />
      <div className="canvas-scene-spectrum" />
    </div>
  );
}
