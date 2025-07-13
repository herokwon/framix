// =============================================================================
// Polymorphic Component Types
// =============================================================================

/**
 * Internal type for 'as' prop used in polymorphic components
 * Allows components to be rendered as different HTML elements
 */
type AsProp<T extends React.ElementType> = {
  as?: T;
};

/**
 * Extracts the correct ref type for a given React element type
 * Ensures type safety when using refs with polymorphic components
 *
 * @example
 * type ButtonRef = PolymorphicRef<'button'>;    // React.Ref<HTMLButtonElement>
 * type DivRef = PolymorphicRef<'div'>;          // React.Ref<HTMLDivElement>
 * type CustomRef = PolymorphicRef<MyComponent>; // React.Ref<MyComponent>
 */
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

/**
 * Polymorphic component props without ref
 * Combines 'as' prop, custom props, and element-specific props while avoiding conflicts
 *
 * @template T - The React element type (e.g., 'div', 'button', or custom component)
 * @template P - Additional custom props specific to the component
 *
 * @example
 * interface ButtonProps {
 *   variant: 'primary' | 'secondary';
 *   size: 'sm' | 'md' | 'lg';
 * }
 *
 * type MyButtonProps = PolymorphicPropsWithoutRef<'button', ButtonProps>;
 * // Result: { as?: 'button'; variant: 'primary' | 'secondary'; size: 'sm' | 'md' | 'lg'; } & button props
 */
export type PolymorphicPropsWithoutRef<
  T extends React.ElementType,
  P = unknown,
> = AsProp<T> &
  P &
  Omit<React.ComponentPropsWithoutRef<T>, keyof (AsProp<T> & P)>;

/**
 * Polymorphic component props with ref support
 * Extends PolymorphicPropsWithoutRef with properly typed ref prop
 *
 * @template T - The React element type (e.g., 'div', 'button', or custom component)
 * @template P - Additional custom props specific to the component
 *
 * @example
 * // React 19+ - No forwardRef needed
 * const Button = <T extends React.ElementType = 'button'>(
 *   props: PolymorphicPropsWithRef<T, ButtonProps>
 * ) => {
 *   const { as: Component = 'button', ref, ...rest } = props;
 *   return <Component ref={ref} {...rest} />;
 * };
 *
 * // React 18 and below - forwardRef required
 * const Button = React.forwardRef<
 *   PolymorphicRef<'button'>,
 *   PolymorphicPropsWithRef<'button', ButtonProps>
 * >((props, ref) => {
 *   const { as: Component = 'button', ...rest } = props;
 *   return <Component ref={ref} {...rest} />;
 * });
 *
 * // Usage (same for both versions)
 * <Button as="a" href="/link">Link Button</Button>
 * <Button as="button" onClick={() => {}}>Regular Button</Button>
 */
export type PolymorphicPropsWithRef<
  T extends React.ElementType,
  P = unknown,
> = PolymorphicPropsWithoutRef<T, P> & {
  ref?: PolymorphicRef<T>;
};
