"use client";

import {
  ChibiScene,
  type ChibiSceneApi,
  type RuntimeEvent,
  type ScenePointerEvent,
} from "@chibi3d/runtime";
import { type CSSProperties, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { expertise } from "#velite";
import { useTheme } from "@/hooks/useTheme";
import { createKeyInput, isTypingTarget } from "./input";
import {
  createKeyboardScene,
  type KeyboardKey,
  type KeyboardSkill,
  resolveKeyboardAsset,
} from "./scene";
import { useAdaptiveGraphics } from "./use-adaptive-graphics";
import { useKeyboardSounds } from "./use-keyboard-sounds";

const SceneCanvas = memo(ChibiScene);
const CANVAS_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

const SKILL_PALETTE: Record<string, string> = {
  Python: "#2f74c0",
  TypeScript: "#008fd5",
  JavaScript: "#ff9408",
  "C#": "#68217a",
  "C/C++": "#00599c",
  Java: "#d9383a",
  React: "#00cce8",
  "Next.js": "#333537",
  Vue: "#00b880",
  "Tailwind CSS": "#00bfd8",
  FastAPI: "#059669",
  "ASP.NET Core": "#512bd4",
  Express: "#343638",
  "REST APIs & SQLAlchemy": "#0ea5e9",
  "Computer Vision": "#10b981",
  "Machine Learning & Deep Learning": "#6366f1",
  "LLM & Agentic AI": "#7c3aed",
  "RAG & LangGraph": "#0891b2",
  "NLP & Embeddings": "#db2777",
  "PostgreSQL & pgvector": "#146888",
  "SQL Server": "#cc2927",
  Docker: "#009fe8",
  "GitHub Actions": "#2088ff",
  "Linux / VPS": "#333537",
  DigitalOcean: "#0080ff",
  Cloudflare: "#f38020",
  "Git & GitHub": "#ff4622",
  "uv & Swagger/OpenAPI": "#65b741",
};

const KEYBOARD_LOGOS: Record<string, string> = {
  Python: "/assets/keyboard/logos/python.svg",
  TypeScript: "/assets/keyboard/logos/ts.svg",
  JavaScript: "/assets/keyboard/logos/js.svg",
  "C#": "/assets/keyboard/logos/csharp.svg",
  "C/C++": "/assets/keyboard/logos/cpp.svg",
  Java: "/assets/keyboard/logos/java.svg",
  React: "/assets/keyboard/logos/react.svg",
  "Next.js": "/assets/keyboard/logos/nextjs.svg",
  Vue: "/assets/keyboard/logos/vue.svg",
  "Tailwind CSS": "/assets/keyboard/logos/tailwind.svg",
  FastAPI: "/assets/keyboard/logos/fastapi.svg",
  "ASP.NET Core": "/assets/keyboard/logos/dotnet.svg",
  Express: "/assets/keyboard/logos/express.svg",
  "REST APIs & SQLAlchemy": "/assets/keyboard/logos/restapi.svg",
  "Computer Vision": "/assets/keyboard/logos/cv.svg",
  "Machine Learning & Deep Learning": "/assets/keyboard/logos/aiml.svg",
  "LLM & Agentic AI": "/assets/keyboard/logos/llm.svg",
  "RAG & LangGraph": "/assets/keyboard/logos/rag.svg",
  "NLP & Embeddings": "/assets/keyboard/logos/nlp.svg",
  "PostgreSQL & pgvector": "/assets/keyboard/logos/postgres.svg",
  "SQL Server": "/assets/keyboard/logos/sqlserver.svg",
  Docker: "/assets/keyboard/logos/docker.svg",
  "GitHub Actions": "/assets/keyboard/logos/githubactions.svg",
  "Linux / VPS": "/assets/keyboard/logos/linux.svg",
  DigitalOcean: "/assets/keyboard/logos/digitalocean.svg",
  Cloudflare: "/assets/keyboard/logos/cloudflare.svg",
  "Git & GitHub": "/assets/keyboard/logos/git.svg",
  "uv & Swagger/OpenAPI": "/assets/keyboard/logos/uv.svg",
};

const DARK_THEMES = new Set(["dark", "cyberpunk", "horizon"]);

export function KeyboardSectionScene({ onSceneFailed }: { onSceneFailed: () => void }) {
  const { theme } = useTheme();
  const isDarkTheme = DARK_THEMES.has(theme.name);
  const labelColor = isDarkTheme ? "#f8fafc" : "#0f172a";

  const containerRef = useRef<HTMLDivElement | null>(null);
  const api = useRef<ChibiSceneApi>(null);
  const failed = useRef(false);
  const [loadVersion, setLoadVersion] = useState(0);
  const ready = loadVersion > 0;
  const [selected, setSelected] = useState<KeyboardSkill | null>(null);

  const playSound = useKeyboardSounds();

  const keyboardSkills = useMemo<KeyboardSkill[]>(() => {
    const flat = expertise.categories.flatMap((cat) => cat.skills);
    return flat.map((s) => ({
      name: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      label: s.name,
      shortDescription: s.keyCompetencies.slice(0, 2).join(" · "),
      color: SKILL_PALETTE[s.name] ?? "#3b82f6",
      icon: KEYBOARD_LOGOS[s.name] ?? s.iconPath,
    }));
  }, []);

  const columns = keyboardSkills.length === 28 ? 7 : 6;
  const scene = useMemo(
    () => createKeyboardScene(keyboardSkills, { columns, labelColor }),
    [keyboardSkills, columns, labelColor]
  );

  const { settings: graphics, markActive } = useAdaptiveGraphics(ready);
  const { shadows, softShadows, ao, bloom, lighting } = graphics;
  const environment = useMemo(
    () => ({
      ...scene.document.environment,
      shadows,
      softShadows,
      ao,
      bloom,
      contactShadows: false,
      vignette: false,
      preset: lighting ? scene.document.environment.preset : null,
    }),
    [scene, shadows, softShadows, ao, bloom, lighting]
  );
  const dpr = useMemo<[number, number]>(() => [0.75, Math.min(graphics.dpr, 1.5)], [graphics.dpr]);

  const visibleLabel = useRef<string | null>(null);
  const heldKeys = useRef<KeyboardKey[]>([]);
  const input = useMemo(() => createKeyInput(scene.keys, scene.columns), [scene]);

  // Keep keyboard framed responsively inside the Tech Stack section container (+20% larger scale)
  useEffect(() => {
    if (!ready || !api.current || !containerRef.current) return;
    const el = containerRef.current;
    const updatePose = () => {
      const sceneApi = api.current;
      if (!sceneApi) return;
      const rect = el.getBoundingClientRect();
      const aspect = rect.width / Math.max(rect.height, 1);
      const scale = Math.max(0.66, Math.min(1.224, aspect * 0.744));
      sceneApi.setNodeVisible(scene.boardId, true);
      sceneApi.setNodeVisible(scene.labelsId, true);
      sceneApi.setNodeTransform(scene.boardId, {
        position: [0, 0.42, 0],
        rotation: [0.119863065, 0.007200782, 0.119863065],
        scale: [scale, scale, scale],
      });
      markActive();
    };

    updatePose();
    const observer = new ResizeObserver(updatePose);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ready, scene, markActive]);

  // Restore visible 3D label after runtime remount
  useEffect(() => {
    if (!ready) return;
    const active = visibleLabel.current ?? scene.defaultLabelId;
    for (const id of [scene.defaultLabelId, ...scene.keys.map((key) => key.labelId)]) {
      api.current?.setNodeVisible(id, id === active);
    }
  }, [ready, scene]);

  // Key press -> depress animation, emissive glow, 3D label, sound
  useEffect(
    () =>
      input.subscribe((key, pressed) => {
        markActive();
        api.current?.transitionNodeTo(key.nodeId, pressed ? key.pressedStateId : "base", {
          duration: 0.1,
          ease: "easeInOut",
        });
        api.current?.setMaterial(key.materialId, {
          emissive: scene.document.materials[key.materialId].color,
          emissiveIntensity: pressed ? 0.7 : 0,
        });
        heldKeys.current = heldKeys.current.filter((held) => held !== key);
        if (pressed) {
          heldKeys.current.push(key);
        }
        const shown = heldKeys.current.at(-1) ?? null;
        const labelId = shown?.labelId ?? scene.defaultLabelId;
        if (labelId !== (visibleLabel.current ?? scene.defaultLabelId)) {
          api.current?.setNodeVisible(visibleLabel.current ?? scene.defaultLabelId, false);
          api.current?.setNodeVisible(labelId, true);
        }
        visibleLabel.current = shown?.labelId ?? null;
        setSelected(shown?.skill ?? null);
        playSound(pressed);
      }),
    [input, scene, playSound, markActive]
  );

  const onPointerEvent = useCallback(
    (event: ScenePointerEvent) => {
      const pointer = `pointer:${event.pointerId}`;
      switch (event.type) {
        case "hoverEnter":
          if (event.pointerType === "mouse") input.press("hover", event.nodeId);
          break;
        case "hoverExit":
          input.release("hover", event.nodeId);
          break;
        case "pointerDown":
          input.press(pointer, event.nodeId);
          break;
        case "pointerUp":
        case "pointerCancel":
          input.release(pointer);
          break;
      }
    },
    [input]
  );

  const onLoad = useCallback(() => {
    if (failed.current) return;
    setLoadVersion((version) => version + 1);
  }, []);

  const onError = useCallback(
    (error: Error) => {
      failed.current = true;
      console.warn("3D keyboard scene unavailable, falling back to grid", error);
      onSceneFailed();
    },
    [onSceneFailed]
  );

  const onEvent = useCallback(
    (event: RuntimeEvent) => {
      if (event.type === "contextLost") onError(new Error("WebGL context lost"));
    },
    [onError]
  );

  // Physical keyboard listener (1:1 with 3d-portfolio)
  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        isTypingTarget(event.target)
      ) {
        return;
      }
      const key = input.shortcuts.get(event.code);
      if (key) input.press(`key:${event.code}`, key.nodeId);
    };
    const up = (event: KeyboardEvent) => input.release(`key:${event.code}`);
    const release = () => input.releaseAll();
    const visibility = () => {
      if (document.hidden) release();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", visibility);
      release();
    };
  }, [input]);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative h-[520px] w-full max-w-6xl sm:h-[620px] md:h-[720px]"
      >
        <SceneCanvas
          key={isDarkTheme ? "dark" : "light"}
          document={scene.document}
          environment={environment}
          resolveAsset={resolveKeyboardAsset}
          api={api}
          style={CANVAS_STYLE}
          dpr={dpr}
          transparent
          orbit={false}
          orthographic
          pointerTargets={scene.pointerTargets}
          onPointerEvent={onPointerEvent}
          onLoad={onLoad}
          onError={onError}
          onEvent={onEvent}
        />
        {!ready && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="animate-pulse text-muted-foreground text-sm">Loading 3D keyboard...</p>
          </div>
        )}
      </div>

      <div
        aria-live="polite"
        className="sr-only"
      >
        <p>{selected?.label ?? "Explore my skills"}</p>
        <p>{selected?.shortDescription ?? "Hover, tap, or press a key"}</p>
      </div>
    </div>
  );
}
