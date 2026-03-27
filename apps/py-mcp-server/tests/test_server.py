from py_mcp_server.server import STARTER_CAPABILITIES


def test_capabilities_include_prompts() -> None:
    assert "prompts" in STARTER_CAPABILITIES["primitives"]


def test_capabilities_include_python() -> None:
    assert STARTER_CAPABILITIES["languages"] == ["typescript", "python"]
