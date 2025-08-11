export const logger = {
  info: (...args: unknown[]) => {
    if (__DEV__) {
      console.log('[INFO]', ...args);
    }
  },
  error: (...args: unknown[]) => {
    if (__DEV__) {
      console.error('[ERROR]', ...args);
    }
  },
};
