let mockIdCounter = 0;

export function createMockId(prefix: string): string {
  mockIdCounter += 1;
  return `${prefix}-${Date.now()}-${mockIdCounter}`;
}

export function resetMockIdCounter(): void {
  mockIdCounter = 0;
}

export class MockApiError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "MockApiError";
    this.status = status;
  }
}

export async function mockDelay(ms?: number): Promise<void> {
  const delayMs = ms ?? 300 + Math.floor(Math.random() * 301);
  await new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs);
  });
}

export async function mockApiCall<T>(
  fn: () => T | Promise<T>,
  options?: { delayMs?: number; shouldFail?: boolean; errorMessage?: string },
): Promise<T> {
  await mockDelay(options?.delayMs);

  if (options?.shouldFail) {
    throw new MockApiError(options.errorMessage ?? "Request failed");
  }

  return fn();
}
