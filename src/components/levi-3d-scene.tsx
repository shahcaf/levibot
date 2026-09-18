"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Levi3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.15, 5.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xa8b8ff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x8b5cf6, 22, 12);
    keyLight.position.set(2.5, 2.5, 3.5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 16, 10);
    rimLight.position.set(-3, -1, 2);
    scene.add(rimLight);

    const core = new THREE.Group();
    scene.add(core);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x9b8cff,
      emissive: 0x21134f,
      emissiveIntensity: 1.1,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.92, 0.22, 160, 24, 2, 3), material);
    core.add(knot);

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.48, 2),
      new THREE.MeshBasicMaterial({ color: 0xc4b5fd, wireframe: true, transparent: true, opacity: 0.8 }),
    );
    core.add(inner);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.55 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.012, 12, 96), ringMaterial);
    ring.rotation.x = Math.PI / 2.4;
    core.add(ring);

    const nodeGeometry = new THREE.SphereGeometry(0.075, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xa5f3fc });
    const nodes = new THREE.Group();
    for (let index = 0; index < 8; index += 1) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const angle = (index / 8) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 1.85, Math.sin(angle) * 0.7, Math.sin(angle) * 0.55);
      nodes.add(node);
    }
    core.add(nodes);

    const resize = () => {
      const width = container.clientWidth || 320;
      const height = container.clientHeight || 320;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    container.addEventListener("pointermove", handlePointerMove);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    const animate = () => {
      if (!reduceMotion) {
        knot.rotation.x += 0.0025;
        knot.rotation.y += 0.004;
        inner.rotation.y -= 0.003;
        ring.rotation.z += 0.002;
        nodes.rotation.y -= 0.002;
        core.rotation.x += (pointer.y * 0.16 - core.rotation.x) * 0.03;
        core.rotation.z += (-pointer.x * 0.16 - core.rotation.z) * 0.03;
      }
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      material.dispose();
      ringMaterial.dispose();
      nodeMaterial.dispose();
      knot.geometry.dispose();
      inner.geometry.dispose();
      ring.geometry.dispose();
      nodeGeometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="levi-3d-scene" aria-label="Interactive LeviBots command core" role="img" />
  );
}
