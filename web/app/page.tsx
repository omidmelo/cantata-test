"use client";

import { useState } from "react";
import AudioCard from "@/components/AudioCard";

const SECTION_SPACING = "mt-24";

export default function Home() {
  const [currentlyPlayingSrc, setCurrentlyPlayingSrc] = useState<string | null>(
    null
  );

  const vocalSamples = [
    {
      title: "Sample A: Music + Vocals",
      src: "/audio/vocal_01.wav",
      lyrics: [
        "Hey little girl, come on and dance with me.",
        "I'm a fire in the night. You're a candle in my darkness.",
      ],
    },
    {
      title: "Sample B: Music + Vocals",
      src: "/audio/vocal_02.wav",
      lyrics: [
        "City lights are calling my name",
        "Heart on fire, I'm in the game",
        "We're running wild, we're feeling alive",
        "Hands up high, we touch the sky",
      ],
    },
  ];

  const instrumentalSamples = [
    { title: "Instrumental 1", src: "/audio/instrumental-1.wav" },
    { title: "Instrumental 2", src: "/audio/instrumental-2.wav" },
    { title: "Instrumental 3", src: "/audio/instrumental-3.wav" },
    { title: "Instrumental 4", src: "/audio/instrumental-4.wav" },
  ];

  const charts = [
    { title: "Training Loss", src: "/charts/train_loss.png" },
    { title: "Evaluation Loss", src: "/charts/eval_loss.png" },
    { title: "Vocal Stream Loss", src: "/charts/vocal_loss.png" },
    {
      title: "Accompaniment Stream Loss",
      src: "/charts/accompaniment_loss.png",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:px-8">
        {/* Hero */}
        <header className="text-center">
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Cantata 3B Multi-Stem Music Transformer
          </h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Technical Validation Preview
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Below are results from a partial training run of Cantata’s 3B multi-stem music generation model. Materials include sample outputs, loss curves, and GPU utilization metrics. The current model and results serve as a technical validation of the underlying architecture rather than a production-ready system. They confirm architectural feasibility, stable multi-stem optimization, and readiness for continued scaling.
          </p>
        </header>

        {/* Quick nav */}
        <nav className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
          <a
            href="#architecture"
            className="text-cantata-accent hover:underline"
          >
            Architecture
          </a>
          <a href="#samples" className="text-cantata-accent hover:underline">
            Samples
          </a>
          <a href="#training" className="text-cantata-accent hover:underline">
            Training
          </a>
          <a href="#gpu" className="text-cantata-accent hover:underline">
            GPU
          </a>
          <a href="#direction" className="text-cantata-accent hover:underline">
            Direction
          </a>
          <a
            href="https://raw.githubusercontent.com/omidmelo/cantata-test/main/paper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cantata-accent font-semibold hover:underline"
          >
            Read the paper ↗
          </a>
        </nav>

        {/* Architecture */}
        <section id="architecture" className={SECTION_SPACING}>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Architecture
          </p>
          <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <img
              src="/figures/multistem-architecture.svg"
              alt="Segment-driven multi-stem transformer architecture"
              className="w-full max-w-full rounded-lg object-contain"
            />
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Segment-driven, multi-stem transformer architecture designed for
            scalable expansion beyond two streams.
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            The model uses a unified Llama backbone that supports parallel token
            streams aligned across time. In this validation run, two streams
            were trained jointly (vocals + accompaniment). The architecture is
            designed to scale to additional stems, e.g. instruments, vocal
            layers, or spatial streams, without duplicating the full parameter
            set. Full architecture and training details are available in the{" "}
            <a
              href="https://raw.githubusercontent.com/omidmelo/cantata-test/main/paper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cantata-accent hover:underline"
            >
              paper
            </a>
            .
          </p>
        </section>

        {/* Samples */}
        <section id="samples" className={SECTION_SPACING}>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Samples
          </p>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            The clips below are direct outputs from the validation run, including lyric-conditioned vocal samples as well as instrumental samples. They demonstrate structured multi-stem generation, as well as coherent lyric-music alignment and temporal stability.
          </p>

          <div className="mt-6 space-y-6">
            {vocalSamples.map((sample) => (
              <AudioCard
                key={sample.src}
                title={sample.title}
                src={sample.src}
                currentlyPlayingSrc={currentlyPlayingSrc}
                onPlayRequest={setCurrentlyPlayingSrc}
                lyrics={sample.lyrics}
              />
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {instrumentalSamples.map((sample) => (
              <AudioCard
                key={sample.src}
                title={sample.title}
                src={sample.src}
                currentlyPlayingSrc={currentlyPlayingSrc}
                onPlayRequest={setCurrentlyPlayingSrc}
              />
            ))}
          </div>
        </section>

        {/* Training Validation */}
        <section id="training" className={SECTION_SPACING}>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Training
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Training Validation
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            The curves below are from large-scale training of the 3B-parameter model. Training and evaluation losses decrease smoothly without instability. Vocal and accompaniment stream losses improve in parallel, confirming stable <strong>joint optimization</strong> across streams.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            These results validate the soundness of the multi-stream design and its suitability for further scaling and extended training.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {charts.map((c) => (
              <ChartCard key={c.src} title={c.title} src={c.src} />
            ))}
          </div>
        </section>

        {/* GPU Utilization */}
        <section id="gpu" className={SECTION_SPACING}>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Training infrastructure
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            GPU Utilization
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            During the 3B validation run, GPU utilization stayed close to 100%.
            To achieve this, we fully decoupled the data processing pipeline
            from training so that data preparation does not block the GPU. We
            also tuned the training pipeline for efficiency, which allows
            near-full utilization and makes large-scale runs highly efficient
            and scalable.
          </p>
          <div className="mt-6 max-w-2xl">
            <ChartCard title="GPU utilization" src="/charts/gpu_util.png" />
          </div>
        </section>

        {/* Architecture Direction */}
        <section id="direction" className={SECTION_SPACING}>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Direction
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Architecture Direction
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            The architecture is designed to support many more stems than the two
            used in this run (vocals + accompaniment). It can extend to
            additional instruments, multiple vocal layers, or spatial streams
            without a fundamental redesign.
          </p>
        </section>
      </main>
    </div>
  );
}

function ChartCard({ title, src }: { title: string; src: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        {title}
      </div>
      <img src={src} alt={title} className="w-full rounded-lg" />
    </div>
  );
}
