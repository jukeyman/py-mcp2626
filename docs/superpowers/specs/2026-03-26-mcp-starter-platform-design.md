# MCP Starter Platform Design

## Summary

Build `py-type` as a local-first starter monorepo for Model Context Protocol development with:

- one TypeScript reference server
- one Python reference server
- shared starter contracts
- reusable templates
- setup and generation scripts

## Why this approach

This is the best first step because it creates a reusable foundation before branching into vertical servers, marketplaces, or monetization layers.

## Core structure

- `apps/ts-mcp-server`: official TypeScript SDK reference implementation
- `apps/py-mcp-server`: Python `fastmcp` reference implementation
- `packages/shared-schemas`: shared server metadata contracts
- `templates/`: scaffolds for future server generation
- `scripts/`: setup and generator scripts

## Supported workflows

1. Run a local TypeScript MCP server.
2. Run a local Python MCP server.
3. Generate new starter servers from templates.
4. Use the shared docs to extend toward deployment later.

## Guardrails

- keep the first version local-first
- keep examples production-shaped, not toy snippets
- avoid hidden generators or magic that is hard to maintain
- preserve the original research notes as source material
