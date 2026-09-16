'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas3D({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold objects
    const group = new THREE.Group();
    scene.add(group);

    // 3D Outer Wireframe Polyhedron
    const geom = new THREE.IcosahedronGeometry(1.65, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyber Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const wireMesh = new THREE.Mesh(geom, wireMat);
    group.add(wireMesh);

    // Inner glowing crystal (Tech Indigo/Violet)
    const innerGeom = new THREE.IcosahedronGeometry(1.0, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8, // Electric Violet / Indigo
      wireframe: true,
      transparent: true,
      opacity: 0.24,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    group.add(innerMesh);

    // Subtle floating particles / nodes in Matrix Lime & Cyber Cyan
    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xb9e95b); // Lime
    const c2 = new THREE.Color(0x00f0ff); // Cyber Cyan
    const c3 = new THREE.Color(0x818cf8); // Indigo

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.9 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);

      const chosenColor = i % 9 === 0 ? c3 : (i % 6 === 0 ? c2 : c1);
      particleColors[i] = chosenColor.r;
      particleColors[i + 1] = chosenColor.g;
      particleColors[i + 2] = chosenColor.b;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    group.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.2;
      targetY = y * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    let isDisposed = false;
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotations
      group.rotation.y = elapsedTime * 0.15 + mouseX;
      group.rotation.x = elapsedTime * 0.08 + mouseY;
      innerMesh.rotation.y = -elapsedTime * 0.25;

      try {
        renderer.render(scene, camera);
      } catch {
        // Handle context lost or unmount gracefully
      }
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geom.dispose();
      wireMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
