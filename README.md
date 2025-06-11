# Library Management System 📚

**Library Management System** is a web-based platform designed to efficiently manage book inventories,3d library model, user records, and borrowing processes. Built with **React.js+3JS** (frontend) and **PHP** (backend), it offers a seamless experience for both librarians and users.

## 📸 Screenshot

![Library Management Screenshot](./image.png)


## 📱 Features

### User Side
- 📖 Browse and search books
- 📥 Request book borrow/return
- 👤 User authentication & profile management
- 📜 View borrowing history
- Library 3d model (generate from JSON)

### Admin Panel
- 📚 Manage books (add, update, delete)
- 👥 Manage users and permissions
- 📊 Track borrow/return records
- 🔔 Send notifications & reminders
- create and update 3dModel of librry

## 🛠️ Technologies Used
- **Frontend:** React.js, Tailwind CSS,3JS
- **Backend:** PHP, MySQL
- **Database:** MySQL
- **UI:**  CSS

## 🚀 Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/KEvin-Topiya/RLib.git
   ```
2. Set up a local server (XAMPP/LAMP) and configure the database.
3. Install dependencies and start the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. Configure the backend in your PHP environment and import the MySQL database.
5. Run the application and access it via a web browser.

## 🔐 Default Credentials

Use the following default credentials to log in with different roles:

| Role        | Username              | Password      |
|-------------|-----------------------|---------------|
| Admin       | `ADMIN123`            | `VRK`         |
| Librarian   | `EID12345`            | `VRK`         |
| Library     | `lib`                 | `lib`         |
| Student     | `test`                | `123`         |

> 🔒 **Note:** It is strongly recommended to change default passwords after the initial login in a production environment.

## sample Excel File for student and books for upload at admin side in root folder
books.xlsx
students.xslx


## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by Kevin Topiya