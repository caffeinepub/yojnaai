import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type * as THREE from "three";

interface CardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  index: number;
}

function SchemeCard3D({ position, rotation, color, index }: CardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        initialY + Math.sin(state.clock.elapsedTime * 0.7 + index * 2.1) * 0.25;
      meshRef.current.rotation.y =
        rotation[1] + Math.sin(state.clock.elapsedTime * 0.4 + index) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[2.4, 1.4, 0.06]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.4}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  );
}

export default function FloatingCards() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight color="#6C5CE7" intensity={3} position={[2, 2, 3]} />
        <pointLight color="#00D4FF" intensity={2} position={[-3, -1, 2]} />

        <SchemeCard3D
          position={[-2.5, 0.5, 0]}
          rotation={[0.1, 0.3, -0.08]}
          color="#6C5CE7"
          index={0}
        />
        <SchemeCard3D
          position={[2.5, -0.3, -0.5]}
          rotation={[-0.05, -0.4, 0.06]}
          color="#00D4FF"
          index={1}
        />
        <SchemeCard3D
          position={[0, 1.2, -1]}
          rotation={[0.15, 0.1, 0.04]}
          color="#a78bfa"
          index={2}
        />
      </Suspense>
    </Canvas>
  );
}
