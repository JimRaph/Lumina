## Lumina E-commerce Platform

---

## Overview

The **Lumina Platform** is a modern, full-stack e-commerce solution designed for seamless online shopping and efficient internal administration.

This project utilizes a **monorepo** structure, housing the public storefront, the dedicated administrative panel, and the central Node.js API. This architecture allows for unified development, state management, and clear separation of concerns between user-facing, management, and data layers.

---

## Architecture

The project is divided into three top-level directories, representing a classic three-tier architecture:


| **`admin/`** | **Administration Dashboard** | Inventory management, product addition/editing, updating order/purchase states, and administrative content control. |
| **`frontend/`** | **Public Storefront** | User authentication, product browsing, cart management, and checkout process (the actual e-commerce application). |
| **`backend/`** | **API & Data Layer** | Handling core business logic, user/admin authentication, payment processing, and database interactions. |

---

## Tech Stack

### Frontend & Admin Applications (`admin/`, `frontend/`)

Both client applications are built on a highly modern, component-based, and performant stack:


- | **Framework** | *React* | Component-based UI development. |
- | **Build Tool** | *Vite* | Fast development, hot module replacement, and optimized bundling. |
- | **Styling** | *Tailwind CSS* | Utility-First CSS framework for responsive and themed design. |
- | **Routing** | *React Router DOM* | Declarative navigation between pages. |
- | **State** | *React Hooks* | Local state management (`useState`, `useEffect`). |
- | **API Client** | *Axios* | Handling HTTP requests to the backend API. |
- | **Feedback** | *React Toastify* | User notification system (alerts, success messages). |

### Backend API (`backend/`)

The core logic and data security are handled by a robust, scalable Node.js server:


- | **Runtime** | *Node.js* | Server-side environment for executing JavaScript. 
- | **Framework** | *Express* | Minimalist web application framework for building APIs. 
- | **Payments** | *Stripe* | Secure integration for handling all e-commerce transactions. 
- | **Authentication** | *jsonwebtoken* | Creating and verifying JWT tokens for secured routes. 
- | **Security** | *bcrypt* | Hashing passwords for secure storage in the database. 
- | **Media** | *Cloudinary* & *Multer* | Handles file upload 
- | **Dev Tool** | *Nodemon* | Automatically restarts the Node application when file changes are detected. 

---

## Key Features (Admin Dashboard)

The `admin/` application is designed for maximum administrative efficiency and responsiveness:

1.  **Full Inventory Control:** Features for adding, listing, and managing products with immediate visibility updates on the public storefront.
2.  **Responsive UI:** The dashboard employs a desktop-first approach for complex tasks (forms, tables) but remains functional on mobile:
    * **Collapsible Sidebar:** Navigation switches to a hidden off-canvas drawer on small screens.
    * **Responsive Tables:** Detailed tables (`List.jsx`) transform into a scannable Stacked Card View on mobile devices.
3.  **Order State Management:** Allows administrators to track and update the state of purchases (e.g., pending, processing, delivered).

---

## Environment Variables

The project requires the following environment variables to be set up:

### Backend (`backend/.env` file)

- `MONGO_URI` 
- `CLOUDINARY_NAME` 
- `CLOUDINARY_API_KEY` 
- `CLOUDINARY_API_SECRET`
- `JWT_SECRET_KEY` 
- `ADMIN_PASSWORD` - Default password (Development)`QWERTYQWERTY`
- `ADMIN_EMAIL` - Default email (Development) - `admin@info.com` 
- `STRIPE_SECRET_KEY` 
- `STRIPE_WEBHOOK_SECRET` 
- `PORT` - default - 4000
- `FRONTEND_URL` - default - 5173
- `ADMIN_URL` - default - 5174

### Frontend and Admin (`frontend/.env` and `admin/.env` files)

 `VITE_BACKEND_URL`

---

## Getting Started

### Prerequisites

You must have **Node.js** (including npm or yarn) installed on your development machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JimRaph/Lumina.git
    cd lumina
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies (for both admin and public apps):**
    ```bash
    cd ../admin
    npm install
    cd ../frontend
    npm install
    ```

4.  **Configuration:**
    Create the necessary `.env` files in each directory (`backend`, `admin`, `frontend`) and populate them with the required variables listed above.

### Running the Platform

You will need three separate terminal instances to run the entire system:

1.  **Run Backend API (API/Server):**
    ```bash
    cd backend
    npm run server  
    ```

2.  **Run Admin Dashboard (Admin Panel):**
    ```bash
    cd admin
    npm run dev
    ```

3.  **Run Public Storefront (E-commerce Site):**
    ```bash
    cd frontend
    npm run dev
    ```

The platform will now be running, typically accessible through separate ports on `http://localhost`.
