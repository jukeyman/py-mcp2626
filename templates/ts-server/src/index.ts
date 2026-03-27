import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "__SERVER_NAME__",
  version: "0.1.0",
});

server.tool(
  "hello",
  {
    name: z.string().min(1),
  },
  async ({ name }) => ({
    content: [
      {
        type: "text",
        text: `Hello ${name}, welcome to __SERVER_NAME__.`,
      },
    ],
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
