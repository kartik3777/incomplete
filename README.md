# ProfInfo Central

ProfInfo Central is a web application designed to facilitate communication between students and professors for project requests and approvals. The project is deployed and hosted on Vercel.

## Deployment

The project is deployed and hosted on Vercel. You can access the deployed application [here](https://profinfocentral.vercel.app/).

## Features

- **Student Portal**: Students can request projects from specific professors.
- **Professor Portal**: Professors can review and manage project requests from students.
- **Authentication**: Users can register, login, and logout securely.
- **Project Management**: Professors can accept or reject project requests, and students can track the status of their requests.
- **Database Integration**: Uses MongoDB to store user information and project requests.
- **Responsive Design**: Built with React.js to ensure compatibility across various devices.

## Technologies Used

### Frontend (React.js):

- **axios**: A promise-based HTTP client for making HTTP requests from the browser. It's commonly used for communicating with the backend API.
- **react-router-dom**: Enables routing within a React application, allowing you to define routes and navigate between different components.
- **react-bootstrap / Material-UI / Ant Design**: UI component libraries for React that provide pre-designed components and styles, helping to build responsive and visually appealing user interfaces quickly.

### Backend (Express.js):

- **express**: Fast, unopinionated, minimalist web framework for Node.js. It simplifies the process of building APIs and handling HTTP requests.
- **mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward schema-based solution to model application data and interact with MongoDB.
- **jsonwebtoken (JWT)**: For creating and verifying JSON Web Tokens. JWTs are commonly used for authentication and session management in web applications.
- **bcryptjs**: A library for hashing passwords securely. It's commonly used for encrypting user passwords before storing them in the database.

### Database (MongoDB):

- **mongodb/mongoose**: As mentioned above, mongoose is commonly used with MongoDB. Mongoose provides a higher-level abstraction for MongoDB, making it easier to work with MongoDB databases in Node.js applications.
- **dotenv**: A zero-dependency module that loads environment variables from a .env file into process.env. It's commonly used to manage sensitive information like database connection strings securely.
- **express-validator**: Middleware for Express.js that provides easy validation and sanitization of incoming request data. It helps ensure that the data sent to the server is valid before processing it.
- **morgan**: HTTP request logger middleware for Node.js. It logs requests to the server, which can be useful for debugging and monitoring application behavior.

## Installation

1. Clone the repository using
   

