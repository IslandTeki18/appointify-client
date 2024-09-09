# Appointify Client

Appointify Client is the front-end application for the Appointify platform, designed to manage appointments efficiently. This client-side application is built using modern web technologies including React, TypeScript, and Tailwind CSS, and is bundled with Parcel.

## Project Structure

The project is organized into several directories and files, each serving a specific purpose:

- `.parcel-cache/`: Contains cache files generated by Parcel to speed up the build process.
- `public/`: Contains static files like `index.html` which serves as the entry point for the application.
- `src/`: Contains the main source code for the application.
  - `App.tsx`: The root component that sets up the application routes.
  - `assets/`: Contains static assets like images and fonts.
  - `components/`: Contains reusable React components such as `Button.tsx` and `Input.tsx`.
  - `contexts/`: Contains React context providers for state management.
  - `features/`: Contains feature-specific code, organized by feature.
  - `hooks/`: Contains custom React hooks.
  - `routes/`: Contains routing logic, including `index.tsx` which sets up the main routes.
  - `services/`: Contains service modules for API calls and other business logic.
  - `styles/`: Contains global styles.
  - `types/`: Contains TypeScript type definitions.
  - `utils/`: Contains utility functions.
- `index.tsx`: The entry point for the React application, rendering the root component into the DOM.
- `tailwind.config.js`: Configuration file for Tailwind CSS.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: Contains project metadata, scripts, and dependencies.
- `README.md`: Provides an overview and setup instructions for the project.

## Key Technologies

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Parcel**: A fast, zero-configuration web application bundler.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/appointify-client.git
   cd appointify-client
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Project

- To start teh development server, run:
  ```bash
  npm start
  # or
  yarn start
  ```

## Routing

- The application uses `react-router-dom` for client-side routing. The main routes are defined in `src/routes/index.tsx` and are provided to the application via the `RouterProvider`.

## Tailwind CSS

- The Tailwind CSS configuration is defined in `tailwind.config.js`. It specifies the paths to all template files so that Tailwind can purge unused styles in production.

## Typescript

- The project is written in TypeScript, providing static type checking and improved developer experience. The TypeScript configuration is defined in `tsconfig.json`.
