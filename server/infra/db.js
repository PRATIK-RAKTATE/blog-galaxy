export const health = async () => {
  try {
    // replace with real DB ping
    return {
      status: 'up',
      latency_ms: 14
    };
  } catch {
    return { status: 'down' };
  }
};
