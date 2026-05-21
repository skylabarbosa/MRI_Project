# NeuroTwinX

NeuroTwinX is a separate website and hardware bridge folder that can live beside the main Unity project in the same GitHub repository.

## Folder Layout

- `frontend/` - React + Vite website that can be deployed to GitHub Pages.
- `backend/` - Express and WebSocket service for Arduino/demo readings.
- `arduino/` - Arduino sketch for the stress monitor.

## Run Locally

Install and start the frontend:

```bash
cd neurotwinx/frontend
npm ci
npm run dev
```

Install and start the backend:

```bash
cd neurotwinx/backend
npm ci
cp .env.example .env
npm run dev
```

For demo data, set `DEMO_MODE=true` in `backend/.env`. For Arduino data, set `ARDUINO_PORT` to your board port.

## GitHub Pages

The workflow at `.github/workflows/deploy-neurotwinx.yml` builds `neurotwinx/frontend` and publishes `frontend/dist` to GitHub Pages.

After pushing to GitHub:

1. Open the repository settings.
2. Go to `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Run or wait for the `Deploy NeuroTwinX Website` workflow.

The public frontend link will appear in the workflow summary and in the repository `Pages` settings.

Note: GitHub Pages hosts the frontend only. The backend must run separately for live Arduino/WebSocket data; the current app can still use demo/client-side behavior where available.
