import type {
  ComponentPropsWithRef,
  ElementStatusProps,
  StrictOmit,
} from '@types';

import { isLocalURL } from '@utils';

import Button from './Button';

type UrlObject = {
  pathname: string;
  replace?: boolean;
};

type LinkButtonProps = StrictOmit<
  ComponentPropsWithRef<'a'>,
  'children' | 'href'
> &
  Pick<
    Parameters<typeof Button>[0],
    'children' | 'variant' | 'size' | 'shape' | 'leftIcon' | 'rightIcon'
  > &
  ElementStatusProps & {
    href?: string | UrlObject;
  };

const LinkButton = ({
  children,
  href = '',
  testId = 'link-button',
  label = 'Link Button',
  ...props
}: LinkButtonProps) => {
  const url = {
    pathname: typeof href === 'string' ? href : href.pathname,
    replace: typeof href === 'string' ? false : (href.replace ?? false),
  } satisfies UrlObject;

  return (
    <Button
      {...props}
      as="a"
      color="info"
      rel={props.target === '_blank' ? 'noopener noreferrer' : props.rel}
      href={url.pathname}
      testId={testId}
      label={label}
      onClick={e => {
        if (typeof window === 'undefined') return;

        props.onClick?.(e);
        if (e.defaultPrevented) return;

        // only left-click
        if (e.button !== 0) return;

        if (url.pathname.length === 0) {
          e.preventDefault();
          return;
        }

        // respect default browser behavior for new tab/download/modifier keys
        if (
          props.target === '_blank' ||
          props.download ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        )
          return;

        if (url.replace) {
          e.preventDefault();

          try {
            const hasExternalUrl = !isLocalURL({ url: url.pathname });
            const dest = hasExternalUrl
              ? new URL(url.pathname)
              : new URL(url.pathname, window.location.href);

            if (hasExternalUrl) {
              window.location.replace(dest.toString());
            } else {
              const next = dest.pathname + dest.search + dest.hash;
              window.history.replaceState(null, '', next);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          } catch {
            window.location.replace(url.pathname);
          }
        }
      }}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
