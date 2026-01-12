server/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.service.js      <-- Business logic goes here
│   │   │   └── auth.middleware.js   <-- Module-specific middleware
│   │   ├── books/
│   │   │   ├── book.model.js
│   │   │   ├── book.controller.js
│   │   │   ├── book.routes.js
│   │   │   └── book.service.js
│   │   └── reviews/
│   │       ├── review.model.js
│   │       ├── review.controller.js
│   │       └── review.routes.js
│   ├── shared/                   # Global resources
│   │   ├── config/               # db.js
│   │   ├── middleware/           # Global auth/error handlers
│   │   └── utils/                # General helpers
│   └── index.js
├── .env
└── package.json