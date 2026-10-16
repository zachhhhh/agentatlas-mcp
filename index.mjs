#!/usr/bin/env node
// AgentAtlas MCP server, stdio transport.
// Bridges stdio JSON-RPC to the hosted AgentAtlas server at https://agentatlas.dev/api/mcp
// (Streamable HTTP, stateless, read-only, no sign-in). No dependencies.
import { createInterface } from "node:readline";

const ENDPOINT = process.env.AGENTATLAS_MCP_URL || "https://agentatlas.dev/api/mcp";

const write = (msg) => process.stdout.write(JSON.stringify(msg) + "\n");

async function forward(message) {
	const isRequest = message && message.id !== undefined && message.id !== null;
	try {
		const res = await fetch(ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
			body: JSON.stringify(message),
		});
		if (!isRequest || res.status === 202) return;
		const text = await res.text();
		if (!text) return;
		const body = JSON.parse(text);
		for (const m of Array.isArray(body) ? body : [body]) write(m);
	} catch (err) {
		if (isRequest) {
			write({ jsonrpc: "2.0", id: message.id, error: { code: -32603, message: `AgentAtlas request failed: ${err.message}` } });
		}
	}
}

const rl = createInterface({ input: process.stdin });
// Forward messages one at a time so responses keep request order.
let chain = Promise.resolve();
rl.on("line", (line) => {
	const trimmed = line.trim();
	if (!trimmed) return;
	let message;
	try {
		message = JSON.parse(trimmed);
	} catch {
		write({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
		return;
	}
	chain = chain.then(() => forward(message));
});
rl.on("close", async () => {
	await chain;
	process.exit(0);
});
