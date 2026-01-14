📚 BookWorm – Personalized Book Recommendation & Reading Tracker (Backend)

BookWorm is a RESTful backend API built with Express.js and MongoDB that powers a personalized book discovery and reading tracker platform.
It supports role-based access (Admin & User), reading progress tracking, review moderation, and personalized book recommendations.

This backend is designed to work seamlessly with a Next.js frontend and follows clean architecture and modular structure.

🚀 Live API

👉 Base URL: https://your-server-url.com

🧠 Key Features
🔐 Authentication & Authorization

JWT-based authentication (httpOnly cookies)

Secure password hashing

Role-based access control (Admin / User)

Protected routes (no public access)

👨‍💼 Admin Features

Manage Books (Create, Update, Delete)

Manage Genres

Manage Users & Roles

Moderate Reviews (Approve/Delete)

Manage Tutorials (YouTube embeds)

View platform stats (extendable)

👤 User Features

Personal Library with 3 shelves:

Want to Read

Currently Reading

Read

Reading progress tracking

Write reviews & ratings

Personalized book recommendations

Book search & filters

🗂️ Project Structure
BOOKWORM-SERVER
├── node_modules/
├── src/
│   ├── modules/
│   │   ├── auth/                       # Registration & Login logic
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.router.ts
│   │   │   └── auth.service.ts
│   │   ├── book/                       # Book CRUD & Search
│   │   │   ├── book.controller.ts
│   │   │   ├── book.router.ts
│   │   │   └── book.service.ts
│   │   ├── genre/                      # Category Management
│   │   │   ├── genre.controller.ts
│   │   │   ├── genre.router.ts
│   │   │   └── genre.service.ts
│   │   ├── recommendation/             # Aggregation pipelines for personalized feeds
│   │   │   ├── recommendation.controller.ts
│   │   │   ├── recommendation.router.ts
│   │   │   └── recommendation.service.ts
│   │   ├── reviews/                    # User reviews & Admin moderation
│   │   │   ├── review.controller.ts
│   │   │   ├── review.router.ts
│   │   │   └── review.service.ts
│   │   ├── shelves/                    # Reading tracker (Want/Current/Read)
│   │   │   ├── shelves.controller.ts
│   │   │   ├── shelves.router.ts
│   │   │   └── shelves.service.ts
│   │   ├── user/                       # Admin User Management (Promote/Demote)
│   │   │   ├── user.controller.ts
│   │   │   ├── user.router.ts
│   │   │   └── user.service.ts
│   │   ├── tutorials/                  # Admin YouTube link management
│   │   │   ├── tutorial.controller.ts
│   │   │   ├── tutorial.router.ts
│   │   │   └── tutorial.service.ts
│   │   └── stats/                      # Dashboard charts data (Aggregation)
│   │       ├── stats.controller.ts
│   │       ├── stats.router.ts
│   │       └── stats.service.ts
│   ├── shared/                         # Global utilities & configurations
│   │   ├── config/                     # Database connection & Env variables
│   │   │   └── db.ts
│   │   ├── middleware/                 # Authentication & Role guards
│   │   │   ├── auth.middleware.ts      # verifyToken
│   │   │   └── admin.middleware.ts     # verifyAdmin
│   │   └── utils/                      # Global error handlers or helper functions
│   ├── app.ts                          # Main Express application setup
│   └── index.ts                        # Server entry point (starts the server)
├── .env                                # Sensitive environment variables
├── .gitignore                          # Ignored files (node_modules, .env)
├── package-lock.json
├── package.json                        # Scripts & dependencies
├── tsconfig.json                       # TypeScript compiler settings
└── readme.md                           # Documentation for the project

🗃️ Database Models
User
{
name,
email,
passwordHash,
photoURL,
role: "admin" | "user",
createdAt
}

Genre
{
name,
createdAt
}

Book
{
title,
author,
genreId,
description,
coverImage,
totalPages,
avgRating,
ratingCount,
shelvesCount,
createdAt
}

UserBooks (Reading Tracker)
{
userId,
bookId,
shelf: "want" | "current" | "read",
progress: {
pagesRead,
percentage
},
userRating,
finishedAt,
updatedAt
}

Review
{
userId,
bookId,
rating,
text,
status: "pending" | "approved",
likes,
createdAt
}

Tutorial
{
title,
youtubeUrl,
createdAt
}

🔐 Authentication Routes
Method Route Description
POST /auth/register User registration
POST /auth/login User login
GET /auth/me Get logged-in user

✔ Password hashing
✔ Duplicate email validation
✔ Role stored in JWT

👨‍💼 Admin Routes
Books
Method Route
POST /admin/books
GET /admin/books
PATCH /admin/books/:id
DELETE /admin/books/:id
Genres
Method Route
POST /admin/genres
GET /admin/genres
PATCH /admin/genres/:id
Users
Method Route
GET /admin/users
PATCH /admin/users/:id/role
Reviews
Method Route
GET /admin/reviews?status=pending
PATCH /admin/reviews/:id/approve
DELETE /admin/reviews/:id
Tutorials
Method Route
POST /admin/tutorials
GET /tutorials
DELETE /admin/tutorials/:id
📚 User Library & Reading Tracker
Add Book to Shelf
POST /user-books

Creates new entry or updates existing shelf

Move Between Shelves
PATCH /user-books/:id

Update Reading Progress
PATCH /user-books/:id/progress

Logic:

Calculates percentage automatically

Auto-moves book to Read when completed

My Library
GET /user-books?shelf=want
GET /user-books?shelf=current
GET /user-books?shelf=read

⭐ Reviews System
Submit Review
POST /reviews

Default status: pending

View Reviews on Book Details
GET /reviews/:bookId

Shows only approved reviews

🎯 Personalized Recommendations
GET /recommendations

Recommendation Logic:

Count books in Read shelf

If < 3 → fallback to popular + random books

Analyze:

Most read genres

Average user rating

Recommend books:

Same genres

High community ratings

Not already read

Add explanation:

“Matches your preference for Mystery (4 books read) and high-rated reviews”

🔍 Search & Filters
GET /books?search=&genres=&rating=&sort=

Search by title or author

Filter by genres (multi-select)

Filter by rating range

Sort by rating or popularity

⚙️ Environment Variables
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret

🛠️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Cloudinary (for images – optional)

📌 Development Notes

Modular MVC architecture

Centralized error handling

Clean, readable code

Easily extendable for analytics & charts

🏁 Final Notes

This backend is built to meet Programming Hero Job Task requirements, focusing on:

Clean architecture

Real-world logic

Scalability

Maintainability





🚀 API Endpoints Documentation
🔐 Authentication
MethodEndpointDescriptionAccessPOST/api/auth/registerRegister a new user with profile photoPublicPOST/api/auth/loginLogin and receive JWT tokenPublic📚 Book ManagementMethodEndpointDescriptionAccessGET/api/booksGet all books (supports search/filter/sort)User/AdminPOST/api/books/create-bookAdd a new book to the systemAdminPATCH/api/books/update-book/:idUpdate existing book detailsAdminDELETE/api/books/delete-book/:idRemove a book from the databaseAdmin📂 Genre ManagementMethodEndpointDescriptionAccessGET/api/genresFetch all available book categoriesUser/AdminPOST/api/genres/create-genreCreate a new book categoryAdmin✍️ Review SystemMethodEndpointDescriptionAccessPOST/api/review/review-postSubmit a book review (Status: Pending)UserGET/api/review/pendingView all reviews awaiting approvalAdminPATCH/api/review/approve/:idApprove a pending reviewAdmin📖 Reading Tracker (Shelves)MethodEndpointDescriptionAccessPOST/api/shelves/add-to-shelfAdd book to Want/Current/Read shelfUserPATCH/api/shelves/update-progressUpdate pages read & auto-completeUser🤖 Personalized Features & StatsMethodEndpointDescriptionAccessGET/api/recomendationGet AI-style book suggestionsUserGET/api/stats/user-overviewGet dashboard reading statisticsUser👥 User & Tutorial ManagementMethodEndpointDescriptionAccessPATCH/api/user/update-rolePromote/Demote user rolesAdminPOST/api/tutorialsAdd YouTube tutorial/review linksAdminGET/api/tutorialsView embedded book tutorialsUser/Admin