/* Shared helpers for the Quest room (receiver) and share.html (sender). */
(function (root) {
  const PREFIX = 'evan-room-';
  const ALPHABET = '23456789ABCDEFGHJKMNPQRTUVWXY';
  const PEERJS_SRC = 'https://cdn.jsdelivr.net/npm/peerjs@1.5.5/dist/peerjs.min.js';
  const ICE = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  function makeCode(len) {
    const n = len || 5;
    let out = '';
    const buf = new Uint8Array(n);
    if (root.crypto && root.crypto.getRandomValues) root.crypto.getRandomValues(buf);
    else for (let i = 0; i < n; i++) buf[i] = Math.floor(Math.random() * 256);
    for (let i = 0; i < n; i++) out += ALPHABET[buf[i] % ALPHABET.length];
    return out;
  }

  function parseCode(raw) {
    if (!raw) return null;
    let s = String(raw).trim().toUpperCase();
    if (s.indexOf(PREFIX.toUpperCase()) === 0) s = s.slice(PREFIX.length);
    s = s.replace(/[^A-Z0-9]/g, '');
    if (s.length < 4 || s.length > 8) return null;
    return { code: s, peerId: PREFIX + s };
  }

  function queryCode() {
    try {
      const q = new URLSearchParams(root.location.search);
      return parseCode(q.get('code') || q.get('peer') || '');
    } catch (e) {
      return null;
    }
  }

  function loadPeerJs() {
    if (loadPeerJs._p) return loadPeerJs._p;
    loadPeerJs._p = new Promise(function (resolve, reject) {
      if (root.Peer) return resolve(root.Peer);
      const s = document.createElement('script');
      s.src = PEERJS_SRC;
      s.async = true;
      s.onload = function () {
        if (root.Peer) resolve(root.Peer);
        else reject(new Error('PeerJS loaded but window.Peer is missing'));
      };
      s.onerror = function () {
        loadPeerJs._p = null;
        reject(new Error('Could not load PeerJS'));
      };
      document.head.appendChild(s);
    });
    return loadPeerJs._p;
  }

  function peerOptions() {
    return { config: ICE, debug: 0 };
  }

  function makeTestPatternStream() {
    const c = document.createElement('canvas');
    c.width = 1280;
    c.height = 720;
    const ctx = c.getContext('2d');
    const colors = ['#e0373e', '#f0c000', '#3cc85a', '#2a9df4', '#7b4dff', '#f27a2a'];
    let frames = 0;
    function draw() {
      frames += 1;
      ctx.fillStyle = '#10131b';
      ctx.fillRect(0, 0, 1280, 720);
      const barW = 1280 / colors.length;
      for (let i = 0; i < colors.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(i * barW, 0, barW, 280);
      }
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 280, 1280, 16);
      ctx.fillStyle = '#0b0d14';
      ctx.fillRect(80, 330, 1120, 310);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 96px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MIRROR TEST', 640, 430);
      ctx.font = '36px system-ui, sans-serif';
      ctx.fillStyle = '#c5d0e8';
      ctx.fillText('Laptop to Quest panel', 640, 510);
      ctx.font = 'bold 48px ui-monospace, monospace';
      ctx.fillStyle = '#7dffb0';
      ctx.fillText('frame ' + frames, 640, 580);
      // Moving tick so we can tell the stream is live.
      ctx.fillStyle = '#7dffb0';
      ctx.fillRect(80 + ((frames * 8) % 1120), 650, 40, 18);
    }
    draw();
    const timer = setInterval(draw, 50);
    const stream = c.captureStream(20);
    stream.__stopPattern = function () { clearInterval(timer); };
    return stream;
  }

  root.EVAN_MIRROR = {
    PREFIX: PREFIX,
    makeCode: makeCode,
    parseCode: parseCode,
    queryCode: queryCode,
    loadPeerJs: loadPeerJs,
    peerOptions: peerOptions,
    makeTestPatternStream: makeTestPatternStream
  };
})(window);
