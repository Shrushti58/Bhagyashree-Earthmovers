# Bhagyashree Earthmovers

A full-stack MERN website showcasing heavy equipment, services, and projects for Bhagyashree Earthmovers — with admin panel, JWT authentication, and Cloudinary image upload.

---

## 🧩 Project Structure



Bhagyashree-Earthmovers/
├── backend/ ← Node + Express + MongoDB
├── frontend/ ← React + Tailwind
├── .gitignore
├── README.md


---

## 🚀 Features

### ✅ Frontend
✔ Hero, Services, Equipment & Projects sections  
✔ Smooth scrolling navigation  
✔ Responsive UI (Tailwind CSS)  
✔ Contact section with call / WhatsApp / email actions

### ✅ Backend
✔ REST APIs for:
- Services
- Equipment (with specs, availability, price per hour)
- Projects
- Contact Methods & Office Info

✔ Admin JWT authentication (HTTP-only cookies)  
✔ Cloudinary image upload support  
✔ Protected admin routes  

---

## 💻 Tech Stack

**Frontend:** React, Tailwind CSS, Vite  
**Backend:** Node, Express, MongoDB Atlas, Mongoose  
**Auth:** JWT Cookies  
**Storage:** Cloudinary  
**Deploy:** Vercel (frontend), Render/Heroku (backend)

---

## 🛠 Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Shrushti58/Bhagyashree-Earthmovers.git
cd Bhagyashree-Earthmovers

2️⃣ Backend Setup
cd backend
npm install


Create .env in backend/:

PORT=5000
MONGO_URI=your_atlas_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=…
CLOUDINARY_API_KEY=…
CLOUDINARY_API_SECRET=…


Start backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install


Create .env in frontend/:

VITE_API_BASE_URL=http://localhost:5000


Start frontend:

npm run dev

📡 API Endpoints
Route	Method	Auth
/api/services	GET	Public
/api/services/:id	GET	Public
/api/services	POST	Admin
/api/equipment	GET	Public
/api/equipment/:id	GET	Public
/api/equipment	POST	Admin
/api/projects	GET	Public
/api/projects/:id	GET	Public
/api/projects	POST	Admin
/api/contact-methods	GET	Public
/api/office-info	GET	Public
/api/auth/login	POST	Public
/api/auth/logout	POST	Admin
📌 Notes

Make sure to allow your IP in MongoDB Atlas network access

Use HTTP-only cookies for auth in production

Clean admin UI can be built in React

👩‍💻 Author

Shrushti Patil
Intern — Full Stack Developer


---

## ✔ Quick Actions You Should Do Next

### 🔹 1. Push your backend code to the same repo

Make sure:
- `.env` are **NOT committed**
- backend routes work
- Cloudinary connects

---

### 🔹 2. Add Scripts in Root `package.json`

(Optional, for convenience)

```json
"scripts": {
  "start:backend": "cd backend && npm run dev",
  "start:frontend": "cd frontend && npm run dev",
  "dev": "concurrently \"npm run start:backend\" \"npm run start:frontend\""
}


Install concurrently if needed:

npm install --save-dev concurrently

🔹 3. Deploy

Frontend: Vercel
Backend: Render / Railway / Heroku
Atlas: Already hosted