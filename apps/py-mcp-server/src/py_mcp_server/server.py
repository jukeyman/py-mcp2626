from __future__ import annotations

from fastmcp import FastMCP

STARTER_CAPABILITIES = {
    "name": "py-type-starter",
    "transports": ["stdio"],
    "primitives": ["tools", "resources", "prompts"],
    "languages": ["typescript", "python"],
}


def create_server() -> FastMCP:
    server = FastMCP("py-type-py-reference")

    @server.tool()
    def hello(name: str) -> dict[str, str]:
        """Return a greeting with structured metadata."""
        cleaned_name = name.strip()
        if not cleaned_name:
            raise ValueError("name must not be empty")
        return {
            "message": f"Hello {cleaned_name}, this is the Python MCP reference server.",
            "server": "py-type-py-reference",
        }

    @server.tool()
    def server_capabilities() -> dict[str, object]:
        """Return starter capability metadata."""
        return STARTER_CAPABILITIES

    @server.resource("starter://overview")
    def starter_overview() -> str:
        """Provide a short text overview of the Python reference server."""
        return "\n".join(
            [
                "py-type Python reference server",
                "Primitives: tools, resources, prompts",
                "Transport: stdio",
            ]
        )

    @server.prompt()
    def starter_plan(server_name: str, problem_domain: str) -> str:
        """Create a short design prompt for a new MCP server."""
        clean_name = server_name.strip()
        clean_domain = problem_domain.strip()
        if not clean_name or not clean_domain:
            raise ValueError("server_name and problem_domain must not be empty")
        return (
            f"Design an MCP server named {clean_name} for the {clean_domain} domain. "
            "Include tools, resources, prompts, auth needs, and deployment notes."
        )

    return server


mcp = create_server()
