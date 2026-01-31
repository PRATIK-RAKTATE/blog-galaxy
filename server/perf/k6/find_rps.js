import http from "k6/http";
import { check } from "k6";

/**
 * VariableDefaultDescription
 * RATE10How many requests to send every second.DURATION2mHow long the test should run.VUS20Initial pool of users.MAX_VUS100The absolute ceiling for scaling.
 */

const URL = "https://blog-galaxy-stagging.onrender.com/version";

export const options = {
  scenarios: {
    rps_test: {
      executor: "constant-arrival-rate",
      rate: Number(__ENV.RATE || 10), // target RPS
      timeUnit: "1s",
      duration: __ENV.DURATION || "2m",
      preAllocatedVUs: Number(__ENV.VUS || 20),
      maxVUs: Number(__ENV.MAX_VUS || 100),
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],     // <1% errors
    http_req_duration: ["p(95)<1000"],  // p95 < 1000ms
  },
};

const BASE_URL = __ENV.BASE_URL;
const PATH = __ENV.PATH || "/version";

export default function () {
  
const res = http.get(URL);
  check(res, { "status 200": (r) => r.status === 200 });
}

/**
 * run like this
 * BASE_URL="https://your-staging.onrender.com" RATE=10 DURATION=2m k6 run perf/k6/rps-find.js

 */