# URL Shortener Backend

## Overview

This project is a simple URL shortener service, similar to Bitly. It allows users to generate short URLs for longer links and tracks the visit history for each short URL. The backend is built using Node.js, Express, and MongoDB (via Mongoose).

---

## Technologies Used

- **Node.js** & **Express**: Server and routing.
- **MongoDB** & **Mongoose**: Database and ODM.
- **nanoid**: For generating unique short IDs.
- **nodemon**: For development auto-reloading.


---

## Project Structure

```bash project-root/
├── controllers/ url.js
├── models/ url.js
├── routes/ url.js
├── connect.js
├── index.js
└── package.json
```
### File/Folder Descriptions

- **package.json**  
  Contains project metadata and dependencies: `express`, `mongoose`, `nanoid`, and `nodemon`.

- **connect.js**  
  Exports a function to connect to MongoDB using Mongoose.

- **index.js**  
  The main entry point. Sets up the Express server, connects to MongoDB, and defines routes for URL shortening and redirection.

- **controllers/url.js**  
  Contains the controller logic for generating new short URLs.

- **models/url.js**  
  Defines the Mongoose schema and model for storing URLs, their short IDs, and visit history.

- **routes/url.js**  
  Sets up the Express router for handling URL-related API endpoints.

---

## How It Works

1. **Shorten a URL**  
   - Endpoint: `POST /url/`  
   - The user sends a long URL in the request body.
   - The server generates a unique short ID using `nanoid` and stores it in MongoDB along with the original URL and an empty visit history.
   - Returns the short ID to the user.

2. **Redirect to Original URL**  
   - Endpoint: `GET /:shortId`  
   - When a user visits a short URL, the server looks up the original URL by `shortId`, logs the visit with a timestamp, and redirects the user to the original URL.

3. **Visit History**  
   - Each time a short URL is accessed, the timestamp is recorded in the `visitHistory` array for analytics.

---


## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- [MongoDB](https://www.mongodb.com/) running locally or a cloud instance (like MongoDB Atlas)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/M-Salman-khan/URL_Shortner.git
   cd URL_Shortner
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```env
   MONGODB_URL=mongodb://localhost:27017/urlshortener
   ```

4. **Run the server**

   - For development (with auto-reload using nodemon):

     ```bash
     npm run dev
     ```

   - For production:

     ```bash
     node index.js
     ```

5. **Access the API**

   - Base URL: `http://localhost:8000/`
   - Use a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test endpoints.


---

## Summary

This project provides a basic backend for a URL shortener service, supporting URL creation, redirection, and visit tracking. It demonstrates RESTful API design, MongoDB integration, and modular code organization.
