import * as React from "react";
import { useEffect, useRef } from "react";
import Hero from "@/components/hero";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const VISIT_KEY = "timetablely_landing_visited";

const getSessionId = () => {
  let sessionId = sessionStorage.getItem("visitor_session");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("visitor_session", sessionId);
  }
  return sessionId;
};

const Landing: React.FC = () => {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    // Check if already tracked this session
    if (sessionStorage.getItem(VISIT_KEY)) return;

    fetch(`${API_BASE}/analytics/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appSource: "timetablely",
        path: window.location.pathname,
        referrer: document.referrer,
        sessionId: getSessionId(),
      }),
    })
      .then(() => {
        sessionStorage.setItem(VISIT_KEY, "true");
      })
      .catch(() => {
        // Silently fail - analytics shouldn't break the app
      });
  }, []);

  return <Hero />;
};

export default Landing;
