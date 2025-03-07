# Daily Note WebApp

## Overview
This project is a web application where users can add, view, update, and delete their daily notes. The backend is built with **Spring Boot** to handle RESTful API requests, while the frontend is developed with **React** to create a user-friendly interface.



---

## Demo Video
Watch a short demo of the **Daily Note WebApp** in action:

[Uploading DiaryNote.mp4…](https://github.com/user-attachments/assets/001b4084-e3b1-42c5-b57a-b9b90b90088f)

---
## Screenshots

### Frontend (React)
![image](https://github.com/user-attachments/assets/ac83cd61-f314-4e44-a471-2b6769e5f726)
![image](https://github.com/user-attachments/assets/aaa1bea9-563d-4f22-9009-634fe620ca8b)

### Backend (Spring Boot)
![image](https://github.com/user-attachments/assets/31d136f3-d7fa-4907-aaba-87b438cd6c90)





## Database 
![image](https://github.com/user-attachments/assets/dec156d7-01e5-4df9-aee0-7bbf0b7d8c2f)

---

## Tech Stack

### Backend
- **Spring Boot**: For building the RESTful API.
- **Spring Data JPA**: For database interactions.
- **PostgreSQL**: A relational database to store daily notes.

### Frontend
- **React**: JavaScript library for building the user interface.
- **Axios**: For making HTTP requests to the backend API.
- **Material-UI**: For responsive UI components.
---

## Features
- **Add a Daily Note**: Create a new note with a title and content.
- **View Previous Notes**: View all notes stored in the database.
- **Update a Note**: Edit any existing note.
- **Delete a Note**: Remove a note from the list.

---

## Getting Started

### Prerequisites
- **JDK 11 or above**: Required for running the Spring Boot backend.
- **Node.js and npm**: Required for running the React frontend.
- **Maven**: For managing Spring Boot dependencies.
- **PostgreSQL**: Make sure PostgreSQL is installed and running on your machine.

---

### Setting up the Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/DiaryNote-WebApp.git

2. Navigate to the backend and frontend directory:
   DialyNote As Backend
   ```bash
   cd DiaryNote-WebApp/DialyNote
   ```
   diary-frontend As Frontend
   ```bash
   cd DiaryNote-WebApp/diary-frontend
   ```

4. Create a PostgreSQL database:
   - Open `psql` and create the database:
     ```sql
     CREATE DATABASE diary_note_db;
     ```

5. Configure database connection in `application.properties`:

   - Open `src/main/resources/application.properties` and add the following configuration:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/diary_note_db
     spring.datasource.username=your-username
     spring.datasource.password=your-password
     spring.datasource.driver-class-name=org.postgresql.Driver
     spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
     spring.jpa.hibernate.ddl-auto=update
     ```

   Replace `your-username` and `your-password` with your PostgreSQL credentials.

6. Build the Spring Boot application using Maven:
   ```bash
   mvn clean install
   ```

7. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`.

---

### Setting up the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd DiaryNote-WebApp/Frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

---

## API Endpoints

### 1. **Create a Note**
- **POST** `/api/notes`
- **Request Body**:
  ```json
  {
    "title": "Your Note Title",
    "content": "Your note content here."
  }
  ```
- **Response**: 
  ```json
  {
    "id": 1,
    "title": "Your Note Title",
    "content": "Your note content here."
  }
  ```

### 2. **Get All Notes**
- **GET** `/api/notes`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Your Note Title",
      "content": "Your note content here."
    },
    {
      "id": 2,
      "title": "Another Note",
      "content": "More content here."
    }
  ]
  ```

### 3. **Update a Note**
- **PUT** `/api/notes/{id}`
- **Request Body**:
  ```json
  {
    "title": "Updated Note Title",
    "content": "Updated content here."
  }
  ```

### 4. **Delete a Note**
- **DELETE** `/api/notes/{id}`
- **Response**: 
  ```json
  {
    "message": "Note deleted successfully."
  }
  ```

You can add each section in your `README.md` file to clearly define each API endpoint.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [PostgreSQL](https://www.postgresql.org/)
