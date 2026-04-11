import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMcpServer } from "@metorial/mcp-server";
import { z } from "zod";

let server = new McpServer({
  name: "CustomTracked",
  version: "8.0.0",
});

let numberPairSchema = {
  a: z.number().describe("First number"),
  b: z.number().describe("Second number"),
};

server.tool(
  "add",
  "Add two numbers.",
  numberPairSchema,
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }],
  })
);

server.tool(
  "multiply",
  "Multiply two numbers.",
  numberPairSchema,
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a * b) }],
  })
);

server.tool(
  "subtract",
  "Subtract two numbers.",
  numberPairSchema,
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a - b) }],
  })
);

server.resource(
  "calculator-help-v2",
  "memory://calculator/help",
  {
    description: "Example inputs for the calculator tools.",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.toString(),
        mimeType: "application/json",
        text: JSON.stringify(
          {
            tools: {
              add: { a: 2, b: 3 },
              multiply: { a: 2, b: 3 },
              subtract: { a: 2, b: 3 },
            },
            examples: [
              "add(a=2, b=3) => 5",
              "multiply(a=2, b=3) => 6",
            ],
          },
          null,
          2
        ),
      },
    ],
  })
);

export { server };
export default createMcpServer({ server });

