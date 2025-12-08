# Tic Tac Toe 95

 👋 Howdy! Tic Tac Toe 95 is a Vite-React project coupeled with express API to allow users that ability to play tic tac toe. The project is meant to be minimal but does incluide some creative freedoms to build a more fun / retro UI. From within this project you can: 

- Create a new Tic Tac Toe game session
- Play a 3x3 square Tic Tac Toe game
- Track all games played along with status & winner 
- Load previous games both in progress and completed games
- Easter egg: Learn more about Tom (that's me!)

This project assumes you have Docker / Docker compose installed and running on your machine.

📢 **Shoutouts!** 🙏 This project uses a few public packages to bring to life the UI & overall nostaliga. Big thanks to:
https://github.com/trapd00r/win95-winxp_icons/tree/master for the creation of many icons used on my site and https://www.npmjs.com/package/react95 for the amazing component library.


## Quick Start (run from root)
1. Copy envs  
```bash
cp frontend/.env.example frontend/.env
cp api/.env.example api/.env
```

2. Build & Run everything

> Easiest path is with docker, but feel free to also run dev from both api and frontend. Instructions in each README

```bash
docker compose up -d
```
3) App opens at http://localhost:5173
4) Double click on the tic tac toe icon to play!

## What’s Inside
- **frontend/**: Vite + React (React95 UI)
- **api/**: Node API for game sessions

## Use of AI

Throughout the project, when I delegated new code creation I flagged it in comments with `//LLM NOTE:`. 

Examples of where I used an LLM to support this project: 

- All things datetimes
- Boilerplate files (e.g. small repeatable established patterns, some docker work)
- CSS Changers / Component Fixes
- Nuanes with React95 Components
