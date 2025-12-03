// =============================================================================
// Polymorphic Component Types
// =============================================================================
import type { ComponentPropsWithoutRef } from './common';

/**
 * Allows the component to render as a different host element or custom component.
 *
 * @template T - React.ElementType to render (e.g. 'div', 'button', custom component)
 *
 * @example
 * <Box as="button">Button-like box</Box>
 */
interface AsProp<T extends React.ElementType> {
  as?: T;
}

/**
 * Extracts the ref type exposed by a given ElementType.
 *
 * Works with both intrinsic JSX elements (e.g. 'button') and custom components,
 * and stays compatible with React 19’s ref model as well as forwardRef.
 *
 * @template T - React.ElementType whose ref type should be inferred
 *
 * @example
 * type ButtonRef = PolymorphicRef<'button'>;    // React.Ref<HTMLButtonElement>
 * type DivRef = PolymorphicRef<'div'>;          // React.Ref<HTMLDivElement>
 * type CustomRef = PolymorphicRef<MyComponent>; // React.Ref<MyComponent>
 */
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

/**
 * Base props for a polymorphic component **without** ref support.
 *
 * Merges:
 * - the props of the `as` ElementType T (with library-level normalization from ComponentPropsWithoutRef)
 * - the component’s own custom props P
 * - the `as` override itself
 *
 * On key collisions, custom props P and the `as` prop take precedence over
 * the underlying element props, which keeps the external API consistent.
 *
 * @template T - ElementType being rendered (e.g. 'div', 'button', custom component)
 * @template P - Additional custom prop bag specific to the polymorphic component
 *
 * @see {@link AsProp}
 * @see {@link ComponentPropsWithoutRef}
 */
export type PolymorphicPropsWithoutRef<
  T extends React.ElementType,
  P = unknown,
> = AsProp<T> & P & Omit<ComponentPropsWithoutRef<T>, keyof (AsProp<T> & P)>;

/**
 * Ref-enabled variant of PolymorphicPropsWithoutRef.
 *
 * Adds an optional `ref` prop that is correctly typed for the resolved ElementType T,
 * so consumers can attach refs without having to manually annotate them.
 *
 * @template T - ElementType being rendered
 * @template P - Additional custom prop bag
 *
 * @example
 * type ButtonProps = { variant: 'primary' | 'secondary' };
 *
 * const Button = <T extends React.ElementType = 'button'>(
 *   props: PolymorphicPropsWithRef<T, ButtonProps>,
 * ) => {
 *   const { as: Component = 'button', ref, ...rest } = props;
 *   return <Component ref={ref} {...rest} />;
 * };
 *
 * @see {@link PolymorphicPropsWithoutRef}
 * @see {@link PolymorphicRef}
 */
export type PolymorphicPropsWithRef<
  T extends React.ElementType,
  P = unknown,
> = PolymorphicPropsWithoutRef<T, P> & {
  ref?: PolymorphicRef<T>;
};
