const DEFAULT_HOST = "https://us.i.posthog.com";

export async function initAnalytics(): Promise<void> {
  if (typeof window === "undefined") return;

  const key = import.meta.env.PUBLIC_POSTHOG_KEY;
  if (!key) return;

  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return;
  }

  const { default: posthog } = await import("posthog-js");
  const host = import.meta.env.PUBLIC_POSTHOG_HOST ?? DEFAULT_HOST;

  posthog.init(key, {
    api_host: host,
    capture_pageview: true,
    autocapture: true,
    person_profiles: "identified_only",
    respect_dnt: true,
  });
}
