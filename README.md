# Logs - Personal Health Tracking Web Application

A modern web application built with React and Firebase that helps users track and analyze their bathroom habits. Available at [https://dirty-logger.web.app/](https://dirty-logger.web.app/)

## Overview

This application serves as a personal health tracking tool that allows users to:
- Log and track bathroom visits with detailed metrics
- View comprehensive statistics about their habits
- Monitor health patterns over time
- Access their data securely through Firebase authentication

## Key Features

- **Detailed Logging System**:
  - Quality ratings for various metrics
  - Duration tracking
  - Wetness and granularity scales
  - Comprehensive quality assessment

- **Statistical Analysis**:
  - Overall quality averages
  - Frequency calculations
  - Time-based filtering (weekly, monthly, yearly, custom ranges)
  - Trend visualization

- **User Experience**:
  - Mobile-responsive design
  - Secure user authentication
  - Private data storage
  - Intuitive logging interface

## Tech Stack

- React 18.3 for the frontend
- Firebase 11.1 for authentication and data storage
- Vite 6.0 for build tooling
- React Router DOM 7.1 for navigation
- React Select for form controls
- React Simple Star Rating for quality metrics
- ESLint for code quality

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Firebase account (for deployment)

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd logs
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a new Firebase project
   - Enable Authentication and Firestore
   - Update Firebase configuration in `src/firebase.js`

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

## Deployment

The application is configured for deployment to Firebase Hosting. To deploy:

1. Install Firebase CLI (if not already installed):
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Build and deploy:
```bash
npm run build
firebase deploy
```

## Privacy & Security

- All user data is stored securely in Firebase Firestore
- Authentication is required to access any features
- Each user's data is isolated and private
- No sharing or public access to personal logs

## License

[Add your license information here]

## Contributing

[Add contribution guidelines here]
