# Focus Dashboard - Pomodoro Admin Dashboard

A responsive, glassmorphic productivity dashboard built with React, Vite, and plain CSS (no frameworks).

## ✨ Features

- **🎯 Focus Timer**: Pomodoro timer with focus/break modes (25/5 or 50/10 presets)
- **✅ Task Management**: Add, complete, and delete tasks
- **🎵 Music Player**: Play/pause toggle with playlist preview
- **☕ Health Trackers**: Coffee and water intake counters (persisted across sessions)
- **💭 Inspiration**: Daily motivational quote
- **📅 Schedule**: Quick schedule overview
- **🎨 Glassmorphism Design**: Modern UI with backdrop blur and semi-transparent cards
- **🕐 Dynamic Greeting**: Time-based greeting (Good Morning / Afternoon / Evening)
- **✏️ Editable Username**: Click the pencil icon next to the name to edit inline
- **📱 Fully Responsive**: Desktop (3-column), Tablet (2-column), Mobile (1-column)

## 🚀 Tech Stack

- **React 18** - Functional components, useState, useEffect, useLayoutEffect, useRef
- **Vite** - Lightning-fast build tool
- **Plain CSS** - CSS Grid, Flexbox, CSS Variables
- **No Dependencies** - No UI frameworks (Tailwind, Bootstrap, etc.)

## 📦 Project Structure

```
src/
  App.jsx                 # Root component
  main.jsx               # Entry point
  styles.css             # Global styles (CSS Grid, Flexbox, animations)
  components/
    Dashboard.jsx        # Main dashboard container (state management)
    TimerCard.jsx        # Pomodoro timer with presets
    TaskCard.jsx         # Task input and display
    TaskItem.jsx         # Individual task component
    MusicCard.jsx        # Music player UI
    CounterCard.jsx      # Reusable counter (Coffee/Water)
    QuoteCard.jsx        # Motivational quote
    ScheduleCard.jsx     # Schedule preview
```

## 🎨 CSS Architecture

### CSS Grid Layout

- **Desktop** (>1100px): 3-column grid (`1fr 1.2fr 1fr`), fixed `82vh` height
- **Desktop-edge** (1025–1100px): same 3-column layout, slightly reduced quote font size
- **Tablet** (769–1024px): 2-column grid — Focus + Tasks on top, Music/Quote/Schedule full-width below
- **Mobile** (≤768px): 1-column stacked, natural height

### Interaction & Animation

- Cards lift on hover with `translateY(-4px)` at `0.08s`
- Buttons scale up on hover (`scale(1.08)`) and press down on click (`scale(0.94)`) at `0.06s / 0.03s`

### Glassmorphism Styling

```css
/* Default state */
background: rgba(255, 255, 255, 0.5);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(0, 0, 0, 0.05);

/* Hover state */
background: rgba(255, 255, 255, 0.75);
```

### CSS Variables

```css
:root {
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --radius: 1rem;
  --blur: 20px;
  --glass-light: rgba(255, 255, 255, 0.5);
  --glass-lighter: rgba(255, 255, 255, 0.75);
  --accent-primary: #48bb78;
  --accent-secondary: #9f7aea;
}
```

## 🏃 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app opens automatically at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📝 Component Breakdown

### Dashboard (Parent)

- Central state manager: tasks, counters, timer preset, session mode, username
- Passes data and callback props down to child components
- Renders header with dynamic time-based greeting via `new Date().getHours()`
- Editable username: pencil icon toggles inline input, saved on Enter/Escape/blur
- Username input auto-sizes to content using a hidden mirror span + `useLayoutEffect`
- Tasks, username, coffee and water counts all persisted to `localStorage` in a single `useEffect`

### TimerCard

- Manages timer state internally with `useState` and `useEffect`
- Two presets: 25/5 min and 50/10 min
- Auto-switches between focus and break modes
- Calls parent `onSessionChange` callback when mode changes
- Receives `selectedPreset` and `onPresetChange` from parent
- Updates `document.title` with remaining time while running (e.g. `25:00 · Pomodoro`), resets to `Focus Dashboard` when paused

### TaskCard

- Receives `tasks` array from parent Dashboard
- Calls parent callbacks: `onAddTask`, `onToggleTask`, `onDeleteTask`
- Input accepts Enter key to add tasks
- Shows completion progress

### MusicCard

- Plays local MP3 files via the Web Audio API (`<audio>` element)
- Play/pause toggle with animated pulse on playing state
- Next track button (desktop only)
- Playlist UI with active track highlight
- Text overflow handled with ellipsis for narrow viewports

### CounterCard

- Reusable component for Coffee and Water counters
- Increment/decrement buttons
- Receives state and callbacks from parent

### QuoteCard

- Curated pool of 40 motivational quotes (design, engineering, productivity)
- Randomly selects a quote on load; refresh button cycles to a new one (never repeats consecutively)

### ScheduleCard

- Add schedule items with time, title, and optional details
- Items sorted by time automatically
- Delete individual entries
- Persisted to `localStorage`

## 🔄 React Patterns Used

1. **useState**: Managing component state (timer, tasks, counters)
2. **useEffect**: Timer interval, cleanup, and localStorage sync
3. **useLayoutEffect**: Synchronous DOM measurement before paint (mirror span for username input width)
4. **useRef**: Direct DOM access for input focus and width measurement
5. **Props**: Parent-to-child data flow
6. **Callbacks**: Child-to-parent communication (lifting state up)
7. **Controlled Components**: Form inputs with state management

## 🎨 Responsive Breakpoints

```
Desktop:       3 columns, fixed 82vh grid height (width > 1100px)
Desktop-edge:  3 columns, slightly reduced quote font (1025–1100px)
Tablet:        2 columns top + full-width bottom row (769–1024px)
Mobile:        1 column stacked, natural height (≤768px)
```

## ✅ Acceptance Criteria

- ✔ Responsive layout works across all breakpoints
- ✔ Focus/Break timer switches automatically
- ✔ Child-to-parent props callbacks used correctly
- ✔ Dynamic greeting based on system time
- ✔ Clean, readable, organized code
- ✔ Runs with `npm install` && `npm run dev`
- ✔ Glassmorphism styling on all cards
- ✔ CSS Grid for main layout, Flexbox for cards
- ✔ No CSS frameworks (Tailwind, Bootstrap)
- ✔ Plain CSS only with animations and transitions

## 🎯 Usage Examples

### Adding a Task

1. Type in the input field
2. Press Enter or click the + button
3. Task appears in the list

### Using the Timer

1. Select a preset (25/5 or 50/10)
2. Click Start button
3. Timer counts down
4. When focus ends, automatically switches to break
5. Use Reset to restart with selected preset

### Managing Health

1. Click + to increment coffee/water count
2. Click − to decrement
3. Counts persist during session

## 📱 Browser Support

Modern browsers with support for:

- CSS Grid
- Flexbox
- CSS Custom Properties
- `backdrop-filter` (with `-webkit-` prefix for Safari)

## 🚀 Performance

- Vite's instant hot module replacement (HMR)
- Minimal bundle size
- No runtime CSS-in-JS overhead
- Optimized animations using CSS transforms

## 📄 License

Open source project for educational purposes.
