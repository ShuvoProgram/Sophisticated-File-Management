# Sophisticated File Management: Organizing Your Digital Assets

## Overview

sophisticated file management system using Next.js and Material-UI (MUI). It enables users to create, manipulate, and manage various file types (images, PDFs) with advanced drawing and editing capabilities. Key features include file upload, drawing tools, annotations, real-time collaboration, version control, customizable UI, data encryption, batch processing, and mobile compatibility.

## Demo

**Live Link to BeatBox: [Explore BeatBox](https://singularity-music.vercel.app)**

## Technologies

![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Fabric](https://img.shields.io/badge/-Fabric-4F5665?style=flat-square)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Material UI](https://img.shields.io/badge/-Material_UI-0081CB?style=flat-square&logo=material-ui&logoColor=white)
![Express Validator](https://img.shields.io/badge/-Express_Validator-00CECB?style=flat-square&logo=express&logoColor=white)
![Jsonwebtoken](https://img.shields.io/badge/-Jsonwebtoken-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Axios](https://img.shields.io/badge/-Axios-007ACC?style=flat-square&logo=axios&logoColor=white)

## Features 🚀

## Frontend Features 🚀🎨

- **Immersive UI/UX:** Delight in a visually captivating and responsive user interface powered by Next.js and Material-UI, ensuring an engaging user experience.
- **Authentication System:** Secure user authentication using NextAuth.js, providing seamless login and user management functionalities.
- **Responsive Layout:** Crafted with MUI components, ensuring adaptability across various devices for optimal usability.

### File Management 📁💻

- **File Upload:** Implement robust functionality supporting image and PDF uploads for versatile file management.
- **File Viewer:** Introduce a user-friendly file viewer to display uploaded files, enhancing accessibility and usability.

### Drawing and Editing Tools 🎨🖌️

- **Canvas Integration:** Incorporate a dynamic canvas component enabling users to draw shapes, lines, and freehand drawings with precision.
- **Drag-and-Drop:** Facilitate intuitive interaction with shapes and lines through drag-and-drop functionality, enhancing user control.
- **Customization Options:** Enable users to adjust color selections and line thickness, alongside an eraser tool for seamless editing.

### Advanced Drawing Capabilities 🌟🎨

- **Text Tool:** Implement a versatile text tool for adding and editing text directly on the canvas, enhancing creative possibilities.
- **Layer Support:** Enable creation and management of multiple layers, fostering complex and organized drawings.
- **Precision Tools:** Implement snapping and alignment guides, along with measurement tools for precise drawing accuracy.

### Annotations and Collaboration 📝🤝

- **Annotation Features:** Empower users with the ability to annotate and comment on specific file sections, fostering collaboration and feedback.
- **Real-time Collaboration:** Utilize WebSockets for seamless real-time collaboration, enhancing teamwork and productivity.

### Export and Security 🚀🔒

- **File Export:** Provide functionality to save edited files locally or in the cloud (e.g., AWS S3), and export files as images or PDFs for versatile usage.
- **Role-Based Access:** Implement role-based access control (admin, editor, viewer) to manage permissions and ensure data security.

### Version Control and Customization 🔄🎨

- **Versioning:** Enable version control to track file changes and facilitate rollback to previous versions, ensuring data integrity.
- **Template Management:** Offer a library of templates for user convenience, enhancing productivity and customization options.

### Additional Features and Compatibility 🎉📱

- **Customizable UI:** Allow users to personalize themes and toolbar configurations, ensuring an adaptable and user-friendly interface.
- **Data Encryption:** Implement robust encryption protocols to safeguard file storage and transfer, prioritizing data security.
- **Mobile Optimization:** Ensure seamless functionality and responsiveness on mobile devices, supporting touch interactions for drawing and editing tasks.

# Sophisticated File Management API Endpoints 📁

## User Routes 👤

- **POST /api/users/register:** Register a new user. 📝
- **POST /api/users/login:** Log in a user. 🔐
- **GET /api/users/:id:** Get details of a specific user. 📄
- **PATCH /api/users/my-profile:** Update user's profile. 🔄
- **GET /api/users:** Get all users. 📋

## File Routes 📄

- **POST /api/file/upload:** Upload a file. 📤
- **GET /api/file/:id:** Get details of a specific file. 📄
- **PUT /api/file/:id:** Update a file. 🔄
- **DELETE /api/file/:id:** Delete a file. 🗑️

## Route Usage 🚀

- All user routes are under `/api/users/`.
- All file routes are under `/api/file/`.

## Installation 🚀

### Backend Installation

1.  Clone the backend repository:

    ```bash
    git clone https://github.com/ShuvoProgram/Sophisticated-File-Management.git
    cd backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Set up environment variables:

    Create a `.env` file in the root directory and add the following:

        ```env

        MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

        JWT_SECRET=YOUR_JWT_SECRET
        JWT_REFRESH_SECRET=YOUR_JWT_REFRESH_SECRET
        JWT_EXPIRES_IN=1d
        JWT_REFRESH_EXPIRES_IN=1d

        NODE_ENV=development

        BCRYPT_SALT_ROUNDS=12

        CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
        CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
        CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
    ```
4. Run the backend server:

   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5000` by default.

### Frontend Installation

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/ShuvoProgram/Sophisticated-File-Management.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up backend API URL:

   Create a `.env` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_BACKEND_API=http://localhost:5001/api/v1
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   SECRET=YourSecretKeyForApplication
   ```

4. Run the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5471` by default.
