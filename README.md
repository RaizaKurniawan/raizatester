# Portfolio Website

This is a personal portfolio website built with React and [Vite](https://vite.dev), showcasing my professional journey, skills, and achievements. It includes sections for About, Experience, Tools, Projects, Contact, Certifications, and Achievements, a Performance Review popup for 2024, and a standalone page with my full work experience.

Live site: [raizatester.vercel.app](https://raizatester.vercel.app)

## Features

- **Responsive Design**: The website is fully responsive and works across different screen sizes, from mobile to desktop.
- **Interactive Sections**: Includes animated sections for About, Experience, Tools, Projects, Contact, Certifications, and Achievements using Framer Motion.
- **Full Experience Page**: `/experience` shows every QA role, QA project, and earlier IT role on one page as a timeline.
- **Performance Review Popup**: A modal popup in the Achievements section displays a slider with 15 Performance Review slides for 2024, complete with navigation, pagination, autoplay, and a downloadable PDF.
- **Lazy Loading**: Images in the Performance Review slider are lazy-loaded for better performance.
- **Accessibility**: The Performance Review modal supports closing via the `Esc` key and clicking outside the modal.
- **Downloadable Content**: Resume, CV, and Performance Review PDFs can be downloaded from the site.

## Tech Stack

- [React 18](https://react.dev)
- [Vite](https://vite.dev) for the dev server and production build
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Swiper](https://swiperjs.com) for the Performance Review slider
- [React Icons](https://react-icons.github.io/react-icons/)
- [jsPDF](https://github.com/parallax/jsPDF) for generating the CV PDF
- Deployed on [Vercel](https://vercel.com)

## Getting Started

Requires [Node.js](https://nodejs.org) 20.19+ or 22.12+ (needed by Vite 7).

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RaizaKurniawan/raizatester.git
   cd raizatester
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the dev server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The page updates instantly when you make changes.

## Available Scripts

| Command           | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `npm run dev`     | Starts the Vite dev server with hot module replacement.            |
| `npm run build`   | Builds the site for production into the `dist` folder.             |
| `npm run preview` | Serves the production build locally to check it before deploying. |

## Project Structure

```
├── index.html            # Main portfolio page (Vite entry)
├── experience.html       # Full experience page (Vite entry)
├── public/               # Static files served as-is (icons, PDFs, images)
├── src/
│   ├── main.jsx          # Mounts the portfolio app
│   ├── experience-main.jsx # Mounts the full experience page
│   ├── App.jsx           # Portfolio sections
│   ├── components/       # Header, Hero, Experience, Projects, etc.
│   ├── pages/            # Full experience page
│   └── index.css         # Global styles
├── vite.config.js        # Vite config with both pages as build inputs
└── vercel.json           # Clean URLs (/experience instead of /experience.html)
```

## Deployment

The site deploys to Vercel automatically on every push to `main`. Vercel detects Vite, runs `npm run build`, and serves the `dist` folder.
