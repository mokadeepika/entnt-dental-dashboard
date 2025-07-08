# 🦷 ENTNT Dental Center Management Dashboard

A fully responsive frontend dashboard built with **React**, **Redux Toolkit**, **TailwindCSS**, and **localStorage** for ENTNT's dental center simulation. Supports both Admin (Dentist) and Patient roles.

---

## 📦 Tech Stack

- **React** (CRA - Create React App)
- **Redux Toolkit** (with Thunks)
- **React Router v6**
- **TailwindCSS**
- **Jest** for unit testing
- **localStorage** for data persistence
- **No backend or external API used**

---

## 👥 User Roles

- **Admin** (`admin@entnt.in` / `admin123`)
  - Full access: Patients, Incidents, Calendar, Dashboard
- **Patient** (`john@entnt.in` / `patient123`)
  - View-only access: their own appointments, treatment history & uploads

---

## ✨ Features

### ✅ Authentication (Simulated)

- Hardcoded users with session stored in localStorage
- Role-based frontend routing with protected views

### 🧑‍⚕️ Patient Management (Admin Only)

- View, Add, Edit, Delete patients
- Includes DOB, contact info, and health info

### 📅 Appointment / Incident Management (Admin Only)

- Per-patient incidents
- Fields: title, description, comments, datetime, cost, status, file uploads

### 📆 Calendar View (Admin Only)

- View all upcoming appointments monthly
- Click any day to view scheduled incidents

### 📊 Dashboard (Admin)

- Summary of top patients, revenue, and next appointments

### 🙋‍♂️ Patient Portal (Patient Only)

- View only their appointments and treatment files

### 💾 Local Storage Simulation

- All users, patients, and incidents stored via localStorage
- Files saved as base64 strings

---

## 🧰 Setup & Run

Install dependencies:

```bash
npm install
npm start
```
