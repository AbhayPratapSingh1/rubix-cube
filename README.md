# Rubik's Cube 3D

> An interactive 3D Rubik's cube built entirely from scratch — no WebGL, no 3D libraries, just pure JavaScript and math.

[![Live Demo](https://img.shields.io/badge/demo-LIVE-brightgreen?style=for-the-badge)](https://rubix-cube.onrender.com)

---

## ✨ Demo

**👉 [Try it live →](https://rubix-cube.onrender.com)**

Drag to rotate the cube. Press keys to twist layers. Watch it animate in real-time.

---

## 🎯 Features

- **Rotate the cube freely** — drag with your mouse to view from any angle
- **Twist any face** — U, D, L, R, F, B keys (hold Shift for counter-clockwise)
- **Smooth animations** — every twist plays out in a fluid 90° rotation
- **Multiple camera views** — the main view plus two auxiliary angles shown side-by-side
- **Auto-snap** — release the mouse and the cube gently snaps to the nearest upright angle
- **Subtle breathing camera** — a gentle sinusoidal motion brings the cube to life
- **Classic color scheme** — Blue, Red, White, Green, Orange, Yellow with black stroke outlines

---

## 🎮 Controls

| Input | Action |
|---|---|
| **Drag** | Orbit the cube |
| **U / ⇧+U** | Top layer ↻ / ↺ |
| **D / ⇧+D** | Bottom layer ↻ / ↺ |
| **L / ⇧+L** | Left layer ↻ / ↺ |
| **R / ⇧+R** | Right layer ↻ / ↺ |
| **F / ⇧+F** | Front layer ↻ / ↺ |
| **B / ⇧+B** | Back layer ↻ / ↺ |

---

## 🧠 How It Works

This cube is rendered using a **custom 3D engine** built on top of p5.js's 2D canvas. Every cubie, every face, and every rotation is computed from scratch using:

- Perspective projection (3D → 2D math)
- Painter's algorithm (z-sorting for correct layering)
- Back-face culling (hides invisible faces)
- Near-plane clipping (prevents visual artifacts)
- Rotation matrices for smooth per-layer animation

No WebGL. No Three.js. No external 3D libraries.

---

## 🛠️ Tech Stack

<p>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/p5.js-ED225D?style=flat-square&logo=p5.js&logoColor=white" alt="p5.js">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
</p>

---

## 🚀 Run Locally

Simply open `index.html` in any modern browser. No build step, no dependencies, no installation required.

```bash
open index.html
```

Or serve it with any static file server:

```bash
python3 -m http.server 8000
```

---

## 📸 Screenshots

<!-- Add screenshots here -->

```
[Screenshot_1.png]   [Screenshot_2.png]   [Screenshot_3.png]
```

