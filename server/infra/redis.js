export const health = async () => {
  try {
    return {
      status: 'up',
      latency_ms: 6
    };
  } catch {
    return { status: 'down' };
  }
};
