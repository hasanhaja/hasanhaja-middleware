const config = {
  "/web-components": "https://close-alligator-19.deno.dev/",
};

const demoSites = new Map(Object.entries(config));

// redirect or proxy. Proxy by default
// <base-url>/pathname?redirect=true
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const reqPath = url.pathname;
  const newLocation = demoSites.get(reqPath);

  const searchParams = new URLSearchParams(url.search);
  const isRedirect = searchParams.get("redirect") === "true";
  
  if (typeof newLocation === "undefined") {
    return new Response(
      null,
      {
        status: 302,
        headers: {
          "Location": "https://www.hasanhaja.com/404",
        },
      },
    );
  }
    
  if (isRedirect) {
    return new Response(
      null,
      { status: 302,
        headers: {
          "Location": newLocation,
        },
      },
    );
  } else {
    return await fetch(newLocation, { headers: req.headers });
  }
}

Deno.serve(handler);
