# Deployment

## Phase two goal

The platform is now prepared for remote publishing workflows while staying local-first for development.

## TypeScript reference server

The TypeScript server is set up to be deployable to Cloudflare Workers.

### Expected secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Local commands

```powershell
cd apps/ts-mcp-server
pnpm install
pnpm build
pnpm deploy
```

## Python reference server

The Python server is containerized so it can be published to Docker-compatible platforms.

### Local commands

```powershell
cd apps/py-mcp-server
docker build -t py-type-py-reference .
docker run --rm -it py-type-py-reference
```

## GitHub workflows

- `ci.yml` runs TypeScript and Python validation.
- `deploy-ts-reference.yml` deploys the TypeScript reference server to Cloudflare on demand or on changes to the TS app.

## Upload readiness

This project is ready to be uploaded to a git remote once `git` is available locally or a target GitHub repository is provided.
