export type CompareFunction<T> = (a: T, b: T) => number;
export type DirectlyComparableType = string | number | bigint;
export interface PermutationsOptions<T> {
    compare?: CompareFunction<T>;
    slice?: boolean;
}
/**
 * This will return a function that will
 * @param items
 * @param options
 * @returns
 */
export declare const permutations: <T>(items: T[], options?: PermutationsOptions<T>) => () => T[] | null;
/**
 * This will return a function that will
 * @param items
 * @param options
 * @returns
 */
export declare const permutationsIterator: <T>(items: T[], options?: PermutationsOptions<T>) => {
    next(): {
        done: boolean;
        value: T[];
    };
    [Symbol.iterator](): any;
};
/**
 * Get the next permutation for an array of items.
 *
 * @param items
 * @returns
 */
export declare const nextPermutation: (items: DirectlyComparableType[]) => null | undefined;
/**
 * Get the next permutation for an array of items using a compare function.
 *
 * @param items
 * @returns
 */
export declare const nextPermutationCompare: <T>(items: T[], compare: CompareFunction<T>) => null | undefined;
