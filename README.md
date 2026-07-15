# HireForge AI

An AI-powered resume analyzer built with Spring Boot that helps users get ATS scores and identify missing skills from their resumes.

---
## Live Demo
API Base URL: `https://hireforge-ai-production.up.railway.app`

---

## Features

- User registration and login with JWT-based authentication
- Secure password hashing using BCrypt
- Resume upload support for PDF and DOCX formats
- Text extraction using Apache PDFBox and Apache POI
- AI-powered ATS scoring and missing skills analysis via Google Gemini API
- Global exception handling with clean JSON error responses
- Protected endpoints secured with Spring Security filter chain

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 4.x |
| Security | Spring Security + JWT (jjwt) |
| ORM | Spring Data JPA + Hibernate |
| Database | MySQL |
| File Parsing | Apache PDFBox 3.0.3, Apache POI 5.3.0 |
| AI Integration | Google Gemini API (gemini-2.5-flash) |
| Build Tool | Maven |

---

## Project Structure

```
src/main/java/com/hireforge/hireforge_ai/
├── common/
│   └── dto/
├── config/
├── resume/
│   ├── controller/
│   ├── dto/
│   └── service/
├── security/
└── user/
    ├── controller/
    ├── dto/
    ├── entity/
    ├── repository/
    └── service/
```

---

## Getting Started

### Prerequisites

- Java 17+
- MySQL 8.x
- Maven
- Google Gemini API key (free tier available at [Google AI Studio](https://aistudio.google.com))

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Akhilesh9911/hireforge-ai.git
cd hireforge-ai
```

2. Create a MySQL database:
```sql
CREATE DATABASE hireforge_db;
```

3. Set the following environment variables (or configure in your IDE run configuration):
    DB_USERNAME=your_mysql_username
    DB_PASSWORD=your_mysql_password
    JWT_SECRET=your_jwt_secret_key
    GEMINI_API_KEY=your_gemini_api_key

4. Run the application:
```bash
mvn spring-boot:run
```

The server starts on `http://localhost:8080`

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |

### Resume

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/resume/upload` | Upload PDF/DOCX resume for AI analysis | Yes (Bearer token) |

---

## Environment Variables

| Variable | Description |
|---|---|
| `DB_USERNAME` | MySQL database username |
| `DB_PASSWORD` | MySQL database password |
| `JWT_SECRET` | Secret key for JWT signing (min 32 characters) |
| `GEMINI_API_KEY` | Google Gemini API key |

---

## Author

**Akhilesh Chitare**
- GitHub: [@Akhilesh9911](https://github.com/Akhilesh9911)
- LinkedIn: [linkedin.com/in/akhilesh00](https://linkedin.com/in/akhilesh00)