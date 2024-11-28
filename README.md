# Pause - The Menopause Symptom Tracker
Pause is a full-stack web application designed to help users track and manage their menopause symptoms. It allows users to log their symptoms and date, and retrieve their past symptoms. 

During menopause, many individuals experience various symptoms such as hot flashes, mood changes, and brain fog. This app aims to provide clarity and a broader view of their symptoms by allowing them to log their experiences on a daily basis.

## Table of Contents
- [Main Features](https://github.com/lswong23/group-5-spring-24?tab=readme-ov-file#main-features-frontend-components)
- [Technologies Used](https://github.com/lswong23/group-5-spring-24?tab=readme-ov-file#technologies-used)
- [Getting Started/Installation](https://github.com/lswong23/group-5-spring-24?tab=readme-ov-file#getting-startedinstallation)
- [Usage](https://github.com/lswong23/group-5-spring-24?tab=readme-ov-file#usage)
- [Project Documentation](https://github.com/lswong23/group-5-spring-24?tab=readme-ov-file#project-documentation)
- [Contributing](https://github.com/lswong23/group-5-spring-24?tab=readme-ov-file#contributing)
- [License](https://github.com/lswong23/group-5-spring-24?tab=readme-ov-file#license)
- [Acknowledgments](https://github.com/lswong23/group-5-spring-24?tab=readme-ov-file#acknowledgments)

## Main Features (Frontend Components)
1. Landing page: This is the Home Page to provide information about the app and will guide user to register or login.
2. User registration: This page allows user to register to the app.
3. Login: This page allows user to login to the app.
4. Dashboard: 
- This page allows users to log menopause symptoms through checkboxes and provide useful suggestions to manage their symptoms.
- The same page also allows users to view their symptoms in a calendar and list view.

### Target Audience
The primary target audience for Pause is individuals going through menopause. The app caters to individuals who want to better understand their symptoms.

## Technologies Used

- Frontend: React.js, Redux, React Router, React Calendar
- Backend: Node.js, Express.js
- Database: MySQL
- Testing: Jest, Supertest (backend), React Testing Library (frontend)
- Styling: CSS, Bootstrap

## Getting Started/Installation

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- MySQL (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lswong23/group-5-spring-24
```

2. Install dependencies for the backend (server):
```bash
cd group-5-spring-24/pause/backend
npm install
```
3. Install dependencies for the frontend (client):
```bash
cd group-5-spring-24/pause/frontend
npm install
```

4. Set up the database:
- Create a new MySQL database
- Import the `db_pause.sql` file to create the required tables
- To ensure that the server can connect to the database you may need to run this query in the database: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password_goes_here'; 

5. Configure environment variables:
   - In the `backend` directory, create a `.env` file
   - Add the following variables and update with your MySQL credentials:
     ```
     host = "localhost"
     user = "root"
     password = "your_password"
     ```

### Running the Application

1. Start the backend server:
```bash
cd pause/backend
npm start
```
2. Start the frontend development server:

```bash
cd pause/frontend
npm start
```
3. Open your browser and navigate to `http://localhost:3000` to access the Pause application.

### Running Tests

To run tests for the backend:
```bash
cd pause/backend
npm test
```

To run tests for the frontend:
```bash
cd pause/frontend
npm test
```
## Usage
Once the application is running, users can log in and start tracking their symptoms. Detailed instructions on how to use the app can be found in the [user guide](USER_GUIDE.md).

## Project Documentation

The detailed project documentation, including the background, specifications, design, implementation, testing, and evaluation, can be found in the [project-document.pdf](https://github.com/lswong23/group-5-spring-24/blob/main/Documentation.pdf) file.


## Contributing
We welcome contributions from all team members! To ensure a smooth and efficient workflow, please follow these guidelines when contributing to the project:
- **Branching and Workflow:** Always create a new feature branch from the updated main branch for your work. Commit changes with clear messages, push your branch, and create a pull request for review.
- **Code Reviews and Testing:** Ensure all pull requests are reviewed by at least one team member and that your code is well-tested before merging into main.
- **Communication and Code Style:** Follow the project's code style, write meaningful names and documentation, and keep the team updated on your progress through the project’s communication Slack channels.

## License

This project is for internal educational purposes only and is not licensed for public use. If this project is to be released publicly in the future, a proper open-source license will be added.

## Acknowledgments

- Special thanks to our instructors and tutors at Code First Girls for their guidance and support, as well as for providing us with the knowledge and skills to create this app.
- We were inspired by the fact that one half of the world’s population is women. Yet, remarkably, women’s health has often been considered a niche market and a mere subset of healthcare. This project aims to address some of the unmet and underserved needs in women's health, particularly focusing on menopause. We hope that this app will serve as a useful tool for women to track their symptoms and provide valuable data to healthcare providers.




