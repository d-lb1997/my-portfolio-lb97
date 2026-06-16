"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

type AboutPersonModelProps = {
  rotationY: number;
};

const COLORS = {
  skin: "#c9956a",
  skinShadow: "#a9774f",
  hair: "#8b5e3c",
  hairHighlight: "#b87333",
  shirt: "#101010",
  jeans: "#7ba4c7",
  jeansShadow: "#5f86a8",
  shoe: "#f0f0f0",
  shoeSole: "#2a2a2a",
  eyeWhite: "#f7f7f7",
  eyePupil: "#2f2418",
  brow: "#6f4528",
  teeth: "#f5f0e8",
};

function HairSpikes() {
  const spikes = useMemo(
    () => [
      { position: [0, 0.17, 0.02] as const, rotation: [0.2, 0, 0] as const, scale: [1, 1.15, 1] as const },
      { position: [-0.07, 0.14, 0.04] as const, rotation: [0.35, 0.35, -0.25] as const, scale: [0.85, 1, 0.9] as const },
      { position: [0.07, 0.14, 0.04] as const, rotation: [0.35, -0.35, 0.25] as const, scale: [0.85, 1, 0.9] as const },
      { position: [-0.11, 0.08, -0.02] as const, rotation: [0.1, 0.55, -0.45] as const, scale: [0.75, 0.9, 0.85] as const },
      { position: [0.11, 0.08, -0.02] as const, rotation: [0.1, -0.55, 0.45] as const, scale: [0.75, 0.9, 0.85] as const },
      { position: [0, 0.1, -0.1] as const, rotation: [-0.35, 0, 0] as const, scale: [0.9, 0.75, 0.95] as const },
      { position: [-0.04, 0.16, -0.06] as const, rotation: [-0.15, 0.2, -0.1] as const, scale: [0.7, 0.85, 0.8] as const },
      { position: [0.04, 0.16, -0.06] as const, rotation: [-0.15, -0.2, 0.1] as const, scale: [0.7, 0.85, 0.8] as const },
    ],
    [],
  );

  return (
    <group position={[0, 1.56, 0]}>
      {spikes.map((spike, index) => (
        <mesh
          key={index}
          position={spike.position}
          rotation={spike.rotation}
          scale={spike.scale}
        >
          <coneGeometry args={[0.055, 0.16, 6]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? COLORS.hair : COLORS.hairHighlight}
            roughness={0.72}
            metalness={0.04}
          />
        </mesh>
      ))}
    </group>
  );
}

function Head() {
  return (
    <group position={[0, 1.56, 0]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial color={COLORS.skin} roughness={0.58} metalness={0.02} />
      </mesh>

      <mesh position={[0, -0.02, 0.11]} scale={[0.85, 0.55, 0.45]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color={COLORS.skinShadow} roughness={0.62} metalness={0.02} />
      </mesh>

      <mesh position={[-0.042, 0.02, 0.105]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color={COLORS.eyeWhite} roughness={0.35} />
      </mesh>
      <mesh position={[0.042, 0.02, 0.105]}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial color={COLORS.eyeWhite} roughness={0.35} />
      </mesh>
      <mesh position={[-0.042, 0.018, 0.118]}>
        <sphereGeometry args={[0.007, 12, 12]} />
        <meshStandardMaterial color={COLORS.eyePupil} roughness={0.4} />
      </mesh>
      <mesh position={[0.042, 0.018, 0.118]}>
        <sphereGeometry args={[0.007, 12, 12]} />
        <meshStandardMaterial color={COLORS.eyePupil} roughness={0.4} />
      </mesh>

      <mesh position={[-0.055, 0.055, 0.1]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.035, 0.008, 0.012]} />
        <meshStandardMaterial color={COLORS.brow} roughness={0.7} />
      </mesh>
      <mesh position={[0.055, 0.055, 0.1]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.035, 0.008, 0.012]} />
        <meshStandardMaterial color={COLORS.brow} roughness={0.7} />
      </mesh>

      <mesh position={[0, -0.015, 0.112]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.055, 0.014, 0.018]} />
        <meshStandardMaterial color={COLORS.skinShadow} roughness={0.62} />
      </mesh>
      <mesh position={[0, -0.028, 0.108]}>
        <boxGeometry args={[0.05, 0.018, 0.022]} />
        <meshStandardMaterial color={COLORS.teeth} roughness={0.45} />
      </mesh>
    </group>
  );
}

function Limb({
  position,
  rotation,
  length,
  radius,
  color,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  length: number;
  radius: number;
  color: string;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <capsuleGeometry args={[radius, length, 8, 16]} />
      <meshStandardMaterial color={color} roughness={0.62} metalness={0.02} />
    </mesh>
  );
}

export function AboutPersonModel({ rotationY }: AboutPersonModelProps) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = rotationY;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.012;
  });

  return (
    <group ref={groupRef} position={[0, -0.9, 0]}>
      <Head />
      <HairSpikes />

      <mesh position={[0, 1.33, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.05, 0.08, 16]} />
        <meshStandardMaterial color={COLORS.skin} roughness={0.58} />
      </mesh>

      <mesh position={[0, 1.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.36, 0.52, 0.18]} />
        <meshStandardMaterial color={COLORS.shirt} roughness={0.78} metalness={0.03} />
      </mesh>

      <mesh position={[0, 1.02, 0.08]}>
        <boxGeometry args={[0.34, 0.48, 0.04]} />
        <meshStandardMaterial color="#181818" roughness={0.82} />
      </mesh>

      <Limb
        position={[-0.23, 1.02, 0]}
        rotation={[0, 0, 0.18]}
        length={0.34}
        radius={0.042}
        color={COLORS.shirt}
      />
      <Limb
        position={[0.23, 1.02, 0]}
        rotation={[0, 0, -0.18]}
        length={0.34}
        radius={0.042}
        color={COLORS.shirt}
      />
      <Limb
        position={[-0.28, 0.72, 0.02]}
        rotation={[0, 0, 0.08]}
        length={0.28}
        radius={0.038}
        color={COLORS.skin}
      />
      <Limb
        position={[0.28, 0.72, 0.02]}
        rotation={[0, 0, -0.08]}
        length={0.28}
        radius={0.038}
        color={COLORS.skin}
      />

      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[0.3, 0.12, 0.16]} />
        <meshStandardMaterial color={COLORS.jeansShadow} roughness={0.82} />
      </mesh>

      <Limb
        position={[-0.09, 0.42, 0]}
        rotation={[0, 0, 0.03]}
        length={0.52}
        radius={0.055}
        color={COLORS.jeans}
      />
      <Limb
        position={[0.09, 0.42, 0]}
        rotation={[0, 0, -0.03]}
        length={0.52}
        radius={0.055}
        color={COLORS.jeans}
      />

      <mesh position={[-0.09, 0.08, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.11, 0.07, 0.24]} />
        <meshStandardMaterial color={COLORS.shoe} roughness={0.55} />
      </mesh>
      <mesh position={[-0.09, 0.04, 0.02]}>
        <boxGeometry args={[0.12, 0.03, 0.26]} />
        <meshStandardMaterial color={COLORS.shoeSole} roughness={0.85} />
      </mesh>
      <mesh position={[0.09, 0.08, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.11, 0.07, 0.24]} />
        <meshStandardMaterial color={COLORS.shoe} roughness={0.55} />
      </mesh>
      <mesh position={[0.09, 0.04, 0.02]}>
        <boxGeometry args={[0.12, 0.03, 0.26]} />
        <meshStandardMaterial color={COLORS.shoeSole} roughness={0.85} />
      </mesh>
    </group>
  );
}
