import { afterEach, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LinkButton } from './LinkButton';

describe('[UI] LinkButton', () => {
  let originalLocation: Location | undefined;

  const restoreLocation = () => {
    if (originalLocation) {
      Object.defineProperty(window, 'location', { value: originalLocation });
      originalLocation = undefined;
    }
  };

  const stubLocationReplace = () => {
    originalLocation = window.location;
    const replace = vi.fn();

    Object.defineProperty(window, 'location', {
      value: {
        ...originalLocation,
        replace,
        href: originalLocation!.href,
        protocol: originalLocation!.protocol,
        host: originalLocation!.host,
      } as unknown as Location,
    });
    return replace;
  };

  afterEach(() => {
    vi.restoreAllMocks();
    restoreLocation();
  });

  describe('rendering', () => {
    it('renders as anchor with defaults', () => {
      render(<LinkButton href="#">Home</LinkButton>);
      const link = screen.getByTestId('link-button');

      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '#');
      expect(link).toHaveAttribute('aria-label', 'Link Button');
    });

    it('honors custom testId and label', () => {
      render(
        <LinkButton href="#x" testId="lb" label="Go">
          Go
        </LinkButton>,
      );
      const link = screen.getByTestId('lb');

      expect(screen.getByRole('button', { name: 'Go' })).toBe(link);
    });

    it('auto-adds rel when target is _blank', () => {
      render(
        <LinkButton href="https://example.com" target="_blank">
          External
        </LinkButton>,
      );
      const link = screen.getByTestId('link-button');

      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('navigation (replace behavior)', () => {
    it('treats string href as replace=false and does not intercept navigation', async () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      render(<LinkButton href="/internal?x=1#y">Go</LinkButton>);
      const link = screen.getByTestId('link-button');
      await userEvent.click(link);

      expect(replaceStateSpy).not.toHaveBeenCalled();
      expect(locReplace).not.toHaveBeenCalled();
    });

    it('defaults replace to false when href object omits it (no interception)', async () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      render(<LinkButton href={{ pathname: '/internal' }}>Go</LinkButton>);
      const link = screen.getByTestId('link-button');
      await userEvent.click(link);

      expect(replaceStateSpy).not.toHaveBeenCalled();
      expect(locReplace).not.toHaveBeenCalled();
    });

    it('uses history.replaceState for same-origin URLs when replace is true', async () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      render(
        <LinkButton href={{ pathname: '/internal?x=1#y', replace: true }}>
          Nav
        </LinkButton>,
      );
      const link = screen.getByTestId('link-button');
      await userEvent.click(link);

      expect(replaceStateSpy).toHaveBeenCalledTimes(1);
      expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '/internal?x=1#y');
      expect(locReplace).not.toHaveBeenCalled();
    });

    it('falls back to location.replace for external URLs when replace is true', async () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      render(
        <LinkButton
          href={{ pathname: 'https://example.com/path', replace: true }}
        >
          Go external
        </LinkButton>,
      );
      const link = screen.getByTestId('link-button');
      await userEvent.click(link);

      expect(locReplace).toHaveBeenCalledTimes(1);

      // destination is resolved via new URL with current origin
      const calledWith = locReplace.mock.calls[0]?.[0];

      expect(typeof calledWith).toBe('string');
      expect(calledWith).toMatch(/^https?:\/\/example\.com\/path/);
      expect(replaceStateSpy).not.toHaveBeenCalled();
    });

    it('respects user preventDefault in onClick', async () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      render(
        <LinkButton
          href={{ pathname: '/internal', replace: true }}
          onClick={e => e.preventDefault()}
        >
          Prevent
        </LinkButton>,
      );
      const link = screen.getByTestId('link-button');
      await userEvent.click(link);

      expect(replaceStateSpy).not.toHaveBeenCalled();
      expect(locReplace).not.toHaveBeenCalled();
    });

    it('does nothing on middle-click (button!==0)', async () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      render(
        <LinkButton href={{ pathname: '/internal', replace: true }}>
          Middle
        </LinkButton>,
      );
      const link = screen.getByTestId('link-button');
      fireEvent.click(link, { button: 1 });

      expect(replaceStateSpy).not.toHaveBeenCalled();
      expect(locReplace).not.toHaveBeenCalled();
    });

    it('respects target="_blank" by not intercepting navigation', async () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      render(
        <LinkButton
          href={{ pathname: '/internal', replace: true }}
          target="_blank"
        >
          Blank
        </LinkButton>,
      );
      const link = screen.getByTestId('link-button');
      fireEvent.click(link);

      expect(replaceStateSpy).not.toHaveBeenCalled();
      expect(locReplace).not.toHaveBeenCalled();
    });

    it('early-returns and prevents navigation when href is empty', async () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      render(<LinkButton href="">Empty</LinkButton>);
      const link = screen.getByTestId('link-button');
      await userEvent.click(link);

      expect(replaceStateSpy).not.toHaveBeenCalled();
      expect(locReplace).not.toHaveBeenCalled();
    });

    it('does not intercept when modifier keys are used (e.metaKey)', () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      render(
        <LinkButton href={{ pathname: '/internal', replace: true }}>
          Mod
        </LinkButton>,
      );
      const link = screen.getByTestId('link-button');
      fireEvent.click(link, { button: 0, metaKey: true });

      expect(replaceStateSpy).not.toHaveBeenCalled();
      expect(locReplace).not.toHaveBeenCalled();
    });

    it('does not intercept when download attribute is set', () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      render(
        <LinkButton href={{ pathname: '/internal', replace: true }} download>
          DL
        </LinkButton>,
      );
      const link = screen.getByTestId('link-button');
      fireEvent.click(link);

      expect(replaceStateSpy).not.toHaveBeenCalled();
      expect(locReplace).not.toHaveBeenCalled();
    });

    it('falls back to location.replace on URL parsing failure (catch branch)', async () => {
      const user = userEvent.setup();
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      const locReplace = stubLocationReplace();

      // invalid absolute URL that will throw in new URL(url, base)
      render(
        <LinkButton href={{ pathname: 'https://exa mple.com', replace: true }}>
          Invalid
        </LinkButton>,
      );
      const link = screen.getByTestId('link-button');
      await user.click(link);

      expect(locReplace).toHaveBeenCalledTimes(1);
      expect(replaceStateSpy).not.toHaveBeenCalled();
    });
  });
});
