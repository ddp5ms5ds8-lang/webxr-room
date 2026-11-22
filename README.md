# Quest WebXR video gallery

A small A-Frame space you can open in the Meta Quest 3 Browser, then later hang Jellyfin streams on the screens. The live build is at [https://ddp5ms5ds8-lang.github.io/webxr-room/](https://ddp5ms5ds8-lang.github.io/webxr-room/).

The current `index.html` is a dark rock cliff in a pitch-black starfield. You stand at a glass desk near the edge, with two overhead screens on a monitor arm and a laptop you can grab and move. The previous animated aurora / Milky Way pavilion is saved as `index-aurora.html`. The earlier cozy living-room version is `index-livingroom.html`. Placeholder videos are Big Buck Bunny and Fireworks (from A-Frame's CORS-enabled CDN).

## What's in the room

- One-file scene: `index.html`, CDN-loaded **A-Frame 1.8.0**, plus `aframe-extras` 7.7.0 and `aframe-blink-controls` 0.4.3.
- A low-poly dark rock plateau with a jagged front edge. Beyond the drop is an outer-space void: stars in every direction (including below), a denser star field ahead of the cliff, and a faint nebula glow. A low rock lip marks the edge, and teleport is limited to the plateau so you cannot step off.
- A tidy frosted-glass desk with slim legs, right at the cliff edge. Labels on the front edge of the desk read `MAIN · Jellyfin later` and `SCREEN 2 · Jellyfin later`.
- Two 16:9 video screens mounted on a slim dual-monitor arm above the desk, at about eye level and angled slightly inward. Click or use the right-hand laser + trigger to play or pause each one. These are the future Jellyfin slots.
- A slim laptop on the desk (placeholder: "Laptop screen, mirroring coming soon"). This is the future target for laptop screen mirroring.
- A small campfire about 9 m to the right of the desk, still on the plateau and away from the edge: a ring of stones, a couple of logs, a seat log, small flickering flames, and a short-range warm light. You can teleport to it.
- Built to stay light on Quest 3: a static point star field (no aurora or Milky Way shaders), no large textures, no particle systems, `antialias` off, and video `preload="metadata"`.

## Grabbing the laptop

On the Quest, point either hand's laser at the laptop and squeeze the **grip** button (the side squeeze, not the trigger). Move and rotate it freely; let go of the grip to leave it floating wherever you placed it. The pose is saved in `localStorage`, so it stays put if you reload the page. The trigger is still only for play/pause on the two video screens.

## Controls recap

| Where | Look | Move | Screens | Laptop |
| --- | --- | --- | --- | --- |
| Desktop | mouse drag | WASD (stays on the cliff) | click a screen | — |
| Quest 3 | head tracking | left thumbstick forward = teleport (desk or fire, not off the edge) | right laser + trigger | laser + **grip** to grab, release to drop |

## Try it on a computer first

Any static file server in this folder works, for example:

```bash
cd /workspace/quest/webxr-room
python3 -m http.server 8080
```

Then open `http://localhost:8080` in Chrome. Desktop preview does not need HTTPS. WebXR *on the headset* does.

## Open it on the Quest 3

WebXR in the Quest Browser only starts on an **HTTPS** page. This folder is already published on GitHub Pages:

**[https://ddp5ms5ds8-lang.github.io/webxr-room/](https://ddp5ms5ds8-lang.github.io/webxr-room/)**

Open that URL in the Meta Quest Browser, tap **Enter VR**, and allow it if the headset asks. Bookmark the page so you do not have to type it again.

You can also test on a PC with Quest Link / Air Link if you already use that, but the path above is the one that works on the headset by itself.

## Later: putting Jellyfin on the wall screens

Swap the `src` on `<video id="videoMain">` and/or `<video id="videoSecond">` for a Jellyfin media URL. That is not a drop-in change. Honest caveats:

- **HTTPS / mixed content.** The Quest page is HTTPS, so the video URL must also be HTTPS. A `http://192.168.x.x:8096` Jellyfin link will be blocked.
- **CORS.** The browser will only texture a cross-origin stream if Jellyfin (or a proxy in front of it) sends `Access-Control-Allow-Origin` for your room's origin. Default Jellyfin often does not.
- **Auth.** Direct stream URLs usually need an API key or a signed token in the query string, and that token should not be baked into a public GitHub Pages site.
- **Same network vs remote.** On your home Wi-Fi, a local HTTPS reverse proxy to Jellyfin is the straightforward path. Off-network access needs your existing remote setup (HTTPS domain, VPN, or Jellyfin's remote access) plus the same CORS rules.
- **Format.** Prefer a progressive MP4/H.264 URL the Quest Browser can decode. HLS can work but needs a player/loader, not a bare `<a-video>` tag.

None of that is set up in this starter. The screens are wired so you can change the `src` once those pieces exist.

Laptop mirroring into the grabbable panel is a separate step. It is not built in yet.

## Examples to open on the Quest 3 Browser

These official demos were checked live (HTTP 200) on 19 Nov 2026. Open the HTTPS link in the Quest Browser, then use each page's VR button.

- [Immersive Web Stereo Video Player](https://immersive-web.github.io/webxr-samples/stereo-video.html) — a home-theater room with an in-room screen; the closest official match to this project (vanilla WebXR).
- [A-Frame Video](https://aframe.io/aframe/examples/test/video/) — two large flat video planes (Big Buck Bunny and fireworks). Same `<a-video>` idea as this starter.
- [A-Frame 360° Video](https://aframe.io/aframe/examples/boilerplate/360-video/) — a videosphere; click or tap to start the 360 video.
- [A-Frame Curved Images](https://aframe.io/aframe/examples/showcase/curved-mockups/) — curved image/UI panels around you, useful if you want a curved cinema screen.
- [three.js VR teleport](https://threejs.org/examples/webxr_vr_teleport.html) — a simple room you can teleport around with the controllers.
- [three.js VR layers](https://threejs.org/examples/webxr_vr_layers.html) — WebXR Layers for sharper text and video (best viewed in the headset).
- [three.js VR sandbox](https://threejs.org/examples/webxr_vr_sandbox.html) — a polished WebXR space with a large panel, controllers, and a GUI.
- [Babylon.js VideoDome playground](https://playground.babylonjs.com/#1E9JQ8#8) — 360 video in a VideoDome, with Babylon's default XR / teleport helper.

Desktop previews of several of these are in `examples/`. Mozilla Hubs is shut down, so it is not on this list.
