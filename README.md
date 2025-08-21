# Back‑End Project

## Overview

A TypeScript-powered backend service designed to provide a strong
foundation for scalable, maintainable web applications. It features
structured modules for configuration, logging, validation, routing, and
database interactions via Prisma.

## Directory Structure

    .
    ├── components/           # Reusable modules or service components
    ├── config/               # Config settings and environment handling
    ├── db/prisma/            # Prisma schema, migrations, and DB scripts
    ├── logging/              # Logging setup and helpers
    ├── routes/               # API route definitions and handlers
    ├── utils/validation/     # Input validation utilities
    ├── index.ts              # Application entry point
    ├── package.json          # Project metadata and dependencies
    ├── tsconfig.json         # TypeScript configuration
    └── .gitignore            # Untracked files to ignore

## Prerequisites

-   Node.js (v16+)
-   npm or yarn
-   A running database compatible with Prisma (e.g., PostgreSQL, MySQL,
    SQLite)

## Getting Started

1.  **Clone the repository**

    ``` bash
    git clone https://github.com/timisenco2015/back‑end.git
    cd back‑end
    ```

2.  **Install dependencies**

    ``` bash
    npm install
    # or
    yarn install
    ```

3.  **To Configure the apiPath, logFile, Port, and Host** Go to the `.config folder` and edit `default.json`
    

4.  **Run database migrations (if applicable)**

    - cd to the db folder
    - then follow the instructions on Prisma website

5.  **Start the development server**

    ``` bash
    npm run start
    # or
    yarn start
    ```

## Project Highlights

-   **components/**: Modular logic components for reusability\
-   **config/**: Centralized configuration handling\
-   **db/prisma/**: Schema, migrations, and DB access via Prisma ORM\
-   **logging/**: Structured logging utilities\
-   **routes/**: Cleanly implemented HTTP endpoint handlers\
-   **utils/validation/**: Schema-based validation for input
    sanitization

## Scripts (as defined in `package.json`)

  Script             Description
  ------------------ -----------------------------------
  `dev`              Starts the development server
  `build`            Builds the production-ready build
  `start`            Runs the production build
  `prisma:migrate`   Executes Prisma migrations
  `prisma:studio`    Launches Prisma Studio (GUI)

## Usage

Once the server is running (e.g., on port 4000), your API routes defined
under `routes/` will be accessible at:

    http://localhost:<port>/api/v1/your-route
