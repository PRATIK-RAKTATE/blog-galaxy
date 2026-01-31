import http from "k6/http";
import { check } from "k6";

export const options = {
  // Reduces CPU/RAM usage by not processing the response body
  discardResponseBodies: true, 
  
  scenarios: {
    rps_test: {
      executor: "constant-arrival-rate",
      rate: 10000,
      timeUnit: "1s",
      duration: "2m",
      
      // Increased allocation to ensure k6 has 'breathing room'
      preAllocatedVUs: 2000,   // Start with 2k workers
      maxVUs: 5000,            // Allow up to 5k if server gets sluggish
      
      gracefulStop: "30s",
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1000"],
    // Keeping this at 0 ensures we know for a fact k6 hit the 10k target
    dropped_iterations: ["count==0"], 
  },
};

const URL = "http://localhost:5000/version";

export default function () {
  // Using the 'params' object to keep the request overhead minimal
  const params = {
    headers: { Accept: "application/json" },
  };

  const res = http.get(URL, params);
  
  check(res, { "status is 200": (r) => r.status === 200 });
}