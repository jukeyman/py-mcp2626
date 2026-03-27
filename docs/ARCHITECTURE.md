# Architecture

## Goal

`py-type` is a reusable MCP platform starter for building local-first servers in either TypeScript or Python.

## Design choices

- TypeScript and Python each get a working reference server.
- Shared contracts live in `packages/shared-schemas`.
- Templates make it easy to stamp out new servers without copying by hand.
- Scripts handle setup, local development, and server generation.
- Deployment is intentionally a second step after local validation.

## Repo layout

```text
py-type/
  apps/
    ts-mcp-server/
    py-mcp-server/
  packages/
    shared-schemas/
  templates/
    ts-server/
    py-server/
  scripts/
  docs/
```

## Reference server behavior

Both reference servers expose the same three starter concepts:

- a `hello` tool for argument validation and invocation flow
- a `server_capabilities` tool for structured metadata
- a `starter://overview` resource for contextual repo information

This keeps the examples small enough to understand while still demonstrating real MCP server primitives.
