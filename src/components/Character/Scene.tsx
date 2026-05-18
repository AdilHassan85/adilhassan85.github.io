import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";
import setAnimations from "./utils/animationUtils";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import {
  handleHeadRotation,
  handleMouseMove,
  handleTouchEnd,
  handleTouchMove,
} from "./utils/mouseUtils";
import handleResize from "./utils/resizeUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  // State declaration for global character context
  const [, setGlobalChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;

      // Target element wrapper
      const currentCanvasDiv = canvasDiv.current;
      currentCanvasDiv.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      // Explicitly mock or call setLighting safely
      const light = (setLighting as any)(scene, renderer);

      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let activeCharacter: THREE.Object3D | null = null;
      let isLoadedDone = false; // Flag to check if loading finished safely

      // ✅ INSTANT BYPASS GUARD: 2 seconds max loading time before absolute force unlock
      const fallbackTimeout = setTimeout(() => {
        if (!isLoadedDone) {
          console.warn("⏳ Loading taking too long. Activating force-unlock fallback...");
          isLoadedDone = true;
          setLoading(100); // Directly open the portfolio website interface
        }
      }, 2000);

      // Shared Named Function for Resize Handler
      const onWindowResize = () => {
        if (currentCanvasDiv) {
          handleResize(renderer, camera, { current: currentCanvasDiv }, activeCharacter || new THREE.Object3D());
        }
      };

      loadCharacter().then((gltf) => {
        if (isLoadedDone) return;

        // ✅ FIX: If character doesn't load, bypass progress animations and trigger instant unlock
        if (!gltf) {
          isLoadedDone = true;
          clearTimeout(fallbackTimeout);
          console.warn("⚠️ Character 3D asset bypassed. Loading portfolio interface instead.");
          setLoading(100);
          return;
        }

        const animations = setAnimations(gltf);
        hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
        mixer = animations.mixer;
        const characterMesh = gltf.scene;
        activeCharacter = characterMesh;
        setGlobalChar(characterMesh);
        scene.add(characterMesh);
        headBone = characterMesh.getObjectByName("spine006") || null;

        isLoadedDone = true;
        clearTimeout(fallbackTimeout);
        setLoading(100); // ✅ Added explicit instant unlock right after successful asset injection

        // Standard load handler if file exists
        progress.loaded().then(() => {
          setLoading(100);
          setTimeout(() => {
            if (animations && typeof animations.startIntro === "function") {
              animations.startIntro();
            }
          }, 1500);
        }).catch(() => {
          setLoading(100); // Safe catch fallback
        });

        window.addEventListener("resize", onWindowResize);
      }).catch((err) => {
        console.error("Catch handler triggered: ", err);
        if (!isLoadedDone) {
          isLoadedDone = true;
          clearTimeout(fallbackTimeout);
          setLoading(100);
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      const animate = () => {
        requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
        }
        if (light && typeof light.setPointLight === "function" && activeCharacter) {
          const screenLight = activeCharacter.getObjectByName("screenlight");
          if (screenLight) light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        clearTimeout(debounce);
        clearTimeout(fallbackTimeout);
        scene.clear();
        renderer.dispose();

        if (currentCanvasDiv && renderer.domElement) {
          if (currentCanvasDiv.contains(renderer.domElement)) {
            currentCanvasDiv.removeChild(renderer.domElement);
          }
        }

        window.removeEventListener("resize", onWindowResize);
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, [setLoading]);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;