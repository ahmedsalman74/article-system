
# Article System API

![Schema Design](./assets/schema-design.png)

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Schema Design](#schema-design)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
  - [Development](#development)
  - [Production](#production)
- [Package Scripts](#package-scripts)
- [API Documentation](#api-documentation)
- [Host URL](#host-url)
- [Contributing](#contributing)
- [License](#license)

## Description

The **Article System API** is a backend application built with [NestJS](https://nestjs.com/) that allows users to create, manage, and interact with articles. It leverages [Supabase](https://supabase.com/) as its PostgreSQL database, providing a robust and scalable solution for data management. The API supports user authentication, article creation, commenting, and liking functionalities, ensuring a comprehensive platform for content management.

## Features

- **User Authentication:** Secure registration and login using JWT.
- **Article Management:** Create, read, update, and delete articles.
- **Comments:** Add and manage comments on articles.
- **Likes:** Like and unlike articles.
- **Role-Based Access Control:** Define permissions using CASL.
- **API Documentation:** Interactive API docs using Swagger.
- **Environment Configuration:** Manage settings using environment variables.

## Technologies Used

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Database:** [Supabase PostgreSQL](https://supabase.com/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Authentication:** [JWT](https://jwt.io/) (JSON Web Tokens)
- **Authorization:** [CASL](https://casl.js.org/)
- **API Documentation:** [Swagger](https://swagger.io/)
- **Validation:** [Class-Validator](https://github.com/typestack/class-validator)
- **Linting:** [ESLint](https://eslint.org/)
- **Formatting:** [Prettier](https://prettier.io/)
- **Testing:** [Jest](https://jestjs.io/)

## Schema Design

![Schema Design](./assets/schema-design.png)

*Figure: Database schema outlining the relationships between Users, Articles, Comments, and Likes.*

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/ahmedsalman74/article-system.git
```
```bash
cd article-system
```

### Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory of the project and configure the necessary environment variables.

#### Sample `.env` File

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:your_actual_password@db.bpdnxadhcaavkfhmosvd.supabase.co:5432/postgres

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=60m
```

**Notes:**

- **DATABASE_URL:** Replace `[your_actual_password]` with your actual Supabase PostgreSQL password. Ensure there are no square brackets or extra characters.

  ```
  DATABASE_URL=postgresql://postgres:your_actual_password@db.bpdnxadhcaavkfhmosvd.supabase.co:5432/postgres
  ```

- **JWT_SECRET:** Replace `your_jwt_secret` with a strong secret key used for signing JWT tokens.

- **JWT_EXPIRES_IN:** Token expiration time (e.g., `60m` for 60 minutes).

**Security Note:** Ensure that your `.env` file is included in `.gitignore` to prevent exposing sensitive information.

```bash
echo ".env" >> .gitignore
```

## Running the Project

### Development

To run the application in development mode with hot-reloading:

```bash
npm run start:dev
```

**Access the Application:**

- **API Base URL:** `http://localhost:3000`
- **Swagger API Docs:** `http://localhost:3000/api`

### Production

To build and run the application in production mode:

1. **Build the Project:**

   ```bash
   npm run build
   ```

2. **Start the Application:**

   ```bash
   npm run start:prod
   ```

**Access the Application:**

- **API Base URL:** `http://localhost:3000`
- **Swagger API Docs:** `http://localhost:3000/api`

*Replace `http://localhost:3000` with your production server's address if different.*


## API Documentation

The project includes interactive API documentation generated by Swagger.

**Access Swagger UI:**

- **URL:** `http://localhost:3000/api`

**Swagger Features:**

- **Authentication:** Test secured endpoints by providing JWT tokens.
- **Endpoints Overview:** Browse through all available API endpoints with detailed descriptions.
- **Try It Out:** Execute API requests directly from the browser.

## Host URL

Once the application is running, you can access it via:

- **Local Development:**
  - **Base URL:** `http://localhost:3000`
  - **Swagger API Docs:** `http://localhost:3000/api`

- **Production Deployment:**
  - **Base URL:** `https://your-production-domain.com`
  - **Swagger API Docs:** `https://your-production-domain.com/api`

*Replace `https://your-production-domain.com` with your actual deployed domain.*

## Contributing

Contributions are welcome! Please follow the steps below to contribute to this project.

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add YourFeature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

## License

This project is licensed under the [MIT License](./LICENSE).

---

**Thank you for using the Article System API! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.**
```

