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

describe('main.tsx', () => {
  let mockRootElement: HTMLDivElement;

  beforeEach(() => {
    vi.clearAllMocks();

    // ✅ 모킹된 DOM 요소 생성
    mockRootElement = document.createElement('div');
    mockRootElement.id = 'root';

    // ✅ document.getElementById 모킹
    vi.spyOn(document, 'getElementById').mockReturnValue(mockRootElement);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call createRoot with root element', async () => {
    await import('../main');

    expect(document.getElementById).toHaveBeenCalledWith('root');

    expect(mockCreateRoot).toHaveBeenCalledTimes(1);
    expect(mockCreateRoot).toHaveBeenCalledWith(mockRootElement);
    expect(mockRender).toHaveBeenCalledTimes(1);
  });
});
