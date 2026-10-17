# AgentAtlas MCP server

[![zachhhhh/agentatlas-mcp MCP server](https://glama.ai/mcp/servers/zachhhhh/agentatlas-mcp/badges/score.svg)](https://glama.ai/mcp/servers/zachhhhh/agentatlas-mcp)

Ask your coding agent how to set up coding agents. The AgentAtlas MCP server gives Claude Code, Codex, Cursor, Gemini CLI, VS Code and any other MCP client read-only access to [AgentAtlas](https://agentatlas.dev), the verified map of the agent stack:

- Setup guides for Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Cline, Kiro, Zed and more (permissions, sandboxing, hooks, subagents, MCP config), each with links to the vendor docs it was checked against
- Install commands, tools and auth details for 80+ official MCP servers
- Plugin systems, eval frameworks, agent benchmarks and agent protocols
- Coding agent plans and prices copied from vendor pricing pages

Free, read-only, no API key, no sign-in.

## Tools

| Tool | What it does |
| --- | --- |
| `search_atlas` | Search guides, official MCP servers, coding agents, plugin systems, eval frameworks, benchmarks and protocols |
| `get_guide` | Read a full setup guide with config files, commands and source links |
| `get_mcp_server` | Install commands for five clients plus tools and auth details for an official MCP server |
| `get_pricing` | Coding agent plans and prices from vendor pricing pages |

## Install

### Remote (recommended)

The server is hosted at `https://agentatlas.dev/api/mcp` (Streamable HTTP).

Claude Code:

```bash
claude mcp add --transport http agentatlas https://agentatlas.dev/api/mcp
```

Codex:

```bash
codex mcp add agentatlas --url https://agentatlas.dev/api/mcp
```

Gemini CLI:

```bash
gemini mcp add --transport http agentatlas https://agentatlas.dev/api/mcp
```

Cursor (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "agentatlas": { "url": "https://agentatlas.dev/api/mcp" }
  }
}
```

### Local stdio

For clients that only run stdio servers, this repo ships a dependency-free bridge (Node.js 18 or newer) that forwards stdio JSON-RPC to the hosted server:

```json
{
  "mcpServers": {
    "agentatlas": { "command": "npx", "args": ["-y", "github:zachhhhh/agentatlas-mcp"] }
  }
}
```

Or with Docker:

```bash
docker build -t agentatlas-mcp .
docker run -i --rm agentatlas-mcp
```

Set `AGENTATLAS_MCP_URL` to point the bridge at a different endpoint.

## Try asking

- How do I let Cursor run tests without asking every time?
- Install the Stripe MCP server in Codex.
- What can a Claude Code plugin bundle?
- Which eval framework runs agent evals in CI?

Also listed in the [official MCP registry](https://registry.modelcontextprotocol.io) as `io.github.zachhhhh/agentatlas`.

## License

MIT
