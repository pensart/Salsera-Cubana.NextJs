# Salsera Cubana

Website for Salsera Cubana, built with Next.js (App Router), TypeScript and Tailwind CSS 4.

## Commands

| Command         | Action                                       |
| :-------------- | :------------------------------------------- |
| `npm install`   | Install dependencies                         |
| `npm run dev`   | Start the dev server at `localhost:3000`     |
| `npm run build` | Build the production site                    |
| `npm run start` | Serve the production build                   |
| `npm run lint`  | Run ESLint                                   |

## Project structure

```text
public/              Static files, including the hero slides
src/
  app/               Routes, root layout, global CSS and sitemap
  assets/images/     Images optimized through next/image
  components/        Shared and page-section components
  lib/events.ts      Upcoming events from Sanity
  lib/metadata.ts    Page title, description and social tags
  lib/sanity.ts      Sanity client
```

## Content

Lesson dates and events are managed in Sanity, in the separate `Salsera-Cubana.Sanity-main` folder. Copy `.env.example` to `.env.local` and fill in the project ID before running the site, and add the same values to your host. Published changes appear on the site within a few minutes.

## Icons

Icons come from [react-icons](https://react-icons.github.io/react-icons/):

```tsx
import { FaCalendarCheck } from "react-icons/fa6";

<FaCalendarCheck className="text-primary" />;
```
