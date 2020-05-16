import { Context } from "https://deno.land/x/oak/mod.ts";

export function processWebhook (context: Context): void {
  context.response.body = 'euy';
}