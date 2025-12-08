# API

Basic express API for Tic Tac Toe game sessions (MongoDB-backed).

## Setup
```bash
cp .env.example .env
npm install
```

## Run (dev)
```bash
npm run start:dev
```

## Routes (examples)
- **GET `/health`** — service status  
  ```bash
  curl http://localhost:3001/health
  ```
- **GET `/api/game-sessions`** — list sessions  
  ```bash
  curl http://localhost:3001/api/game-sessions
  ```
- **POST `/api/game-sessions`** — create session  
  ```bash
  curl -X POST http://localhost:3001/api/game-sessions \
    -H "Content-Type: application/json" \
    -d '{"board":[null,null,null,null,null,null,null,null,null],"currentPlayer":"X","status":"in_progress"}'
  ```
- **GET `/api/game-sessions/:id`** — fetch one  
  ```bash
  curl http://localhost:3001/api/game-sessions/<id>
  ```
- **PUT `/api/game-sessions/:id`** — update/upsert  
  ```bash
  curl -X PUT http://localhost:3001/api/game-sessions/<id> \
    -H "Content-Type: application/json" \
    -d '{"board":["X","O",null,"X",null,null,null,null,null],"status":"in_progress"}'
  ```
