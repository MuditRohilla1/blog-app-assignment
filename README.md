# Blog Post Management Application

This is a simple blog post management application built using React and Node.js. It allows users to create, edit, and view blog posts using Markdown syntax for the content. The app also includes a dark mode toggle for better accessibility.

## Features

- **Create New Post**: Users can create new blog posts by providing a title and Markdown content.
- **Edit Post**: Users can edit existing posts by modifying the title and content.
- **View Post**: Users can view detailed posts with Markdown rendering.
- **Dark Mode Toggle**: Users can toggle between dark and light modes for a better user experience.
- **Preview**: Users can preview how the Markdown content will look before publishing.
  
## Technologies

- **Frontend**: React, React Router, Axios, React Markdown, Toastify
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Styling**: Tailwind CSS
- **Dark Mode**: Tailwind CSS with conditional classes based on dark mode

## Installation

### Prerequisites

- Node.js
- MongoDB (local or cloud)

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/MuditRohilla1/blog-app-assignment.git
   cd blog-app-assignment
2. Install dependencies:
   npm install
3. Create a .env file in the root directory and set the necessary environment variables (e.g., MONGO_URI, PORT).
4. Run the development server
   npm start

## Backend
Navigate to the backend folder (if it's a separate project):

    ```bash
    cd backend
## Install dependencies:

    bash
    npm install
1. Create a .env file in the root directory and set the necessary environment variables (e.g., MongoDB URI, JWT_SECRET).

2. Run the backend server:

    ```bash
    npm start
The backend will be available at http://localhost:5000.

MongoDB Setup
If you're using a local MongoDB instance, make sure MongoDB is installed and running. If you're using MongoDB Atlas, create a cluster and get the connection URI, then update the .env file with your URI.

Usage
1. Navigate to the homepage to view all available posts.
2. Click on a post title to view the post details.
3. Use the "Create New Post" button to add a new post.
4. Use the "Edit" button on a post to modify its title and content.
5. You can toggle dark mode using the dark mode toggle button at the top of the page.

API Endpoints
POST /api/posts
Description: Create a new post.

Request Body:

json
Copy code
{
  "title": "Post Title",
  "markdown": "Post content in markdown format"
}
Response: Success message on post creation.

PUT /api/posts/:id
Description: Update an existing post by ID.

Request Body:

json
Copy code
{
  "title": "Updated Post Title",
  "markdown": "Updated content in markdown format"
}
Response: Success message on post update.

GET /api/posts/:id
Description: Get the details of a specific post by ID.

Response:

json
Copy code
{
  "title": "Post Title",
  "markdown": "Post content in markdown format",
  "createdAt": "2022-03-29T12:00:00Z"
}
DELETE /api/posts/:id
Description: Delete a post by ID.

Response: Success message on post deletion.



### Key Sections of the README:
- **Features**: Brief overview of app functionalities.
- **Technologies**: Technologies used in both frontend and backend.
- **Installation**: Step-by-step guide for setting up both frontend and backend.
- **API Endpoints**: Describes the routes and their expected request/response format.
- **Usage**: Instructions on how to use the application.
- **Contribution**: Guidelines for contributing to the project.
- **License**: License information (MIT in this case).

Let me know if you'd like to make any adjustments!
