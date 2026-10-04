# Environment Configuration

Local environment files must not contain production credentials or be reused across environments.

## Admin UI

Create `admin-ui/.env` locally with these variables:

- `PORT` - local development port, normally 3001
- `REACT_APP_SERVER_URL` - URL of the API server, normally `http://localhost:3000`

## Server

The server uses these variables:

- `BCRYPT_SALT` - bcrypt cost factor
- `COMPOSE_PROJECT_NAME` - Docker Compose project name
- `PORT` - API listen port
- `JWT_SECRET_KEY` - JWT signing secret; use a unique random value outside development
- `JWT_EXPIRATION` - JWT lifetime
- `DB_URL` - PostgreSQL connection URL
- `DB_USER` - PostgreSQL user
- `DB_PASSWORD` - PostgreSQL password
- `DB_PORT` - PostgreSQL host port
- `DB_NAME` - PostgreSQL database name

The repository currently contains legacy development `.env` files from the original project. They contain development defaults, but they should be replaced by tracked examples and removed from version control in the next configuration-hardening change.

Never commit real credentials or production configuration.
