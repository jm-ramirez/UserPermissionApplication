# User Permission Application

This is a web application developed in React js that connects to a .NET web API to manage user permissions. It uses various technologies such as React, React Router, Axios, Formik, and Material-UI to provide a solid and user-friendly experience.

## API Configuration

For this application to work correctly, you need to configure the base API URL in your project. You can find the file where you should configure the base URL at:

```jsx
// src/api/api.js
const API_BASE_URL = 'https://localhost:7271/api/';

Replace 'https://localhost:7271/api/' with your API URL.
```
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

## Using Docker to Deploy the React Application
Follow these steps to run the application:
1. Prerequisites:

Make sure you have Docker installed on your system. If Docker is not installed, you can download it from the official Docker website.

2. Clone the Repository:

Clone your application repository from GitHub:
```bash
git clone https://github.com/jm-ramirez/UserPermissionApplication.git
```

3. Configure API Base URL:

In your React project file, adjust the API_BASE_URL variable in the src/api.js file to point to the location where your API is hosted. For example:
```bash
// src/api/api.js
const API_BASE_URL = 'https://localhost:7271/api/';

Replace 'https://localhost:7271/api/' with your API URL.
```

4. Build the Docker Image:

Navigate to your project directory and execute the following command to build the Docker image. Ensure that the Dockerfile is in the root of your project:
```bash
docker build -t user-permission-application .
```

5. Run the Application in Docker:

Once the Docker image is successfully created, you can run the application in a Docker container with the following command:
```bash
docker run -p 3000:3000 user-permission-application
```
This will expose the React application on port 3000 within the Docker container.

6. Access the Application:

Open a web browser and access the React application in your browser at http://localhost:3000.

7. Stop the Application:

When you're finished using the application, you can stop the Docker container by either pressing Ctrl + C in the terminal where it's running or by using the following command:
```bash
docker stop <container-name-or-ID>
```
Replace <container-name-or-ID> with the name or ID of the Docker container that is running.

8. Remove the Container (Optional):

If you want to permanently remove the Docker container after stopping it, you can use the following command:
```bash
docker rm <container-name-or-ID>
```
This will permanently delete the container.

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

## Preview
Home

![image](https://github.com/jm-ramirez/UserPermissionApplication/assets/21143205/05d211d9-166d-4ce4-ae9c-be5a35effd9f)


Create/Edit Permission

![image](https://github.com/jm-ramirez/UserPermissionApplication/assets/21143205/2889deb6-2b87-4af1-b1aa-db40ddd29bba)

