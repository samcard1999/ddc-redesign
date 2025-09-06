import { useEffect, useRef } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const spheresRef = useRef([]);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const resizeObsRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;

    // 📌 Contenedor: la sección que lo envuelve
    const container = mountEl.parentElement; // <- pon el componente dentro de la sección
    container.style.position = container.style.position || "relative";

    // medidas iniciales de la sección
    const getSize = () => ({
      w: container.clientWidth || window.innerWidth,
      h: container.clientHeight || window.innerHeight,
    });
    let { w, h } = getSize();

    // helpers responsive por ancho del contenedor
    const breakpoints = { sm: 640, md: 2100, lg: 3200 };

    const getRadius = (vw) => {
      if (vw < breakpoints.sm) return 1.2;
      if (vw < breakpoints.md) return 2.2;
      if (vw > breakpoints.lg) return 3.3;
      return 2.2;
    };
    const getBlur = (vw) => {
      if (vw < breakpoints.sm) return 66;
      if (vw < breakpoints.md) return 106;
      if (vw > breakpoints.lg) return 530;
      return 106;
    };

    // ——— Three.js setup ———
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 7;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    rendererRef.current = renderer;

    mountEl.appendChild(renderer.domElement);

    // blur / brillo del canvas (solo visual)
    mountEl.style.filter = `blur(${getBlur(w)}px) brightness(0.1)`;
    mountEl.style.opacity = "0.6";

    // Geometría / material
    const geometry = new THREE.SphereGeometry(getRadius(w), 8, 8);
    const baseMat = new THREE.MeshBasicMaterial({
      color: "#162d57",
      transparent: true,
      opacity: 1,
    });

    const spheres = [];
    const qty = w < 600 ? 10 : 5;

    for (let i = 0; i < qty; i++) {
      const mat = baseMat.clone();
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * (w < 600 ? 10 : 5)
      );
      mesh.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * (w < 600 ? 0.2 : 0.017)
      );

      const maxScale = 1;
      const minScale = 0.4;
      const maxZ = 10;
      const distanceFromCamera = Math.abs(mesh.position.z);
      const scaleFactor = THREE.MathUtils.clamp(
        1 - distanceFromCamera / maxZ,
        minScale,
        maxScale
      );
      mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

      scene.add(mesh);
      spheres.push(mesh);
    }
    spheresRef.current = spheres;

    // Animación
    const animate = () => {
      spheres.forEach((sphere) => {
        const v = sphere.userData.velocity;
        sphere.position.add(v);

        const limit = 6;
        ["x", "y", "z"].forEach((axis) => {
          if (sphere.position[axis] > limit || sphere.position[axis] < -limit) {
            v[axis] *= -1;
            sphere.position[axis] = THREE.MathUtils.clamp(
              sphere.position[axis],
              -limit,
              limit
            );
          }
        });

        const distance = sphere.position.distanceTo(camera.position);
        const maxDistance = 5;
        const minDistance = 1;
        const deformationStrength = 2;

        let normalized = THREE.MathUtils.clamp(
          (distance - minDistance) / (maxDistance - minDistance),
          0,
          1
        );

        const deform = 1 + (1 - normalized) * deformationStrength;
        sphere.scale.set(deform, 1 / deform, deform);

        const fadeStart = 1;
        let opacity = 1.0;
        if (normalized < fadeStart) {
          const fadeProgress = normalized / fadeStart;
          opacity = Math.pow(fadeProgress, 3);
        }
        sphere.material.opacity = opacity;
      });

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Resize a tamaño de la SECCIÓN (no de la ventana)
    const onResize = () => {
      const size = getSize();
      w = size.w;
      h = size.h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      mountEl.style.filter = `blur(${getBlur(w)}px) brightness(1)`;
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    resizeObsRef.current = ro;

    // Cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();

      spheresRef.current.forEach((mesh) => {
        mesh.geometry?.dispose();
        mesh.material?.dispose();
        scene.remove(mesh);
      });
      renderer.dispose();
      mountEl.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute", // ⬅️ ocupa la sección
        inset: 0, // ⬅️ full width/height de la sección
        pointerEvents: "none",
        zIndex: -20, // ⬅️ detrás del contenido de la sección
        overflow: "hidden",
      }}
      className="h-screen"
    />
  );
};

export default AnimatedBackground;
