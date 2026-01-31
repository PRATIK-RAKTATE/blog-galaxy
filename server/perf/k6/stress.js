import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 10 },
    { duration: "1m", target: 25 },
    { duration: "1m", target: 50 },
    { duration: "1m", target: 80 },
    { duration: "2m", target: 80 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"], // during stress, allow a bit more
    http_req_duration: ["p(95)<2500"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const res = http.get(`${BASE_URL}/health`);
  check(res, { "200": (r) => r.status === 200 });
  sleep(1);
}
