from fastmcp import FastMCP

mcp = FastMCP("__SERVER_NAME__")


@mcp.tool()
def hello(name: str) -> str:
    """Say hello from the generated MCP server."""
    cleaned_name = name.strip()
    if not cleaned_name:
        raise ValueError("name must not be empty")
    return f"Hello {cleaned_name}, welcome to __SERVER_NAME__."
