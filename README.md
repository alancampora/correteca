# Correteca

Correteca is a training data management application for runners that helps you organize and track your fitness journey effectively.

## Purpose

This application allows you to:

- Store and manage your training data in one centralized location
- Track your progress over time
- Organize workouts and exercises systematically
- Analyze your training patterns and improvements

## Project Structure

The project is organized into three main components:

- `common`: Shared types and utilities
- `server`: Backend API service
- `client`: Frontend application

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository
2. Install the dependencies
3. Start the backend server
4. Start the frontend development server

## Build Instructions

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- MongoDB (version 4.x or later)

### Backend (Server)

1. Navigate to the `server` directory:

   ```sh
   cd server
   ```

2. Create a `.env` file in the `server` directory and add the following environment variables:

   ```sh
   ENV=dev
   SERVER_PORT=3052
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   FE_URI=http://localhost:5173
   DB_URI_DEV=mongodb://localhost:27017/correteca
   DB_URI_PROD=mongodb://<user>:<password>@<db-cluster>/<db-name>
   ```

3. Install the server dependencies:

   ```sh
   npm install
   ```

4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend (Client)

1. Navigate to the `client` directory:

   ```sh
   cd client
   ```

2. Install the client dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:
   ```sh
   npm run dev
   ```

### Running the Application

1. Ensure MongoDB is running on your machine or accessible via the connection string provided in the `.env` file.
2. Start the backend server as described above.
3. Start the frontend development server as described above.
4. Open your browser and navigate to `http://localhost:5173` to access the application.
