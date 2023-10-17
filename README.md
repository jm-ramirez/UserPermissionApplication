# User Permission Application

This is a web application developed in React that connects to a .NET web API to manage user permissions. It uses various technologies such as React, React Router, Axios, Formik, and Material-UI to provide a solid and user-friendly experience.

## API Configuration

For this application to work correctly, you need to configure the base API URL in your project's `.env` or `.env.local` file. You can find the file where you should configure the base URL at:

```jsx
// src/api/api.js
const API_BASE_URL = 'https://localhost:7271/api/';

Replace 'https://localhost:7271/api/' with your API URL.

## Running the Project
Follow these steps to run the application:
1. Clone the repository:
```bash
git clone https://github.com/jm-ramirez/UserPermissionApplication.git
```

2. Navigate to the project directory:
```bash
cd UserPermissionApplication
```

3. Install the dependencies using Yarn:
```bash
yarn install
```

4. Start the application:
```bash
yarn start
```

The application will open in your default browser. If it doesn't open automatically, go to http://localhost:3000.

## Key Features
Home: The main page displays a list of user permissions.
Create Permission: You can create a new user permission on the "Create Permission" page, accessible at /new-permission.
Edit Permission: You can edit an existing permission by clicking the "Edit" button in the permissions list.

## Main Dependencies
React: JavaScript library for building user interfaces.
React Router: Router for application navigation.
Axios: HTTP client for making requests to the API.
Formik: Library for handling forms in React.
Material-UI: Material Design component library for React.

