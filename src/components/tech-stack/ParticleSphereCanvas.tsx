"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { ALL_TECH_ITEMS_3D, TechItem3D } from "@/data/techStack3dData";
import TechNodeOverlay from "./TechNodeOverlay";

type ProjectedNode = {
  item: TechItem3D;
  screenX: number;
  screenY: number;
  scale: number;
  isFront: boolean;
};

type Props = {
  activeTech: TechItem3D | null;
  onHoverTech: (item: TechItem3D | null) => void;
  onSelectTech: (item: TechItem3D | null) => void;
};

export default function ParticleSphereCanvas({
  activeTech,
  onHoverTech,
  onSelectTech,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [projectedNodes, setProjectedNodes] = useState<ProjectedNode[]>([]);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mainGroupRef = useRef<THREE.Group | null>(null);

  // Physics & Trackball rotation state
  const currentRotRef = useRef({ x: 0.1, y: 0 });
  const dragRotationRef = useRef({ x: 0.1, y: 0 });
  const hoverOffsetRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const pointerDownPosRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  // Helper to create particle texture with soft radial glow
  const createParticleTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.25, "rgba(52, 211, 153, 0.85)");
    gradient.addColorStop(0.65, "rgba(16, 185, 129, 0.25)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  };

  // Build 3D concentric orbital paths
  const buildOrbitalArcs = useCallback((group: THREE.Group) => {
    const arcRadii = [7.2, 9.0, 10.8];
    const arcColors = [0x34d399, 0x10b981, 0x059669];

    arcRadii.forEach((radius, idx) => {
      const points: THREE.Vector3[] = [];
      const segments = 128;

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const elevationTilt = (idx - 1) * 0.5;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        const y = Math.sin(theta * 2) * 0.6 + elevationTilt;
        points.push(new THREE.Vector3(x, y, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: arcColors[idx],
        transparent: true,
        opacity: 0.2 - idx * 0.04,
      });

      const line = new THREE.Line(geometry, material);
      group.add(line);
    });
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 26);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Main rotating group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainGroupRef.current = mainGroup;

    // 1. Particle Sphere (Core)
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 1800 : 3800;
    const sphereRadius = 4.6;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const r = sphereRadius + (Math.random() - 0.5) * 0.35;
      positions[i * 3] = Math.cos(theta) * radiusAtY * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * r;

      const isAccent = Math.random() < 0.16;
      if (isAccent) {
        colors[i * 3] = 0.2; // Emerald accent #34d399
        colors[i * 3 + 1] = 0.82;
        colors[i * 3 + 2] = 0.6;
      } else {
        const b = 0.65 + Math.random() * 0.35;
        colors[i * 3] = 0.75 * b;
        colors[i * 3 + 1] = 0.88 * b;
        colors[i * 3 + 2] = 1.0 * b;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.16 : 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: createParticleTexture() || undefined,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particlePoints);

    // Inner wireframe glow core
    const innerCoreGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    mainGroup.add(innerCore);

    // 2. Build 3D Orbital Arcs
    buildOrbitalArcs(mainGroup);

    // IntersectionObserver for viewport pause
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Golden spiral angle for uniform 3D node distribution
    const N = ALL_TECH_ITEMS_3D.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    // Animation Loop
    let animationFrameId: number;
    let idleRotation = 0;

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);

      if (!isVisibleRef.current || !mainGroupRef.current || !cameraRef.current || !containerRef.current) {
        return;
      }

      // Physics rotation update (smooth inertia & Trackball physics)
      if (!isDraggingRef.current) {
        // Apply inertia velocity
        dragRotationRef.current.y += velocityRef.current.y;
        dragRotationRef.current.x = Math.max(
          -0.8,
          Math.min(0.8, dragRotationRef.current.x + velocityRef.current.x)
        );

        // Decelerate velocity
        velocityRef.current.x *= 0.92;
        velocityRef.current.y *= 0.92;
      }

      // Continuous subtle idle rotation
      idleRotation += 0.0015;

      const targetY = idleRotation + dragRotationRef.current.y + hoverOffsetRef.current.y;
      const targetX = dragRotationRef.current.x + hoverOffsetRef.current.x;

      // Ultra-smooth lerp interpolation
      currentRotRef.current.y += (targetY - currentRotRef.current.y) * 0.08;
      currentRotRef.current.x += (targetX - currentRotRef.current.x) * 0.08;

      mainGroupRef.current.rotation.y = currentRotRef.current.y;
      mainGroupRef.current.rotation.x = currentRotRef.current.x;

      renderer.render(scene, camera);

      // Project all 3D tech nodes with UNIFORM Fibonacci distribution around the sphere
      const projected: ProjectedNode[] = [];
      const cW = containerRef.current.clientWidth;
      const cH = containerRef.current.clientHeight;

      ALL_TECH_ITEMS_3D.forEach((item, i) => {
        const yNorm = 1 - (i / (N - 1)) * 2;
        const radiusAtY = Math.sqrt(Math.max(0.1, 1 - yNorm * yNorm));
        const theta = goldenAngle * i;

        // Concentric depth radius layer
        const layerRadius = 7.4 + (i % 3) * 1.6;

        // 3D position in local space
        const localPos = new THREE.Vector3(
          Math.cos(theta) * radiusAtY * layerRadius,
          yNorm * 3.6,
          Math.sin(theta) * radiusAtY * layerRadius
        );

        // Apply group rotation matrix
        localPos.applyEuler(mainGroupRef.current!.rotation);

        // Project to screen space
        const tempVec = localPos.clone();
        tempVec.project(cameraRef.current!);

        const screenX = (tempVec.x * 0.5 + 0.5) * cW;
        const screenY = (-tempVec.y * 0.5 + 0.5) * cH;

        // Depth scale
        const depthFactor = (localPos.z + 14) / 28;
        const scale = Math.max(0.7, Math.min(1.12, depthFactor));
        const isFront = localPos.z > 0;

        projected.push({
          item,
          screenX,
          screenY,
          scale,
          isFront,
        });
      });

      setProjectedNodes(projected);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      particleGeometry.dispose();
      particleMaterial.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      renderer.dispose();
    };
  }, [buildOrbitalArcs]);

  // Enhanced Pointer Handlers for Ultra-Smooth Globe Dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY };

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - prevPointerRef.current.x;
      const deltaY = e.clientY - prevPointerRef.current.y;

      const rotSpeed = 0.006;
      dragRotationRef.current.y += deltaX * rotSpeed;
      dragRotationRef.current.x = Math.max(
        -0.8,
        Math.min(0.8, dragRotationRef.current.x + deltaY * rotSpeed)
      );

      velocityRef.current = {
        x: deltaY * rotSpeed,
        y: deltaX * rotSpeed,
      };

      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    } else {
      // Smooth subtle hover parallax
      hoverOffsetRef.current = {
        x: relativeY * 0.2,
        y: relativeX * 0.3,
      };
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch {
      // Fallback
    }
  };

  const handleNodeClick = (item: TechItem3D) => {
    // Only trigger select if not dragging (dist < 8px)
    const dx = Math.abs(prevPointerRef.current.x - pointerDownPosRef.current.x);
    const dy = Math.abs(prevPointerRef.current.y - pointerDownPosRef.current.y);
    if (dx < 8 && dy < 8) {
      onSelectTech(item);
    }
  };

  const relatedTechIds = activeTech ? activeTech.relatedIds : [];

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative h-[620px] w-full cursor-grab active:cursor-grabbing touch-none select-none rounded-3xl border border-zinc-800/40 bg-zinc-950/40"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Render 2D HTML Overlays - ALWAYS VISIBLE */}
      {projectedNodes.map((node) => (
        <TechNodeOverlay
          key={node.item.id}
          item={node.item}
          screenX={node.screenX}
          screenY={node.screenY}
          scale={node.scale}
          isFront={node.isFront}
          isHovered={activeTech?.id === node.item.id}
          isRelated={relatedTechIds.includes(node.item.id)}
          isSelected={activeTech?.id === node.item.id}
          onHover={(item) => onHoverTech(item)}
          onClick={() => handleNodeClick(node.item)}
        />
      ))}

      {/* Ambient hint */}
      <div className="pointer-events-none absolute top-4 left-6 z-20 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
        ✦ Globo 3D Interactivo · Arrastra para girar libremente
      </div>
    </div>
  );
}
