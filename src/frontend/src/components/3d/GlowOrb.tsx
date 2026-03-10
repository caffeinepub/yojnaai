import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type * as THREE from "three";

function OrbScene() {
  const orbRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orbRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.06;
      orbRef.current.scale.setScalar(scale);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.6;
      ring1Ref.current.rotation.z = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.8;
      ring2Ref.current.rotation.x = t * 0.4;
    }
    if (outerRef.current) {
      const outerScale = 1 + Math.sin(t * 0.8 + 1) * 0.08;
      outerRef.current.scale.setScalar(outerScale);
      (outerRef.current.material as THREE.MeshStandardMaterial).opacity =
        0.1 + Math.sin(t * 1.2) * 0.05;
    }
  });

  return (
    <group>
      {/* Core orb */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#6C5CE7"
          emissive="#6C5CE7"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#6C5CE7"
          emissive="#6C5CE7"
          emissiveIntensity={0.2}
          transparent
          opacity={0.12}
          wireframe={false}
        />
      </mesh>

      {/* Purple ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#6C5CE7"
          emissive="#6C5CE7"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Cyan ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.2, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={1.0}
        />
      </mesh>

      {/* Lights */}
      <pointLight
        color="#6C5CE7"
        intensity={4}
        distance={12}
        position={[0, 0, 0]}
      />
      <pointLight
        color="#00D4FF"
        intensity={2}
        distance={8}
        position={[3, 2, 0]}
      />
      <ambientLight intensity={0.3} />
    </group>
  );
}

export default function GlowOrb() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <OrbScene />
      </Suspense>
    </Canvas>
  );
}
