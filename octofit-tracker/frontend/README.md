# OctoFit Tracker frontend

React 19 presentation tier for OctoFit Tracker, built with Vite, React Router, and Bootstrap.

## Run locally

Start the backend API on port `8000`, then run:

```sh
npm run dev
```

When `VITE_CODESPACE_NAME` is unset, the frontend uses `http://localhost:8000`.

## GitHub Codespaces API URL

In Codespaces, Vite forwards `CODESPACE_NAME` into `import.meta.env.VITE_CODESPACE_NAME` automatically. To set or override the name explicitly, define it in `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend constructs the API URL as
`https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. If the variable is unset, the frontend uses `http://localhost:8000`. Restart the Vite dev server after changing `.env.local`.
