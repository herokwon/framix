import { useCallback, useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Box, Flex } from '@layouts';

import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Form/Checkbox',
  tags: ['autodocs'],
  component: Checkbox,
  args: {
    testId: 'checkbox',
    label: 'Default checkbox',
    name: 'checkbox',
    isDisabled: false,
  },
  render: args => (
    <Flex justifyContent="center" alignItems="center" className="w-screen">
      <Checkbox {...args} />
    </Flex>
  ),
} satisfies Meta<typeof Checkbox>;
export default meta;

type Story = StoryObj<typeof meta>;

type Checkboxes = Record<string, boolean>;

export const Default: Story = {};

export const Controlled: Story = {
  args: {
    isChecked: true,
    value: 'Controlled checkbox',
    name: 'controlled-checkbox',
  },
  render: args => {
    const [isChecked, setIsChecked] = useState(args.isChecked ?? false);
    const [onChangeResult, setOnChangeResult] = useState(true);

    useEffect(() => {
      setIsChecked(args.isChecked ?? false);
    }, [args.isChecked]);

    useEffect(() => {
      setOnChangeResult(isChecked);
    }, [isChecked]);

    return (
      <Flex alignItems="center" className="w-75">
        <Checkbox
          {...args}
          label={`Controlled checkbox (isChecked: ${String(onChangeResult)})`}
          isChecked={isChecked}
          onChange={useCallback<React.ChangeEventHandler<HTMLInputElement>>(
            e => {
              setIsChecked(prev => !prev);
              setOnChangeResult(e.target.checked);
            },
            [],
          )}
        />
      </Flex>
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultChecked: true,
    label: 'Uncontrolled checkbox',
    value: 'Uncontrolled checkbox',
    name: 'uncontrolled-checkbox',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
    label: 'Parent checkbox',
    value: 'Parent checkbox',
    name: 'parent-checkbox',
  },
  render: args => {
    const childrenCheckboxes = Array.from({ length: 3 }, (_, i) => ({
      id: `child-checkbox-${i + 1}`,
      label: `Child checkbox ${i + 1}`,
    }));
    const getInitialCheckedItems = (): Checkboxes =>
      Object.fromEntries(
        childrenCheckboxes.map(childCheckbox => [childCheckbox.id, false]),
      );

    const [childCheckboxes, setChildCheckboxes] = useState<Checkboxes>(
      getInitialCheckedItems(),
    );

    const isChildChecked = (id: string): boolean => childCheckboxes[id];
    const getAllChildren = (): string[] => Object.keys(childCheckboxes);
    const getCheckedItemsCount = (): number =>
      getAllChildren().filter(isChildChecked).length;

    const isParentChecked = (): boolean => getCheckedItemsCount() > 0;

    const isIndeterminate = (): boolean => {
      const checkedCount = getCheckedItemsCount();
      const notAllChecked =
        checkedCount > 0 && checkedCount < getAllChildren().length;

      return notAllChecked;
    };

    const handleParentCheckboxChange: React.ChangeEventHandler<
      HTMLInputElement
    > = () => {
      const newChildCheckboxes: Checkboxes = {};
      getAllChildren().forEach(id => {
        const newState = !isParentChecked();
        newChildCheckboxes[id] = newState;
      });

      setChildCheckboxes(newChildCheckboxes);
    };

    const handleChildCheckboxChange: React.ChangeEventHandler<
      HTMLInputElement
    > = e => {
      const { value } = e.target;
      setChildCheckboxes(prev => ({
        ...prev,
        [value]: !isChildChecked(value),
      }));
    };

    return (
      <Box>
        <Checkbox
          {...args}
          isChecked={isParentChecked()}
          isIndeterminate={isIndeterminate()}
          onChange={handleParentCheckboxChange}
        />
        <Box className="ps-7">
          {childrenCheckboxes.map(({ id, label }) => (
            <Checkbox
              key={id}
              isChecked={isChildChecked(id)}
              onChange={handleChildCheckboxChange}
              label={label}
              value={id}
              testId={id}
            />
          ))}
        </Box>
      </Box>
    );
  },
};
