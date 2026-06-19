"use client";

import { Float, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import type { Group } from "three";

const MODEL_PATH = "/models/tsukushi-rose/QS1252-W15-hinshu.gltf";
const TARGET_SIZE = 2.4;

function TsukushiRoses({ animate }: { animate: boolean }) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const model = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (
        (child as THREE.Light).isLight ||
        (child as THREE.Camera).isCamera
      ) {
        child.visible = false;
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = TARGET_SIZE / maxDim;

    clone.scale.setScalar(scale);

    const centeredBox = new THREE.Box3().setFromObject(clone);
    const center = centeredBox.getCenter(new THREE.Vector3());
    clone.position.sub(center);

    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (!animate || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
  });

  const flowers = (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );

  if (!animate) {
    return flowers;
  }

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.12}
      floatIntensity={0.28}
      floatingRange={[-0.06, 0.06]}
    >
      {flowers}
    </Float>
  );
}

export function HomeFlowersEmbed() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="home-flowers-embed pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 3.6], fov: 34 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 5, 4]} intensity={1.1} />
        <directionalLight position={[-2, 3, -1]} intensity={0.4} />
        <Suspense fallback={null}>
          <TsukushiRoses animate={!reduceMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
