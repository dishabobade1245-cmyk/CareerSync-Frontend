# CareerSync Frontend

CareerSync is a career and placement management platform that connects students, recruiters, and administrators through a centralized web application.

This repository contains the React frontend for CareerSync.

## Features

- Role-based login experience
- Student dashboard
- Recruiter dashboard
- Admin dashboard
- Browse job opportunities
- Apply for jobs
- Track application status
- View student profile
- Post job opportunities
- Manage recruiter jobs
- Review student applications
- Update application status
- Admin user monitoring
- Admin job monitoring
- Admin application monitoring
- Responsive and modern user interface

## User Roles

### Student

Students can:

- Browse available jobs
- Apply for jobs
- View their applications
- Track application status
- View their profile

### Recruiter

Recruiters can:

- Post jobs
- View their posted jobs
- Review student applications
- Update application status

### Admin

Administrators can:

- View users
- Monitor jobs
- Monitor applications

## Technology Stack

- React
- JavaScript
- Vite
- HTML5
- CSS3
- REST APIs

## Project Structure

```text
CareerSync-Frontend
│
├── public
│
├── src
│   ├── AdminUsers.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── RecruiterApplications.jsx
│   ├── RecruiterJobs.jsx
│   ├── RecruiterPostJob.jsx
│   ├── StudentApplications.jsx
│   ├── StudentJobs.jsx
│   ├── StudentProfile.jsx
│   ├── index.css
│   ├── main.jsx
│   │
│   └── assets
│       └── hero.png
│
├── package.json
├── package-lock.json
├── vite.config.js
└── index.html