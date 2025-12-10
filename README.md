# Tic Tac Toe 95

 👋 Howdy! Tom Kruger 95 is a personal site built for fun to showcase the greatest UI to ever exist.


📢 **Shoutouts!** 🙏 This project uses a few public packages to bring to life the UI & overall nostaliga. Big thanks to:
https://github.com/trapd00r/win95-winxp_icons/tree/master for the creation of many icons used on my site and https://www.npmjs.com/package/react95 for the amazing component library.


## Quick Start

### Option 1: Docker (run from root)
```bash
docker compose up -d
```
App opens at http://localhost:5173

### Option 2: Local Development
```bash
cd frontend
npm install
npm run dev
```
App opens at http://localhost:5173

Double click on the tic tac toe icon to play!

## Content Management

This project uses [Pages CMS](https://pagescms.org) to manage content like the "About Tom" section and site settings.

### Editing Content

1. Visit [https://app.pagescms.org](https://app.pagescms.org)
2. Log in with your GitHub account
3. Select this repository and branch
4. Edit content directly through the Pages CMS interface

Content is stored in JSON files in the `/content` directory:
- `/content/about.json` - About page content
- `/content/settings.json` - Site-wide settings

The configuration is defined in `.pages.yml` at the root of the repository.

### Local Content Updates

If you edit content files locally, make sure to copy them to the frontend:

```bash
cp -r content/ frontend/public/
```
