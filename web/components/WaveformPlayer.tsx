"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import WaveSurfer from "wavesurfer.js";

const CANTATA_ACCENT = "#4653ef";
const WAVE_NEUTRAL = "#e4e4e7";

type Props = {
  src: string;
  currentlyPlayingSrc: string | null;
  onPlayRequest: (src: string | null) => void;
};

function formatTime(sec: number) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function WaveformPlayer({
  src,
  currentlyPlayingSrc,
  onPlayRequest,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wsRef = useRef<WaveSurfer | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [curTime, setCurTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    wsRef.current?.destroy();

    const ws = WaveSurfer.create({
      container: containerRef.current,
      height: 88,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      cursorWidth: 2,
      cursorColor: CANTATA_ACCENT,
      waveColor: WAVE_NEUTRAL,
      progressColor: CANTATA_ACCENT,
      normalize: false,
    });

    wsRef.current = ws;

    ws.on("ready", () => {
      setIsReady(true);
      setDuration(ws.getDuration());
    });

    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("timeupdate", () => setCurTime(ws.getCurrentTime()));
    ws.on("finish", () => {
      setIsPlaying(false);
      setCurTime(ws.getDuration());
    });

    ws.load(src);

    return () => {
      ws.destroy();
    };
  }, [src]);

  const toggle = () => {
    if (!wsRef.current || !isReady) return;

    if (isPlaying) {
      wsRef.current.pause();
      if (currentlyPlayingSrc === src) {
        onPlayRequest(null);
      }
    } else {
      onPlayRequest(src);
      wsRef.current.play();
    }
  };

  useEffect(() => {
    const ws = wsRef.current;
    if (!ws) return;

    if (isPlaying && currentlyPlayingSrc !== src) {
      ws.pause();
    }
  }, [currentlyPlayingSrc, isPlaying, src]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          disabled={!isReady}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cantata-accent text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" fill="currentColor" />
          ) : (
            <Play className="h-5 w-5" fill="currentColor" />
          )}
        </button>

        <div className="min-w-[5rem] shrink-0 text-sm tabular-nums text-zinc-600 dark:text-zinc-400">
          {formatTime(curTime)} / {formatTime(duration)}
        </div>

        <div className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div ref={containerRef} />
        </div>
      </div>
    </div>
  );
}
