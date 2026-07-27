import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function displaceWithNoiseAndPointer(
  geometry,
  basePositions,
  mesh,
  camera,
  pointer,
  time,
  { noiseStrength = 0.1, pointerStrength = 0.35, pointerRadius = 0.45 } = {},
) {
  const pos = geometry.attributes.position;
  const normal = geometry.attributes.normal;

  const world = new THREE.Vector3();
  const ndc = new THREE.Vector3();
  const mouse = new THREE.Vector2(pointer.x, pointer.y);

  for (let i = 0; i < pos.count; i++) {
    const i3 = i * 3;

    const nx = normal.getX(i);
    const ny = normal.getY(i);
    const nz = normal.getZ(i);

    // Base idle noise
    const noise =
      Math.sin(nx * 1.5 + time * 0.15) *
      Math.cos(ny * 1.5 + time * 0.1) *
      Math.sin(nz * 1.5 + time * 0.05);

    let displacement = noise * noiseStrength;

    // Pointer pull: vertices near cursor get extra outward push
    world.fromBufferAttribute(pos, i);
    mesh.localToWorld(world);
    ndc.copy(world).project(camera);

    const dist = Math.hypot(ndc.x - mouse.x, ndc.y - mouse.y);
    const influence = 1 - THREE.MathUtils.smoothstep(dist, 0, pointerRadius);

    displacement += influence * pointerStrength;

    pos.array[i3] = basePositions[i3] + nx * displacement;
    pos.array[i3 + 1] = basePositions[i3 + 1] + ny * displacement;
    pos.array[i3 + 2] = basePositions[i3 + 2] + nz * displacement;
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
}

const LiquidBlob = () => {
  const meshRef = useRef();
  const { size } = useThree();

  const blobRadius = useMemo(() => {
    if (size.width <= 657) return 1.1;
    if (size.width <= 820) return 1.3;
    return 1.3;
  }, [size.width]);

  const segments = size.width <= 657 ? 64 : 128;

  const { geometry, basePositions } = useMemo(() => {
    const geo = new THREE.SphereGeometry(blobRadius, segments, segments);
    const base = geo.attributes.position.array.slice();
    return { geometry: geo, basePositions: base };
  }, [blobRadius, segments]);

  // Animating with useFrame
  useFrame(({ clock, pointer, camera }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.getElapsedTime();

    // 1) Noise distortion
    displaceWithNoiseAndPointer(
      geometry,
      basePositions,
      mesh,
      camera,
      pointer,
      t,
      { noiseStrength: 0.005, pointerStrength: 0.15, pointerRadius: 0.7 },
    );

    // 3) Subtle scale pulse
    const scale = 1 + Math.sin(t * 1.1) * 0.03;
    mesh.scale.setScalar(scale);

    // 4) Slow idle rotation
    mesh.rotation.y = t * 0.08;
    mesh.rotation.x = Math.sin(t * 0.4) * 0.08;

    // 5) Mouse/touch response (canvas-relative pointer from R3F)
    const targetRotX = pointer.y * 0.12;
    const targetRotY = pointer.x * 0.15;

    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetRotX, 0.06);
    mesh.rotation.y = THREE.MathUtils.lerp(
      mesh.rotation.y,
      t * 0.08 + targetRotY,
      0.06,
    );

    // Optional: slight positional follow
    const floatY = Math.sin(t * 0.6) * 0.2;
    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, floatY, 0.06);
    mesh.position.x = THREE.MathUtils.lerp(
      mesh.position.x,
      pointer.x * 0.08,
      0.06,
    );
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.5}
        thickness={0.5}
        roughness={0}
        transmission={1.0} // Makes it perfectly clear like glass
        ior={1.5} // Index of Refraction for glass
        chromaticAberration={0} // Rainbow fringe effect
        anisotropy={0.1}
        distortion={0} // Adds internal distortion to the glass
        temporalDistortion={0}
        samples={size.width <= 657 ? 6 : 10}
        resolution={size.width <= 657 ? 256 : 512} // transmission buffer quality
        envMapIntensity={1.2} // brighter reflections
        color="#ffffff"
      />
    </mesh>
  );
};

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useFrame(() => {
    const aspect = size.width / size.height;

    // Wider canvas → pull camera back; taller/narrow → closer
    camera.position.z = aspect > 1.2 ? 5.2 : 4.4;
    camera.position.y = aspect < 0.9 ? 0.2 : 0;

    camera.fov = size.width < 657 ? 50 : 45;
    camera.updateProjectionMatrix();
  });

  return null;
}

export default function LiquidGlassBlob() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <pointLight position={[3, 3, 4]} intensity={3} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#80cbc4" />

      <ResponsiveCamera />
      <LiquidBlob />

      {/* <Environment preset="night" /> */}
      <Environment files="/environments/passendorf_snow_1k.hdr" />
    </Canvas>
  );
}
