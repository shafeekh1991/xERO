import type { IncomingMessage, ServerResponse } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { ToolFactory } from "../src/tools/tool-factory.js";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const server = new McpServer({
    name: "Xero MCP Server",
    version: "1.0.0",
  });

  ToolFactory(server);

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless mode
  });

  await server.connect(transport);
  await transport.handleRequest(req, res);
}
