import { render, screen } from '@testing-library/react';

import App from '../App';

describe('App', () => {
  it('should render without crashing', () => {
    const { container } = render(<App />);

    expect(container).toBeDefined();
    expect(container).toBeInTheDocument();
  });

  it('should render empty fragment', () => {
    render(<App />);
    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
    expect(main).toBeEmptyDOMElement();
  });
});
