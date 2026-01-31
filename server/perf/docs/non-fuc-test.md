# Performance Testing Strategy & Order of Execution

This document explains **why** and **how** we run different performance tests, and **in what order**, so that numbers we report actually mean something.

Performance testing is not about “how big traffic we can throw”.
It is about **confidence under real conditions**.

---

## 1. Baseline Test – “What does healthy look like?”

**Purpose**
Establish a clean reference point for the system when it is working normally.

**What we test**

* A single critical endpoint (or a small set)
* Low, controlled traffic
* Stable environment (no deploys during test)

**What we measure**

* Average latency
* p95 latency
* Error rate
* CPU and memory usage

**Why this matters**
Without a baseline, all future tests are meaningless.
You cannot say “it got slower” if you don’t know what “normal” was.

**Output statement example**

> “Under light load (≈5–10 RPS), the system responds with p95 latency ~X ms and 0% errors.”

This becomes the reference for **every other test**.

---

## 2. Load Test – “Can we handle expected traffic?”

**Purpose**
Verify the system can handle **expected production traffic** comfortably.

**What we test**

* Traffic equal to realistic production load
* Gradual ramp-up to avoid artificial shock
* Duration long enough to stabilize

**What we measure**

* Sustained p95 latency
* Error rate under normal load
* Resource utilization trends

**Why this matters**
Most systems fail **not at extreme load**, but at the load they see every day.

A load test answers:

> “Will users have a bad experience during normal business hours?”

**Passing criteria**

* Latency stays within SLO
* Error rate < 1%
* No steady memory or CPU growth

---

## 3. Finding Max RPS – “Where is the safe ceiling?”

**Purpose**
Determine the **maximum sustainable throughput** before degradation starts.

**How we do it**

* Increase RPS in small, controlled steps
* Hold each level long enough to stabilize
* Stop at first consistent failure

**Failure signals**

* Error rate > threshold
* p95 latency crossing SLO
* Resource saturation (CPU pegged, memory pressure)

**Important clarification**
Max RPS is **not** the point of total failure.
It is the **highest point before reliability degrades**.

**Output statement example**

> “The service sustains up to ~X RPS with p95 latency < Y ms and <1% errors.”

This number is used for:

* Capacity planning
* Autoscaling decisions
* Traffic shaping limits

---

## 4. Stress Test – “How does it fail?”

**Purpose**
Understand system behavior **beyond safe limits**.

**What we test**

* Traffic above max RPS
* Sustained pressure until failure

**What we observe**

* Failure mode (timeouts, 5xx, queue buildup)
* Recovery behavior after load stops
* Data consistency issues

**Why this matters**
Failure is inevitable.
The goal is **controlled degradation**, not panic.

A good system:

* Fails gradually
* Protects core functionality
* Recovers without manual intervention

**This test is not about passing.**
It is about learning.

---

## 5. Spike Test – “What happens during sudden traffic jumps?”

**Purpose**
Simulate real-world traffic spikes (launches, bots, breaking news).

**What we test**

* Instant jump from normal load to high load
* Short duration (seconds to minutes)
* Sudden drop back to normal

**What we measure**

* Error spikes
* Latency spikes
* Autoscaling reaction time
* Cache warm-up behavior

**Why this matters**
Most outages happen due to **sudden spikes**, not steady load.

This test answers:

> “If traffic jumps 5× in 10 seconds, do we fall over?”

---

## 6. Soak Test – “Can we survive time?”

**Purpose**
Detect issues that only appear **after hours of running**.

**What we test**

* Normal or slightly elevated load
* Long duration (several hours)

**What we watch**

* Memory leaks
* Connection leaks
* GC behavior
* Gradual latency increase
* Resource drift

**Why this matters**
Many systems pass load tests and still fail in production due to:

* Leaked DB connections
* Growing memory usage
* Background job accumulation

A soak test answers:

> “Will this service still be healthy tomorrow?”

---

## Recommended Order of Execution

1. **Baseline Test** – establish reference
2. **Load Test** – validate expected usage
3. **Find Max RPS** – identify safe limits
4. **Stress Test** – observe failure behavior
5. **Spike Test** – validate sudden traffic handling
6. **Soak Test** – verify long-term stability

Skipping steps leads to misleading results.

---

## Final Notes (Engineering Reality)

* Performance numbers are **environment-specific**
* Results from staging ≠ production, but trends still matter
* One endpoint ≠ whole system
* Latency percentiles matter more than averages
* “Passed once” means nothing — consistency matters

---

## How to improve beyond industry standard

1. Define **clear SLOs** before running tests
2. Track **p99**, not just p95
3. Correlate metrics with **CPU, memory, DB pools**
4. Run tests after every major architectural change
5. Document **failure modes**, not just success numbers

This is how performance testing becomes **engineering**, not just tooling.
