# Setup

## Requirements

- Node.js 20+
- pnpm 10+
- Python 3.11+

## TypeScript server

```powershell
cd apps/ts-mcp-server
pnpm install
pnpm dev
```

## Python server

```powershell
cd apps/py-mcp-server
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -e .[dev]
python -m py_mcp_server
```

## Generate new servers

```powershell
node scripts/new-server.mjs --name acme-tools --language ts
node scripts/new-server.mjs --name acme-ops --language py
```

The generator creates a new app under `apps/` using the template for the selected language.
