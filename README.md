# Raja-Mantri-Chor-Sipahi-Backend
# Raja–Mantri–Chor–Sipahi Backend 🎮

A RESTful backend implementation of the classic Indian game **Raja–Mantri–Chor–Sipahi**, built using **Node.js and Express**.  
The backend handles room management, role assignment, secure role visibility, guessing logic, and scoring.  
No frontend is required — the APIs are fully testable using **Postman**.

---

## 🚀 Features

- Create and join game rooms
- Maximum 4 players per room
- Random role assignment after all players join
- Private role visibility (each player sees only their own role)
- Guess phase where **Mantri** guesses the **Chor**
- Automatic scoring based on game rules
- Final result reveal with roles and points
- Clean and modular backend structure

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js  
- **Language**: JavaScript  
- **Database**: In-memory data store (for simplicity)  
- **Testing Tool**: Postman  

> Note: A database like MongoDB or Redis can be easily integrated if persistence or scalability is required.

---

## 📂 Project Structure

raja-mantri-backend/
│
├── server.js
├── routes/
│ └── gameRoutes.js
├── controllers/
│ └── gameController.js
├── utils/
│ └── assignRoles.js
└── README.md


---

## 🎯 Game Rules & Scoring

### Roles
- **Raja** – Observer
- **Mantri** – Must guess the Chor
- **Chor** – Avoid getting caught
- **Sipahi** – Wait for the result

### Default Points
| Role    | Points |
|--------|--------|
| Raja   | 1000   |
| Mantri | 800    |
| Sipahi | 500    |
| Chor   | 0      |

### Scoring Logic
- If **Mantri guesses correctly**:
  - Mantri and Sipahi keep their points
- If **Mantri guesses wrong**:
  - Chor steals Mantri’s points

---

## 🔗 API Endpoints

### Room Management
- `POST /api/room/create` → Create a new room
- `POST /api/room/join` → Join an existing room
- `POST /api/room/assign/:roomId` → Assign roles after 4 players join

### Game Flow
- `GET /api/role/me/:roomId/:playerId` → View your role privately
- `POST /api/guess` → Mantri submits guessed player ID
- `GET /api/result/:roomId` → View final roles and scores

---

## ▶️ How to Run Locally

### 1. Clone the Repository
git clone https://github.com/your-username/raja-mantri-backend.git
cd raja-mantri-backend

2. Install Dependencies
npm install

3. Start the Server
node server.js

4.Server will start on:
http://localhost:3000
