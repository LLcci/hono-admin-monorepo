import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

const port = 3001;

console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
