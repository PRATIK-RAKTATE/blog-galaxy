import client from 'prom-client';

client.collectDefaultMetrics();

const httpLatency = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency',
  labelNames: ['method', 'route', 'status']
});

const aiTokenUsage = new client.Counter({
  name: 'ai_tokens_used_total',
  help: 'Total AI tokens consumed'
});

export const recordHttpLatency = (labels, seconds) => {
  httpLatency.observe(labels, seconds);
};

export const recordAiTokens = count => {
  aiTokenUsage.inc(count);
};

export const metrics = async () => client.register.metrics();
export const contentType = client.register.contentType;
    