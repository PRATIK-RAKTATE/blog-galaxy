import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<2000"],
  },
};

export default function () {
  const res = http.get("https://blog-galaxy-stagging.onrender.com/version");
  check(res, { "status 200": (r) => r.status === 200 });
  sleep(1);
}

// Results summary:
/**
 * Success Rate	100%	All 19 requests returned HTTP 200 OK.
 * 
Peak Response Time	1129.13 ms	Occurred early in the session.

Fastest Response Time	341.81 ms	High variability observed during the run.

Typical Latency Range	440 ms – 650 ms	Most requests stabilized in this range.

Data Received (Total)	~9.6 KB	Includes headers and body payloads.

Data Sent (Total)	~2.5 KB	Mostly standard GET request headers.
 */

/**
 * What your results actually mean

You ran:

1 VU for 30s

Got 19 requests total → 0.624 req/s

0% failures

p95 = 704ms, avg 560ms, max 1.12s

Key takeaways

✅ Your endpoint is stable (no errors).

✅ Latency is acceptable for a beginner baseline on Render + cold-ish infra.

❗ Your throughput is low because you likely have sleep(1) in the script (that’s good for a smoke test).

With sleep(1), max is ~1 request/sec per VU. Your ~0.62 req/s suggests network + server time + sleep combined.

So this is a smoke/baseline, not a “capacity test”.
 */