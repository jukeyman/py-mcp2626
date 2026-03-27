import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { starterCapabilities } from "@py-type/shared-schemas";
import { z } from "zod";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "py-type-ts-reference",
    version: "0.1.0",
  });

  server.tool(
    "hello",
    {
      name: z.string().trim().min(1, "name is required"),
    },
    async ({ name }) => ({
      content: [
        {
          type: "text",
          text: `Hello ${name}, this is the TypeScript MCP reference server.`,
        },
      ],
      structuredContent: {
        message: `Hello ${name}, this is the TypeScript MCP reference server.`,
        server: "py-type-ts-reference",
      },
    }),
  );

  server.tool("server_capabilities", {}, async () => ({
    content: [
      {
        type: "text",
        text: "TypeScript reference server capabilities returned as structured content.",
      },
    ],
    structuredContent: starterCapabilities,
  }));

  server.resource("starter://overview", "starter://overview", async () => ({
    contents: [
      {
        uri: "starter://overview",
        mimeType: "text/plain",
        text: [
          "py-type TypeScript reference server",
          "Primitives: tools, resources, prompts",
          "Transport: stdio",
        ].join("\n"),
      },
    ],
  }));

  server.prompt(
    "starter_plan",
    {
      serverName: z.string().trim().min(1),
      problemDomain: z.string().trim().min(1),
    },
    ({ serverName, problemDomain }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Design an MCP server named ${serverName} for the ${problemDomain} domain. Include tools, resources, prompts, auth needs, and deployment notes.`,
          },
        },
      ],
    }),
  );

  return server;
}
