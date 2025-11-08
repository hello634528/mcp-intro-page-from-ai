import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  // Serve the index.html file for the root path
  if (url.pathname === "/") {
    try {
      const htmlContent = await Deno.readTextFile("./index.html");
      return new Response(htmlContent, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    } catch (error) {
      console.error(error);
      return new Response("Could not find index.html", { status: 500 });
    }
  }

  // Handle other paths with a 404
  return new Response("Not Found", { status: 404 });
}

serve(handler);
