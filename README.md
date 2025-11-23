# TinyLink 🚀
TinyLink is a modern, sleek URL shortener built with **Next.js**, **React**, and **Prisma**. It allows you to create, manage, and track short URLs with real-time analytics for clicks like things.

---
## Features ✨
- Create short links with auto-generated or custom codes.  
- View all links in a dashboard with real-time click count updates.  
- Detailed statistics for each link:
  - Target URL  
  - Total clicks  
  - Last clicked timestamp  
  - Created at timestamp  
- Delete links directly from the dashboard.  
- Clean, responsive UI.  
- Notifications for actions (success/error) using `react-hot-toast`.

---

## Environment Variables
DATABASE_URL='Your Database URL'
NEXT_PUBLIC_BASE_URL='Your Website URL'
APP_VERSION = 1.0

---

## API Overview
Method	Endpoint	        Description
POST	/api/links	        Create link (409 if code exists)
GET	/api/links	          List all links 
GET	/api/links/:code	    Stats for one code
DELETE	/api/links/:code	Delete link
GET	/healthz	            returns 200

## Screenshots 🖼️
![alt text](image-1.png)
![alt text](image.png)
![alt text](image-2.png)
![alt text](image-3.png)

---

## Tech Stack 🛠️
- **Frontend:** Next.js (App Router), React, Tailwind CSS  
- **Backend:** Next.js API routes, Prisma ORM  
- **Database:** SQLite/PostgreSQL (via Prisma)  
- **Utilities:** nanoid (for generating unique codes), react-hot-toast (notifications)

---

## Installation & Setup ⚡
1. **Clone the repository**
2. **Install Node Modules and dependencies**
3. **Use 'npm run dev' command to run the project**
