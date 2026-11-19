# Quest WebXR video gallery (starter)

A small A-Frame space you can open in the Meta Quest 3 Browser, then later hang Jellyfin streams on the screens.

The current `index.html` is an open night-time gallery in the style of the official [A-Frame Video](https://aframe.io/aframe/examples/test/video/) example: two large flat 16:9 planes, a simple floor and windowed pavilion, and an animated night sky. The previous cozy living-room version is saved as `index-livingroom.html`. Placeholder videos are Big Buck Bunny and Fireworks (from A-Frame's CORS-enabled CDN).

## What's in the room

- One-file scene: `index.html`, CDN-loaded **A-Frame 1.8.0**, plus `aframe-extras` 7.7.0 and `aframe-blink-controls` 0.4.3.
- Open pavilion with a dark floor, thin window frames, and a clear view of the sky. No bulky furniture, so the screens stay the focus.
- Two large flat video screens (`<a-video>`, unlit/flat like the official example), slightly angled toward you. Labels sit on plaques *below* each bezel, not on the picture. Each screen is a future Jellyfin slot; click or use the laser to play or pause them separately.
- Animated night sky (kept cheap for Quest 3, no post-processing): a dark star field, aurora ribbons that drift and shift through teal, violet, magenta, pink, blue and gold, and a Milky Way band that fades in at a random orientation, lingers, then fades out (about every 30–90 seconds). Add `?demo=1` to the URL to force the aurora and Milky Way on so you can preview them through the windows.
- Desktop: drag to look, WASD to walk, **Enter VR** button.
- Quest: **Enter VR**, left-thumbstick forward to teleport (and snap-turn), right-hand laser + trigger to play or pause a screen. A-Frame also shows its own VR button in the corner.

`starter-v2.png` is a desktop preview of this gallery with `?demo=1`. `starter.png` is the earlier living-room preview.

## Try it on a computer first

Any static file server in this folder works, for example:

```bash
cd /workspace/quest/webxr-room
python3 -m http.server 8080
```

Then open `http://localhost:8080` in Chrome. Desktop preview does not need HTTPS. WebXR *on the headset* does.

## Open it on the Quest 3

WebXR in the Quest Browser only starts on an **HTTPS** page (plain `http://` from your PC's IP will not get an Enter VR session). Host this folder as static files — do not put a login in front of it — then open the HTTPS URL in the Quest Browser and tap **Enter VR**.

Realistic no-account or free-tier options:

- **Netlify Drop** — open [https://app.netlify.com/drop](https://app.netlify.com/drop), drag this folder, get an `https://…netlify.app` URL. Fastest one-shot preview.
- **GitHub Pages** — put `index.html` in a repo (or `/docs`) and enable Pages. Good for a URL that stays up.
- **Vercel** or **Cloudflare Pages** — same idea: upload or git-push the folder as a static site.

This starter is not published from here on purpose. After you host it, bookmark the HTTPS URL in the Quest Browser.

You can also test on a PC with Quest Link / Air Link if you already use that, but the path above is the one that works on the headset by itself.

## Later: putting Jellyfin on the wall screen

Swap the `src` on `<video id="videoMain">` and/or `<video id="videoSecond">` for a Jellyfin media URL. That is not a drop-in change. Honest caveats:

- **HTTPS / mixed content.** The Quest page is HTTPS, so the video URL must also be HTTPS. A `http://192.168.x.x:8096` Jellyfin link will be blocked.
- **CORS.** The browser will only texture a cross-origin stream if Jellyfin (or a proxy in front of it) sends `Access-Control-Allow-Origin` for your room's origin. Default Jellyfin often does not.
- **Auth.** Direct stream URLs usually need an API key or a signed token in the query string, and that token should not be baked into a public GitHub Pages site.
- **Same network vs remote.** On your home Wi-Fi, a local HTTPS reverse proxy to Jellyfin is the straightforward path. Off-network access needs your existing remote setup (HTTPS domain, VPN, or Jellyfin's remote access) plus the same CORS rules.
- **Format.** Prefer a progressive MP4/H.264 URL the Quest Browser can decode. HLS can work but needs a player/loader, not a bare `<a-video>` tag.

None of that is set up in this starter. The screen is wired so you can change the `src` once those pieces exist.

## Controls recap

| Where | Look | Move | Screen |
| --- | --- | --- | --- |
| Desktop | mouse drag | WASD | click a screen |
| Quest 3 | head tracking | left thumbstick forward = teleport | right laser + trigger on that screen |

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
