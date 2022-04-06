export const mockLog = {
  clearMeta: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  meta: jest.fn(),
  setAccount: jest.fn(),
  setMember: jest.fn(),
  setMeta: jest.fn(),
  warn: jest.fn(),
};

export const mockLogger = {
  create: () => mockLog,
  get: () => mockLog,
};
