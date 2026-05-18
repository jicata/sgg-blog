# SvetlinGalovBlog

Personal portfolio and blog for Svetlin Galov — senior backend tech lead, agentic-first engineering, .NET, distributed systems.

## Live URL

**TBD** — deploy pending Azure App Service setup (see [First Deploy](#first-deploy) below).

Once deployed, the site will be reachable at `https://<AZURE_WEBAPP_NAME>.azurewebsites.net` (or a custom domain if configured).

## Running Locally

```bash
# 1. Build the SPA first (one-time, or after frontend changes)
cd SvetlinGalovBlog/wwwroot/svetlin-galov-blog
npm install
npm run build

# 2. Start the .NET host (from repo root)
dotnet run --project SvetlinGalovBlog/SvetlinGalovBlog.csproj
```

The site is then available at `https://localhost:7xxx` (port shown in terminal output).

For frontend development with HMR:
```bash
cd SvetlinGalovBlog/wwwroot/svetlin-galov-blog
npm run dev   # Vite dev server on http://localhost:5173
```

## Running Tests

```bash
# Backend integration tests
dotnet test

# Frontend unit tests
cd SvetlinGalovBlog/wwwroot/svetlin-galov-blog
npm test -- --run
```

## Deploy

### Automated (GitHub Actions)

Pushes to `main` trigger `.github/workflows/deploy.yml`, which:
1. Runs `dotnet publish` (automatically runs `npm install` + `npm run build` via the `.csproj` `PublishSpa` target).
2. Deploys the publish output to Azure App Service.

### Manual Deploy

```bash
# From repo root
dotnet publish SvetlinGalovBlog/SvetlinGalovBlog.csproj \
  --configuration Release \
  --output ./publish

# Then deploy ./publish to your host of choice.
```

## First Deploy (Azure App Service setup)

One-time manual steps required before the GitHub Actions workflow can run:

1. **Create an Azure App Service**
   - Runtime: .NET 8 (Linux)
   - Pricing tier: B1 or higher (F1 free tier sleeps after 20 min inactivity — avoid for a portfolio)
   - Region: West Europe or your preference

2. **Download the Publish Profile**
   - Azure portal → your App Service → Deployment Center → Manage publish profile → Download

3. **Add GitHub repository secrets**
   - `AZURE_WEBAPP_PUBLISH_PROFILE` — paste the full XML from the downloaded publish profile
   - `AZURE_WEBAPP_NAME` — your App Service name (e.g. `sgg-blog`)

4. **Trigger the first deploy**
   - Push to `main` or run the workflow manually from GitHub Actions tab

5. **(Optional) Custom domain + TLS**
   - Azure portal → App Service → Custom domains → Add custom domain
   - Add a managed TLS certificate (free via Azure)

See [docs/adr/001-design-port.md](docs/adr/001-design-port.md) for the full rationale behind the deploy target choice.

## Architecture

- **Frontend**: React 19 + TypeScript + Vite, MUI, Emotion, React Router v7, TanStack Query, MDX
- **Backend host**: ASP.NET Core minimal API (.NET 8) serving the SPA statically with SPA fallback
- **Deploy**: Azure App Service via GitHub Actions

The SPA build (`npm run build`) outputs to `SvetlinGalovBlog/wwwroot/`, which the .NET SDK includes in `dotnet publish` output automatically.
