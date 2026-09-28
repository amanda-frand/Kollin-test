# Build a playful math-learning website

## Goal
Create a polished, Duolingo-inspired math practice experience at the home page: cheerful, game-like, easy to scan, and immediately usable.

## What will be built
- A compact top bar with the product identity, streak, lives, and progress indicators.
- A lesson path as the main experience, with colorful checkpoints, locked stages, and a clear current lesson.
- A practice panel that lets learners answer a real arithmetic question and receive immediate visual feedback.
- Supporting progress and daily-goal areas that reinforce momentum without turning the page into a marketing site.
- Responsive layouts for phones and desktops, including a focused mobile bottom navigation.

## Visual direction
- Bright educational palette led by fresh green, balanced by sky blue, warm yellow, coral, and neutral surfaces.
- Friendly rounded typography, chunky controls, tactile borders, and soft dimensional shadows.
- A custom geometric mascot illustration made in the interface, rather than copying Duolingo’s owl or branding.
- Restrained bounce and celebration motion, with reduced-motion support.

## Technical details
- Build within the existing TanStack Start home route.
- Define all color, radius, shadow, and motion values as semantic tokens in the global design system.
- Keep lesson interactions in local React state; no account or database is required for this first experience.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify the finished lesson flow and responsive layout in the live preview.
