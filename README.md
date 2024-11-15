# Contact Management - Mini CRM Feature

This project is a mini feature of a CRM system designed to manage customer/client contact information. It allows users to perform CRUD (Create, Read, Update, Delete) operations on contacts and provides an intuitive UI for seamless interaction.

---

## Features

- Add new contacts with details like First Name, Last Name, Email, Phone Number, Company, and Job Title.
- View all contacts in a paginated and sortable table.
- Edit and update contact details as needed.
- Delete outdated or duplicate contact entries.
- Backend API for managing contact data with proper error handling.

---

## Technology Stack

- **Frontend:** React.js with Material UI (MUI)
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (Mongoose as ODM)
- **Hosting:** 
  - Frontend: [Vercel](https://erino-crud-frontend.vercel.app/)
  - Backend: [Render](https://render.com)

---

## Setup Instructions

### Prerequisites
1. Node.js (v16 or higher)
2. MongoDB installed locally or a MongoDB Atlas connection URI.

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/contact-management-crm.git
cd contact-management-crm
```
### 2. Backend Setup
------------------------------------
1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the backend directory and add the following variables:
```bash
PORT=3000
MONGO_URI=<your-mongodb-connection-uri>
```
4. Start the backend server:
```bash
nodemon app.js


