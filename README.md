# DataManager Frontend

A modern, mobile-first Single Page Application (SPA) built with Vite, Tailwind CSS, and a reusable DataManager architecture.

## Project Structure

```
datamanager/
├── index.html              # Main HTML entry point with modern layout
├── package.json            # Project configuration with Vite and Tailwind
├── vite.config.js          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── src/                    # Source files
│   ├── main.js             # Application entry point
│   ├── styles.css          # Tailwind imports and custom styles
│   ├── DataManager.js      # Core DataManager class
│   ├── Router.js           # Router class for navigation
│   ├── app.js              # Main application setup
│   ├── routes/             # Route configuration
│   │   └── index.js        # Centralized route definitions
│   └── modules/
│       ├── TodoManager.js      # Todo functionality with modern UI
│       └── NotesManager.js     # Notes functionality with modern UI
├── dist/                   # Build output (after running npm run build)
│   ├── index.html
│   └── assets/
│       ├── index-*.css     # Single bundled CSS file with Tailwind
│       └── index-*.js      # Single bundled JS file
└── README.md               # This file
```

## Features

- **Modern UI**: Clean, mobile-first design with Tailwind CSS
- **Responsive Design**: Optimized for all screen sizes
- **DataManager**: A reusable class for managing data (localStorage, sync), CRUD, and rendering four views: list, details, pickupList, form. It binds `data-action` attributes to methods automatically.
- **Router**: Client-side routing with parameter support
- **Menu**: Navigation between different modules
- **Vite Build**: Fast development server and optimized production builds

## Design Highlights

- **Mobile-First**: Responsive design that works perfectly on phones, tablets, and desktops
- **Modern Components**: Card-based layouts with shadows, rounded corners, and smooth transitions
- **Accessible Forms**: Proper labels, focus states, and form styling
- **Consistent Spacing**: Using Tailwind's spacing scale for harmonious layouts
- **Color Scheme**: Clean gray palette with blue accents for interactive elements

## Installation

1. Ensure you have Node.js installed
2. Run `npm install` to install dependencies

## Development

Start the development server with hot reload:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Production Build

Build for production (creates single CSS and JS files):
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

The built files will be in the `dist/` directory with:
- Single optimized CSS file
- Single optimized JS file
- Minified HTML

## Git setup

Add the project to git:
```bash
git init
git add .
git commit -m "Initial commit"
```

`.gitignore` is configured to ignore:
- `node_modules/`
- `dist/`
- `*.log`
- `.env`
- OS/editor metadata

## Modules

### DataManager
Handles data storage, rendering, and user interactions. Supports:
- Local storage persistence
- Template-based rendering
- Custom method binding
- CRUD operations

### Router
Provides client-side routing with:
- Route pattern matching
- Parameter extraction
- History management

### TodoManager & NotesManager
Specific implementations using DataManager for different data types, now with modern Tailwind UI.

## Technologies

- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for modern styling
- **ES6 Modules**: Modern JavaScript module system
- **PostCSS**: CSS processing and optimization