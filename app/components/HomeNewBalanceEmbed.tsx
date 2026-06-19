"use client";

import { Float, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import type { Group } from "three";

const MODEL_PATH = "/models/new-balance.glb";
const TARGET_SIZE = 2.2;

function NewBalanceShoe({ animate }: { animate: boolean }) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const model = useMemo(() => {
    const clone = scene.clone(true);
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
    groupRef.current.rotation.y += delta * 0.35;
  });

  const shoe = (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );

  if (!animate) {
    return shoe;
  }

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.2}
      floatIntensity={0.35}
      floatingRange={[-0.08, 0.08]}
    >
      {shoe}
    </Float>
  );
}

export function HomeNewBalanceEmbed() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="home-new-balance-embed pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.1, 3.4], fov: 32 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 6, 5]} intensity={1.15} />
        <directionalLight position={[-3, 2, -2]} intensity={0.35} />
        <Suspense fallback={null}>
          <NewBalanceShoe animate={!reduceMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
