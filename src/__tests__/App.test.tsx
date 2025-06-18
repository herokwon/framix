import { render } from '@testing-library/react';

import App from '../App';

describe('App', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);

    expect(container).toBeDefined();
    expect(container).toBeInTheDocument();
  });

  it('should render empty fragment', () => {
    const { container } = render(<App />);

    expect(container).toBeEmptyDOMElement();
    expect(container.firstChild).toBeNull();
  });
});
