import type {
  ELEMENT_COLORS,
  ELEMENT_SIZES,
  ELEMENT_SPACINGS,
  ELEMENT_STATUS,
  ELEMENT_VARIANTS,
} from '@data';

// =============================================================================
// Type Branding
// =============================================================================

/**
 * Utility type for type branding
 * Used to distinguish between types that have the same primitive type but different semantic meanings
 *
 * @example
 * type UserId = Brand<string, 'UserId'>;
 * type ProductId = Brand<string, 'ProductId'>;
 *
 * const userId: UserId = 'user-123' as UserId;
 * const productId: ProductId = 'product-456' as ProductId;
 * // userId = productId; // ❌ Type error
 */
export type Brand<T, B> = T & { __brand: B };

// =============================================================================
// Array & Collection Types
// =============================================================================

/**
 * Extracts element type from array or readonly array
 *
 * @example
 * type StringArray = ArrayElement<string[]>;        // string
 * type NumberArray = ArrayElement<readonly number[]>; // number
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

// =============================================================================
// Object Key/Value Manipulation
// =============================================================================

/**
 * Extracts keys from object that have values of specific type
 *
 * @example
 * interface User {
 *   id: string;
 *   name: string;
 *   age: number;
 *   isActive: boolean;
 * }
 *
 * type StringKeys = KeysOfType<User, string>; // 'id' | 'name'
 * type NumberKeys = KeysOfType<User, number>; // 'age'
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Type-safe Omit - throws compile error when using non-existent keys
 *
 * @example
 * interface User { id: string; name: string; email: string; }
 *
 * type UserWithoutId = StrictOmit<User, 'id'>;        // ✅ { name: string; email: string; }
 * type Error = StrictOmit<User, 'nonexistent'>;       // ❌ Type error
 */
export type StrictOmit<T, K extends keyof T> = [K] extends [never]
  ? T
  : [K] extends [keyof T]
    ? Pick<T, Exclude<keyof T, K>>
    : never;

/**
 * Type-safe Extract - all K must be included in T
 *
 * @example
 * type Colors = 'red' | 'blue' | 'green';
 *
 * type ValidExtract = StrictExtract<Colors, 'red' | 'blue'>;     // 'red' | 'blue'
 * type InvalidExtract = StrictExtract<Colors, 'red' | 'yellow'>; // never
 */
export type StrictExtract<T, K extends T> = [K] extends [T] ? K : never;

/**
 * Type-safe Exclude - all U must be included in T
 *
 * Ensures that every member of U exists in T.
 * If any member of U is not part of T, the type resolves to `never`
 * (producing a compile-time error).
 *
 * @example
 * type Colors = 'red' | 'blue' | 'green';
 *
 * type Valid = StrictExclude<Colors, 'red' | 'blue'>;    // 'green'
 * type Error = StrictExclude<Colors, 'yellow'>;          // ❌ Type error
 */
export type StrictExclude<T, U extends T> = [U] extends [T]
  ? Exclude<T, U>
  : never;

// =============================================================================
// Conditional Logic Types
// =============================================================================

/**
 * Implements conditional logic at type level
 *
 * @example
 * type Result = If<true, string, number>;   // string
 * type Result2 = If<false, string, number>; // number
 */
export type If<C extends boolean, T, F> = C extends true ? T : F;

/**
 * Logical NOT operation for boolean types
 *
 * @example
 * type Result = Not<true>;   // false
 * type Result2 = Not<false>; // true
 */
export type Not<T extends boolean> = T extends true ? false : true;

export type ElementColor = (typeof ELEMENT_COLORS)[number];
export type ElementSize = (typeof ELEMENT_SIZES)[number];
export type ElementSpacing = (typeof ELEMENT_SPACINGS)[number];
export type ElementStatus = (typeof ELEMENT_STATUS)[number];
export type ElementStatusProps = {
  [status in ElementStatus]?: boolean;
};
export type ElementVariant = (typeof ELEMENT_VARIANTS)[number];

export type MaxWidth = ElementSize | 'xl';

type TestIdProps = {
  testId?: string;
};
type LabelProps = {
  label?: string;
};
/**
 * Shared optional prop set applied to all components, branching by the BlockLabel flag.
 *
 * @template BlockLabel - If true, suppresses the label prop and only allows `testId` (useful when enforcing internal-only label generation for semantic/a11y policy).
 * @example
 * type A = EssentialProps<false>; // { testId?: string; label?: string }
 * type B = EssentialProps<true>;  // { testId?: string }
 */
export type EssentialProps<BlockLabel extends boolean> = BlockLabel extends true
  ? TestIdProps
  : TestIdProps & LabelProps;
/**
 * Merges the base props of HTMLElement or custom component T (with `aria-label` removed)
 * and the library's shared props (EssentialProps).
 *
 * @template T - React.ElementType (e.g. 'button', 'div', custom component)
 * @template BlockLabel - If true, blocks the label prop (see EssentialProps docs)
 * @remarks `aria-label` is omitted to enforce a unified `label` prop / accessibility pattern.
 * If a component genuinely needs `aria-label`, provide a separate escape hatch type.
 *
 * @see {@link EssentialProps}
 */
export type ComponentProps<
  T extends React.ElementType,
  BlockLabel extends boolean = false,
> = Omit<React.ComponentProps<T>, 'aria-label'> & EssentialProps<BlockLabel>;
/**
 * Ref-inclusive version based on React.ComponentPropsWithRef<T>.
 *
 * @template T - React.ElementType
 * @template BlockLabel - Whether to block the label prop
 *
 * @see {@link EssentialProps}
 */
export type ComponentPropsWithRef<
  T extends React.ElementType,
  BlockLabel extends boolean = false,
> = Omit<React.ComponentPropsWithRef<T>, 'aria-label'> &
  EssentialProps<BlockLabel>;
/**
 * Ref-excluding version based on React.ComponentPropsWithoutRef<T>.
 *
 * @template T - React.ElementType
 * @template BlockLabel - Whether to block the label prop
 *
 * @see {@link EssentialProps}
 */
export type ComponentPropsWithoutRef<
  T extends React.ElementType,
  BlockLabel extends boolean = false,
> = Omit<React.ComponentPropsWithoutRef<T>, 'aria-label'> &
  EssentialProps<BlockLabel>;

type CamelCaseRest<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Head extends ' ' | '_' | '-'
    ? CamelCaseAfterSeparator<Tail>
    : `${Head}${CamelCaseRest<Tail>}`
  : S;
type CamelCaseAfterSeparator<S extends string> =
  S extends `${infer Head}${infer Tail}`
    ? Head extends ' ' | '_' | '-'
      ? CamelCaseAfterSeparator<Tail>
      : `${Uppercase<Head>}${CamelCaseRest<Tail>}`
    : S;
/**
 * Type-level utility that converts a string literal to camelCase.
 * Treats spaces / underscores / hyphens as separators and capitalizes the following character.
 *
 * @template S - String literal to transform
 * @example
 * type A = CamelCase<'hello-world'>; // 'helloWorld'
 * type B = CamelCase<'  foo_bar-baz'>; // 'fooBarBaz'
 */
export type CamelCase<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Head extends ' ' | '_' | '-'
    ? CamelCase<Tail>
    : `${Lowercase<Head>}${CamelCaseRest<Tail>}`
  : S;
