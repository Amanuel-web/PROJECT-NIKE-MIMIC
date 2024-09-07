React + Vite
This project uses React, Bootstrap, MaterialUI, and a local database setup to manage data efficiently in a development environment.

Getting Started
Follow these steps to start the project and use the local database:

Step 1: Start the Local Database

To start the local database, run the following command in your terminal:
json-server --watch data/db.json --port 3000
This will start the json-server and watch the db.json file on port 3000, simulating a simple local database.

Step 2: Run the Development Server

Next, run the development server using Vite by entering the following command in the terminal:
npm run dev
This will start the Vite development server, which compiles and runs your React application.

Login Information

Predefined Credentials:

You can log in using the following credentials without creating a new user:

Username: ama
Password: 123

Creating a User:

Alternatively, you can create a new user by entering any dummy username and password. Please note:

+This setup is not secure and should not be used in production.
+Do not use real passwords for this setup.

Technologies Used

+React: For building the user interface.
+Vite: For fast development and bundling.
+Bootstrap: For responsive styling and layout.
+MaterialUI: For component-based design and UI elements.
+json-server: For simulating a local REST API with JSON data.

Features

+Local Data Persistence: Stores data locally using json-server to simulate a REST API.
+UI: Built using Bootstrap and MaterialUI for modern, clean design.
+User Authentication: Allows users to log in with predefined credentials or create dummy accounts for testing purposes.

License
This project is licensed under the MIT License - see the LICENSE file for details.
