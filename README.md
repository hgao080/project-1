# NZPMC Project 1

## Overview

This project has been created with FSO as a base on top of which I have added Tailwind CSS for styling and JSON web tokens for user authentication. This project should cover all requirements listed. This project has been deployed using Render, you can access it [here](https://project-1-jfmi.onrender.com/). Please allow a minute or so for the website to load due to the use of the free tie.

### What makes my project stand out?

What I'm most proud about my project is my overall presentation of the website. Functionality-wise I don't believe there is anything too special that I have added that would stand out except for the addition of the filters.

Note: I believe there is some coding inconsistency due to me following a video for the user auth part but I have tried to fix this to the best of my ability e.g. frontend hooks and services

### User functionality

Only upcoming events are shown to users. Joining events is done by storing a list of joined events with each user. Users are able to remain logged in after refreshing the page by storing a user object in local storage (password is not stored). User passwords are stored hashed through the use of bcrypt (npm package).

### Admin functionality

Admins are able to login by entering 'admin' in both email and password. The API route for getting all users has been protected so that only admins are able to access it (use of JWT). Admins are able to filter through events with more advanced filters.

## Additional Features / Design Choices

1. Tailwind CSS
    - Used this for faster styling (influenced by personal bias and experience)
2. Being able to delete events
    - Think this is a helpful addition otherwise would need to delete manually from MongoDB and website is slow
3. Sure check when joining or deleting events
    - In case of misclicks as one requirement for users was not being able to leave joined events
4. Filters
    - Helpful when there are a lot of events otherwise users and admins would be scrolling for a long time

## Codebase Structure

```
/backend
    /controllers # Logic for handling requests and responses for specific routes
    /middleware # Functions that run during request processing, such as authentication or error handling
    /models # Database schema definitions and interactions
    /routes # API route definitions, linking endpoints to controller methods
/frontend
    /src
        /components # Reusable UI components used across the application
        /context # Context for managing global state across the app
        /hooks # Custom React hooks for handling logic and state management
        /pages # Main application pages representing different routes
        /services # Functions for interacting with APIs or backend services
```
