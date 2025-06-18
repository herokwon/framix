import { vi } from 'vitest';

// Mock React DOM
const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender,
  unmount: vi.fn(),
}));

vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

// Mock App component
vi.mock('../App', () => ({
  default: () => null,
}));

// Mock document.getElementById
Object.defineProperty(document, 'getElementById', {
  writable: true,
  value: vi.fn(() => document.createElement('div')),
});

describe('main.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should import without errors', async () => {
    expect(() => import('../main')).not.toThrow();
  });

  it('should call createRoot with root element', async () => {
    await import('../main');

    expect(mockCreateRoot).toHaveBeenCalledWith(expect.any(HTMLElement));
    expect(mockRender).toHaveBeenCalled();
  });
});
