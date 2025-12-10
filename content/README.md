# Content Directory

This directory contains content managed by [Pages CMS](https://pagescms.org).

## Files

- **about.json** - Content for the "About Tom" window
- **settings.json** - Site-wide settings and configuration

## Editing Content

### Using Pages CMS (Recommended)

1. Visit [https://app.pagescms.org](https://app.pagescms.org)
2. Log in with your GitHub account
3. Navigate to this repository and branch
4. Use the user-friendly interface to edit content
5. Changes are automatically committed to the repository

### Manual Editing

You can also edit the JSON files directly in this directory. After making changes:

```bash
# Copy content to frontend
cp -r content/ frontend/public/

# Or run the build/dev scripts which do this automatically
cd frontend
npm run dev
# or
npm run build
```

## Content Schema

Content is validated against the schema defined in `.pages.yml` at the repository root.

### About Content (`about.json`)

```json
{
  "title": "string",
  "introduction": "string",
  "background": "string",
  "experience": {
    "title": "string",
    "items": ["string array"]
  },
  "interests": {
    "title": "string",
    "items": ["string array"]
  },
  "contact": {
    "email": "email@example.com",
    "github": "username"
  }
}
```

### Site Settings (`settings.json`)

```json
{
  "siteName": "string",
  "description": "string",
  "startupImage": "/path/to/image.jpg",
  "backgroundImage": "/path/to/image.jpg",
  "features": {
    "enableSounds": false,
    "enableAnimations": true,
    "maxStoredGames": 100
  }
}
```
