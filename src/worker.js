/**
 * Static asset fallback for the GreenGrow Astro build.
 * This file is a deployment scaffold only; it has not been deployed to Cloudflare.
 */
export default {
  fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
