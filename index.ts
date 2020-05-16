import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { processWebhook } from "./src/controllers/webhook_controller.ts";

const port = parseInt(config().PORT);

const router = new Router();
router.post('/', processWebhook)

const app = new Application();
app.use(router.routes());

await app.listen({ port })