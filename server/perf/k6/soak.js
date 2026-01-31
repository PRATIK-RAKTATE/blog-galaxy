import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "15m",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1200"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const res = http.get(`${BASE_URL}/health`);
  check(res, { "200": (r) => r.status === 200 });
  sleep(1);
}
