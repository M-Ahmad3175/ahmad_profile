**Backend Review**

Overview: concise checklist and recommendations to validate the current Express/Mongo backend before starting the React frontend.

- **Project Structure**: Keep `server/` focused on API logic and `client/` for React. Ensure clear subfolders: `controllers/`, `services/`, `models/`, `routes/`, `middleware/`, `config/`, `utils/`, `validators/`. Avoid mixing frontend assets under `server/`.

- **Naming Conventions**: Use `PascalCase` for model names (e.g., `Profile.js`), `camelCase` for functions and variables, `kebab-case` or `camelCase` for filenames consistently (choose one). Export modules via `module.exports = { ... }` for services.

- **Error Handling**: Ensure a single global error handler in `server/app.js` that normalizes errors to `{statusCode, message, details}`. Map known errors (validation, Multer, Cloudinary, DB) to appropriate status codes. Avoid throwing raw Error objects without `statusCode`.

- **Validation**: Validate and sanitize all incoming data at the route boundary using a library (recommended: `Joi` or `express-validator`). Keep validators in `validators/` and return clear messages for clients. Validate file types and sizes in upload middleware (`middleware/uploadMiddleware.js`).

- **Security**:
  - Add `helmet` for secure headers.
  - Add `express-rate-limit` on auth and public endpoints (e.g., login, register, upload) to mitigate brute force.
  - Use `cors` with explicit allowed origins for the frontend (do not use `*` in production).
  - Store JWT secret in env and send tokens in HttpOnly, Secure cookies with `SameSite=Lax`/`Strict` as appropriate.
  - Hash passwords with `bcrypt` (salt rounds configurable via env).
  - Sanitize inputs to prevent NoSQL injection (e.g., block `$` operators) and XSS on any stored HTML.
  - Restrict file upload types and sizes. Scan or verify file contents where possible.

- **Logging**:
  - Use `morgan` for request logging in development.
  - Use a production logger (`winston` or `pino`) with level-based, JSON-formatted logs and log rotation.
  - Include correlation/request IDs on logs for tracing.
  - Avoid leaving `console.log` in production code; use logger instead.

- **Environment variables**:
  - Provide `.env.example` with all required keys: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NODE_ENV`, etc.
  - Validate required env vars on startup and exit with a clear message if missing.

- **.gitignore**: Ensure `.env`, `node_modules/`, `uploads/`, `.DS_Store`, `logs/`, and IDE files are ignored. Confirm `uploads/` (if used) isn't accidentally committed.

- **Code Quality**:
  - Add ESLint and Prettier configs and run lint in CI.
  - Add unit tests for services and integration tests for controllers (recommended: Jest + Supertest).
  - Keep controllers thin (call services), put business logic in `services/`.
  - Remove commented/dead code and temporary diagnostic logs.

- **Deployment Readiness**:
  - Add a health endpoint (e.g., `GET /api/v1/health`) for readiness/liveness probes.
  - Provide `start` and `start:prod` scripts in `server/package.json`.
  - Add a `Dockerfile` (multi-stage) and `docker-compose` for local integration with MongoDB if deploying with containers.
  - Ensure graceful shutdown handling for DB connections on `SIGTERM`/`SIGINT`.
  - Create `Procfile` if deploying to Heroku; add CI (GitHub Actions) to run lint/test and build.

- **Other Recommendations**:
  - Centralize third-party service logic under `services/` (Cloudinary, email) and attach meaningful error `statusCode`/`code` when rethrowing.
  - Ensure CORS and cookie settings match client origin and deployment (dev vs prod).
  - Keep secrets out of repo and grant least-privilege to cloud resources.

Action items (short-term):

- Add `helmet`, `express-rate-limit`, and `cors` config in `server/app.js`.
- Add `morgan` + production logger (`winston`) and replace `console.log` uses.
- Add `.env.example` and env validation at startup.
- Add `Dockerfile` and `health` route.
- Add linting and basic tests; run in CI.

If you'd like, I can implement the top 5 action items now (add security middlewares, logging, `.env.example`, health route, and Dockerfile).
