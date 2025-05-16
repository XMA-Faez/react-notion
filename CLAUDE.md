# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js project bootstrapped with `create-next-app`. It appears to be a React-based dashboard for a marketing agency named XMA, designed to look similar to a Notion interface. The project uses:

- Next.js 15.3.2 with the App Router
- React 19.0.0
- TypeScript
- Tailwind CSS 4
- ESLint

## Common Commands

### Development

```bash
# Start the development server with turbopack
npm run dev

# Build the application for production
npm run build

# Start the production server
npm run start

# Run ESLint
npm run lint
```

## Project Structure

The project follows the Next.js App Router structure:

- `app/`: Contains the application components and routes
  - `page.tsx`: Main component with the XMA Notion-like workspace
  - `layout.tsx`: Root layout that includes global styles and fonts
  - `globals.css`: Global CSS with Tailwind imports and theme variables

## Key Components

The main component is `XMANotionWorkspace` located in `app/page.tsx`, which implements a dashboard for a marketing agency with several views:

1. Dashboard: Overview with client stats and team tasks
2. Client Pipeline: Kanban view of client projects
3. Video Production: Pipeline for tracking video production
4. Documents: Document library for client assets
5. Personal Tasks: Task management interface

The UI uses inline styles for a Notion-like interface with dark mode styling and custom components.

## UI/UX Design

The UI follows a dark theme with these main colors:
- Background: #111111
- Surface: #222222
- Accent: #EF4444 (red)
- Text: #FFFFFF and #AAAAAA

The interface mimics a modern SaaS dashboard with cards, Kanban boards, and tables, similar to Notion's interface.

## Fonts

The project uses Geist and Geist Mono fonts from Google Fonts, which are loaded in the root layout.