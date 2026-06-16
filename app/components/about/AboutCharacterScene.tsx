"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AboutPersonModel } from "./AboutPersonModel";

type AboutCharacterSceneProps = {
  rotationY: number;
};

export function AboutCharacterScene({ rotationY }: AboutCharacterSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 1.05, 3.35], fov: 38 }}
      className="touch-none"
    >
      <color attach="background" args={["transparent"]} />
      <ambientLight intensity={0.72} />
      <directionalLight
        castShadow
        intensity={1.15}
        position={[2.5, 4.5, 3.5]}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight intensity={0.35} position={[-3, 2.5, -2]} />
      <pointLight intensity={0.25} position={[0, 2.2, 2]} />

      <AboutPersonModel rotationY={rotationY} />

      <ContactShadows
        position={[0, -0.02, 0]}
        opacity={0.35}
        scale={8}
        blur={2.4}
        far={4}
      />
    </Canvas>
  );
}
