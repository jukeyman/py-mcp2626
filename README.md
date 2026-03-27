# py-type

`py-type` is a local-first MCP starter platform built to help you ship new Model Context Protocol servers quickly with either TypeScript or Python.

## What is included

- `apps/ts-mcp-server`: TypeScript reference MCP server using `@modelcontextprotocol/sdk`
- `apps/py-mcp-server`: Python reference MCP server using `fastmcp`
- remote-ready TypeScript deployment config for Cloudflare Workers
- container packaging for the Python reference server
- `packages/shared-schemas`: shared examples and starter metadata contracts
- `templates/`: starter templates for generating new servers
- `scripts/`: setup, local dev, and scaffolding scripts
- `docs/`: architecture, setup, design, and deployment docs

## Why this repo exists

This repo turns your research notes into an actual reusable build platform:

- local-first development for fast iteration
- both TypeScript and Python reference implementations
- a simple generator for new MCP servers
- clean docs for setup, architecture, and next steps

## Quick start

### TypeScript server

```powershell
cd apps/ts-mcp-server
pnpm install
pnpm dev
```

### Python server

```powershell
cd apps/py-mcp-server
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -e .[dev]
python -m py_mcp_server
```

## Generate a new starter

```powershell
node scripts/new-server.mjs --name my-finance-mcp --language ts
node scripts/new-server.mjs --name my-legal-mcp --language py
```

## Deployment-ready assets

- Cloudflare Worker config: `apps/ts-mcp-server/wrangler.toml`
- Python container image: `apps/py-mcp-server/Dockerfile`
- CI pipeline: `.github/workflows/ci.yml`
- TS deploy workflow: `.github/workflows/deploy-ts-reference.yml`
- Release package helper: `scripts/package-release.ps1`

## Research notes

Your original source material stays in the repo root for reference:

- `THE COMPLETE MCP MASTERY BIBLE.litcoffee`
- `THE COMPLETE PYTHON UNIVERSE — EVERY RES.txt`
- `THE COMPLETE TYPESCRIPT MASTERY BIBLE.litcoffee`
- `THE ULTIMATE MCP SERVER ARSENAL.litcoffee`
- `Rick, here's the complete system for mak.txt`

## Current upload status

The repo is prepared for upload, but this environment does not currently expose `git`, so I could not push it to GitHub from here.
