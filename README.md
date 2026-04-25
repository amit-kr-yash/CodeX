# Coding Platform

A full-stack web application for coding practice and problem-solving. Users can solve programming problems in Java and Python, submit their code for automated judging, and track their progress.

## 🚀 Features

### User Features
- **User Authentication**: Secure signup and login with JWT tokens
- **Problem Solving**: Browse and solve coding problems with multiple difficulty levels
- **Code Editor**: Integrated Monaco editor with syntax highlighting for Java and Python
- **Code Submission**: Submit code and get instant feedback with test case results
- **Progress Tracking**: View solved problems and submission history
- **Topic Filtering**: Filter problems by programming topics

### Admin Features
- **Problem Management**: Create, view, and manage coding problems
- **Test Case Management**: Define input/output test cases for problems
- **User Oversight**: Admin panel for platform management

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Judge0** (self-hosted on AWS EC2 Docker) for code execution and judging
- **CORS** for cross-origin requests

### Frontend
- **React 18** with Vite build tool
- **React Router** for client-side routing
- **Monaco Editor** for code editing
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Markdown** for problem descriptions

## 📁 Project Structure

```
coding-platform/
├── backend/
│   ├── controller/          # Route handlers
│   │   ├── authController.js
│   │   ├── personController.js
│   │   ├── problemController.js
│   │   └── submitController.js
│   ├── middleware/          # Authentication & authorization
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   ├── models/              # MongoDB schemas
│   │   ├── Person.js
│   │   └── Problem.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── personRoutes.js
│   │   ├── problemRoutes.js
│   │   └── submitRoutes.js
│   ├── utils/               # Utilities
│   │   ├── bp_code.js       # Boilerplate code templates
│   │   └── db.js            # Database connection
│   ├── index.js             # Server entry point
│   ├── package.json
│   └── .env                 # Environment variables
└── frontend/
    ├── public/              # Static assets
    ├── src/
    │   ├── components/      # Reusable UI components
    │   │   ├── CodeEditor.jsx
    │   │   ├── CreateProblem.jsx
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProblemTable.jsx
    │   │   └── ResultPanel.jsx
    │   ├── pages/           # Page components
    │   │   ├── AdminPanel.jsx
    │   │   ├── Login.jsx
    │   │   ├── ProblemDetail.jsx
    │   │   ├── ProblemList.jsx
    │   │   ├── Profile.jsx
    │   │   └── Signup.jsx
    │   ├── services/        # API service layer
    │   │   └── api.js
    │   ├── App.jsx          # Main app component
    │   ├── index.css        # Global styles
    │   ├── main.jsx         # App entry point
    │   └── routes.jsx       # Route definitions
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Judge0 self-hosted instance (running on AWS EC2 Docker or locally)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/coding-platform
   JWT_SECRET=your_jwt_secret_key
   JUDGE0_URL=http://your-aws-ec2-instance:2358
   ```
   Replace `your-aws-ec2-instance` with your actual AWS EC2 instance IP or domain name.

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Problems
- `GET /api/problems` - Get all problems (with pagination and filtering)
- `GET /api/problems/:id` - Get problem details
- `POST /api/problems` - Create new problem (admin only)
- `GET /api/topics` - Get available problem topics

### Submissions
- `POST /api/submit` - Submit code for judging

### User
- `GET /api/user/profile` - Get user profile and submissions

## 🗄️ Database Schema

### User (Person)
- `username`: String (required)
- `email`: String (required, unique)
- `password`: String (hashed, required)
- `role`: String (enum: "student", "admin", default: "student")
- `solvedProblems`: Array of ObjectIds (references to Problem)
- `submissions`: Array of submission objects

### Problem
- `title`: String (required)
- `description`: String (required)
- `difficulty`: String (enum: "easy", "medium", "hard")
- `topics`: Array of Strings
- `testCases`: Array of test case objects with `input` and `expected` fields

### Submission
- `problemId`: ObjectId (reference to Problem)
- `code`: String
- `language`: String
- `status`: String (enum: "Accepted", "Wrong Answer", "Error")
- `createdAt`: Date

## 🔐 Authentication & Authorization

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require valid tokens, and admin-only routes check for admin role.

## ⚡ Code Execution

Code submissions are sent to the self-hosted Judge0 instance (running on AWS EC2 Docker) for execution against predefined test cases. The system supports Java and Python languages with real-time feedback on submission results.

### Judge0 Setup
For information on setting up Judge0, refer to the official repository:
https://github.com/judge0/judge0.git

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Dark Theme**: Code editor with dark theme for better readability
- **Real-time Feedback**: Instant submission results and error messages
- **Pagination**: Efficient loading of problem lists
- **Topic Filtering**: Easy problem discovery by categories


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Amit Kumar Yash**
