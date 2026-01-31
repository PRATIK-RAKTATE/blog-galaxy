import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 5,
  duration: "2m",
  thresholds: {
    http_req_failed: ["rate<0.01"], // <1% errors
    http_req_duration: ["p(95)<800"], // p95 < 800ms
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const res = http.get(`${BASE_URL}/health`);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}
