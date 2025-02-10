# KYC Backend Service 🔐

## Prerequisites 📋

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kyc-backend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database Configuration
DATABASE_URL=mysql://user:password@localhost:3306/database_name

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
```

### 4. Database Setup

Run database migrations:

```bash
npm run db:generate
npm run db:migrate
```

To seed the database with initial data:

```bash
npm run db:seed
```

This will create:

- An admin user (email: admin@example.com, password: admin123)
- Several random users for testing

### 5. Start the Server

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm run build
npm start
```

## Available Scripts 📝

- `npm run build` - Builds the project for production
- `npm start` - Starts the production server
- `npm run dev` - Starts the development server with hot-reload
- `npm run db:generate` - Generates database migrations
- `npm run db:migrate` - Runs database migrations
- `npm run db:seed` - Seeds the database with initial data
- `npm run format` - Formats code using Prettier
