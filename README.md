# EventRadar

EventRadar is a campus event discovery hub for finding clubs, free food, workshops, arts, sports, and the moments that make campus feel like home.

## Features

- Search events by title, club, location, or category
- Filter by event type or club
- Save events and RSVP locally in the interface
- Add events to Google Calendar
- Responsive campus-focused landing page
- Dark mode, reduced-motion mode, and high-contrast mode
- Keyboard-friendly controls and accessible status updates

## Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm 12 or newer

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
pnpm dev      # Start the development server
pnpm build    # Create a production build
pnpm start    # Start the production server
```

## Project Structure

```text
app/
  globals.css   Global styles and responsive design tokens
  layout.tsx    Root layout and metadata
  page.tsx      EventRadar landing page and interactions
components/
  ui/           Shared UI components
lib/
  utils.ts      Shared utility functions
public/         Images and favicon assets
```

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- Vercel Analytics in production
