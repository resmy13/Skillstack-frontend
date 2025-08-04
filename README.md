SkillStack (Frontend)
This is the frontend of the SkillStack application, built using React.js. The app allows users to track their skill development goals, view progress, and manage resources effectively.

🚀 Features
Authentication Pages: Login & Signup functionality.

Dashboard:

Add, edit, delete, and view skill goals.

Real-time clock display in the navbar.

Integrated calendar for date selection.

Responsive UI: Optimized for desktop and mobile devices.

Protected Routes: Only authenticated users can access the dashboard.

🛠 Tech Stack
React.js (Vite)

TailwindCSS for styling

React Router DOM for routing

Axios for API calls

React Calendar (for date management)

Context API for authentication

⚙️ Setup Instructions
Clone the Repository


git clone <your-frontend-repo-url>
cd skillstack-frontend
Install Dependencies


npm install
Create a .env file (if needed for API endpoint):

VITE_API_URL=http://localhost:5000
Run the Development Server

npm run dev
Access the app at:
http://localhost:5173/

Folder Structure
skillstack-frontend/
│
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # Auth context
│   ├── pages/             # Login, Signup, Dashboard
│   ├── utils/             # API helper (axios instance)
│   └── App.jsx            # Main app entry
│
├── public/                # Static assets
└── package.json
🧑‍💻 Author
Developed by Ann Resmy Joseph