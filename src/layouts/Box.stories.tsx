import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Box } from '@layouts';

const meta = {
  title: 'Layouts/Box',
  tags: ['autodocs'],
  component: Box,
  args: {
    as: 'div',
  },
} satisfies Meta<typeof Box>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className:
      'p-4 rounded-md border border-neutral-light dark:border-neutral-dark',
    children: 'This is a default box',
  },
};

export const AsButton: Story = {
  args: {
    as: 'button',
    className:
      'px-normal py-3 rounded-md cursor-pointer font-semibold text-default-dark dark:text-default-light bg-primary-light hover:bg-primary-light-hover active:bg-primary-light-active dark:bg-primary-dark dark:hover:bg-primary-dark-hover dark:active:bg-primary-dark-active',
    onClick: fn(),
    children: 'Click me',
  },
};

export const AsLink: Story = {
  args: {
    as: 'a',
    href: 'https://example.com',
    target: '_blank',
    className:
      'underline underline-offset-2 text-info-light hover:text-info-light-hover active:text-info-light-active dark:text-info-dark dark:hover:text-info-dark-hover dark:active:text-info-dark-active',
    children: 'Go to example.com',
  },
};

export const WithComplexContent: Story = {
  args: {
    as: 'div',
    className:
      'p-4 max-w-[40rem] rounded-md border border-neutral-light dark:border-neutral-dark dark:bg-neutral-dark not-dark:shadow-overlay not-dark:shadow-neutral-light',
    children: (
      <>
        <Box
          as="header"
          className="border-neutral-light dark:border-neutral-dark-hover border-b"
        >
          <h2 className="text-title1 mb-4 font-semibold">
            Complex Content Box
          </h2>
        </Box>

        <Box as="main" className="my-4">
          <p>
            This box can contain any content, including text, images, and more.
          </p>

          <Box as="ul" className="my-2 flex items-center justify-center gap-4">
            {Array.from({ length: 3 }, (_, i) => `Item ${i + 1}`).map(
              (item, index) => (
                <li key={index} className="list-none">
                  <Box
                    as="a"
                    href="#"
                    className="text-info-light hover:text-info-light-hover active:text-info-light-active dark:text-info-dark dark:hover:text-info-dark-hover dark:active:text-info-dark-active hover:underline"
                  >
                    {item}
                  </Box>
                </li>
              ),
            )}
          </Box>

          <Box
            as="aside"
            className="border-warning-light dark:border-warning-dark bg-warning-background-light dark:bg-warning-background-dark p-normal rounded-md border-l-4"
          >
            <p>
              <strong>Note</strong>: This is an example of a nested box with a
              different style.
            </p>
          </Box>
        </Box>

        <Box
          as="footer"
          className="border-neutral-light dark:border-neutral-dark-hover border-t"
        >
          <p className="text-body2 opacity-text-secondary mt-2">
            Footer content goes here.
          </p>
        </Box>
      </>
    ),
  },
};
