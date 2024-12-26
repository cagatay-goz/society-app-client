# METU NCC Societies App

## Overview
The **METU NCC Societies App** is a web-based platform designed to enhance the experience of managing societies, events, announcements, and room reservations at Middle East Technical University Northern Cyprus Campus (METU NCC). This application fosters effective communication between society members, presidents, and administrators, creating a seamless environment for campus life.

---

## Features

### Authentication
- **Login and Signup Pages**: Secure authentication system using JWT tokens for role-based access control.
- **Roles**: Supports multiple roles (admin, society president, and regular user).

### Dashboard
- Displays a list of all societies with their names and descriptions.
- Users can navigate to specific society pages to explore details or join societies.
- Dynamically updates based on user actions and role permissions.

### Society Pages
- **Details**: View society information such as name, description, announcements, and president contact details.
- **Announcements**: Show recent events and posts with descriptions and images.
- **Media**: Includes a gallery for past events and posters for upcoming activities.

### Admin Features
- **Manage Reservations**: View, approve, or reject room reservation requests.
- **Add New Societies**: Add new societies with details such as name, description, and president email.

### Society President Features
- **Add Announcements**: Share updates or events with a customizable announcement form.
- **Room Reservations**: Submit requests for event locations via a booking form.
- **Join Requests**: Approve or reject user requests to join societies.

### User Features
- **My Societies**: View societies the user has joined.
- **Explore Societies**: Join new societies or interact with existing ones.

---

## Technologies Used

### Frontend
- **Framework**: React.js
- **Languages**: JavaScript, HTML, CSS

### Backend
- **Framework**: Spring Boot (Java)
- **Database**: PostgreSQL (hosted on AWS RDS)
- **Cloud Services**: AWS S3, AWS EC2, AWS IAM

---

## Deployment
The application is deployed on AWS using the following services:
- **AWS EC2**: Hosts both frontend and backend servers.
- **AWS RDS**: Manages the PostgreSQL database.
- **AWS S3**: Stores and serves announcement images.

Public IP for the deployed application: [http://18.192.66.96/](http://18.192.66.96/)

---

## Setup and Installation

### Prerequisites
- Node.js installed on your local machine.
- Access to the backend server API.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/cagatay-goz/society-app-client.git
   ```
2. Navigate to the project directory:
   ```bash
   cd society-app-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Usage

### Default Pages
- **Dashboard**: Automatically opens upon launch.
- **Login**: [http://localhost:3000/login](http://localhost:3000/login)
- **Signup**: [http://localhost:3000/signup](http://localhost:3000/signup)
- **Society Details**: Example - [http://localhost:3000/society/1](http://localhost:3000/society/1)
- **Booking Form**: [http://localhost:3000/bookingForm](http://localhost:3000/bookingForm)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Contributors
- **Ekrem Cagatay Goz**: Backend APIs for authentication and tokenization. Deployed the application using AWS EC2.
- **Engin Eray Kabalak**: Backend APIs for societies, announcements, and reservation requests. Integrated AWS S3 for file handling.
- **Haya Arabi Katibi**: Frontend development and AWS RDS integration for database connectivity.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

---

## References
- [AWS RDS Documentation](https://docs.aws.amazon.com/rds/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
