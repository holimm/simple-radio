# SimpleRadio 🎶

SimpleRadio is a focus-friendly music player that plays lo-fi, chillhop, and study streams from YouTube. A looping video fills the home screen. The player keeps the current stream full-bleed behind the controls, so the page stays usable while you study, work, or leave it on in the background.

## How it works

The app has two pages.

**Home** (`/`) plays a local looping video with a quiet rain bed underneath. The headphone icon toggles that audio. **Start listening** fades into the player.

**Player** (`/MusicStreamer`) loads the selected YouTube video through [react-player](https://github.com/cookpete/react-player) and hides the YouTube controls. The stream is the background. A station list, transport controls, and ambience sliders sit on top of it.

Playback starts muted. Browsers block autoplay with sound, so unmute from the home headphone icon or the player volume control before you expect to hear anything.

## Features

- **YouTube channels** in the player, with previous and next wrapping around the list.
- **Playback controls**: play, pause, mute, and volume. Changing the volume to zero mutes the stream.
- **Rain and waves**, mixed in as separate looping YouTube videos. Each slider is independent of the station volume. Setting a slider above zero starts that layer.
- **Brightness overlay** that darkens the video without changing the audio.
- **Paused state** with a particle field on large screens. Particles stay off when the stream is playing, when the viewport is small, when the user prefers reduced motion, or on a constrained device or connection.
- **Page transitions** between home and the player, animated with GSAP. Reduced-motion preferences skip the animation and jump straight to the next page.
- **Outbound links** for the current station on YouTube and for this repository on GitHub.

Older routes still land in the right place: `/SimpleRadio` redirects to `/`, and `/SimpleRadio/MusicStreamer` redirects to `/MusicStreamer`.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [GSAP](https://gsap.com/) for entrances, channel changes, and page transitions
- [react-player](https://github.com/cookpete/react-player) for the station and the rain and waves layers
- [tsParticles](https://particles.js.org/) for the paused particle field

## Project layout

```text
app/                  routes and global styles
  page.tsx            home
  MusicStreamer/      player route
components/features/  home screen, player, video, and ambience
components/ui/        buttons, sliders, particles
RadioList.json        station catalog
public/video/         home background
public/image/         icons
```

## Development

Install dependencies, then start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

YouTube playback needs a network connection. Embedded players can fail in browsers that block third-party cookies or YouTube itself.
