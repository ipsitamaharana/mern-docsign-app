# MERN Document Signature App

A full-stack MERN application for uploading PDF documents, placing digital signatures, generating signed PDFs, and tracking document activity.

## Features

* PDF Upload
* PDF Preview
* Drag-and-Drop Signature Placement
* Digital Signature Saving
* Signed PDF Generation using PDF-Lib
* MongoDB Storage
* Audit Trail Logging
* Status Tracking
* Shareable Signing Links
* Document Approval / Rejection Workflow

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React PDF

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* PDF-Lib
* Multer
* JWT Authentication

## Installation

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

## Deployment

Backend deployed on Render.

MongoDB hosted on MongoDB Atlas.

## Author

Name: Ipsita Maharana
University: Odisha University of Technology and Research
Branch: Civil Engineering 
Internship Project
