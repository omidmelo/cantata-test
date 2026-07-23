# Cantata

Cantata is a single-stage, multi-head codec language model for full-length lyrics-to-song generation. Built on a Llama backbone, it jointly generates a song's vocal and accompaniment streams — predicting every stream and codebook in parallel at each decoding step — conditioned on song structure, a track description, and lyrics.

This repository is the central home for Cantata's public work: the paper, a demo of the trained model, and, soon, the training and inference code.

## Contents

- [`cantata-paper.pdf`](cantata-paper.pdf) — the paper describing the architecture and the 3B-parameter validation run.
- [`web/`](web/) — a Next.js site with a high-level overview of the model and demo samples from the 3B validation run.

## Coming soon

Training and inference code are not yet published here but are expected soon.

---

*Last updated 7/23/2026.*
