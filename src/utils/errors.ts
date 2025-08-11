export function getErrorMessage(error: unknown): string {
  if (!error) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    const anyErr = error as any;
    if (typeof anyErr.data?.message === 'string') {
      return anyErr.data.message;
    }
    if (typeof anyErr.error === 'string') {
      return anyErr.error;
    }
    if (typeof anyErr.message === 'string') {
      return anyErr.message;
    }
  }

  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
}
