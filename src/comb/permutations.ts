export type CompareFunction<T> = (a: T, b: T) => number;

export type DirectlyComparableType = string | number | bigint;

export interface PermutationsOptions<T> {
  /** Compare function. */
  compare?: CompareFunction<T>;
  /** Slice the items instead of iterating in place. */
  slice?: boolean;
}

/**
 * This is a helper function to choose once between `nextPermutation()` or
 * `nextPermutationCompare()` as required.
 */
const getNextPermutation = <T>(
  items: T[],
  options: PermutationsOptions<T> = {},
) => {
  if (options.compare) {
    const compare = options.compare as CompareFunction<T>;
    return () =>
      nextPermutationCompare(items, compare) === null ? null : items;
  }

  // Do not need compare function.
  return () =>
    nextPermutation(items as DirectlyComparableType[]) === null ? null : items;
};

/**
 * Get an iterator over the permutations of the elements of an array.
 *
 * The items are first sorted into ascending order (using a compare function if
 * provided as `options.compare`) and then permuted lexicographically. The
 * provided array is mutated in place unless `options.slice` is `true`.
 *
 * When using `options.compare`, note that although the initial sort is stable,
 * the permutation algorithm is not so the order of elements that compare as
 * equal may not be consistent.
 *
 * Example usage:
 * ```
 * // Works as expected.
 * for (const perm of permutationsOf([1, 2, 3])) {
 *   console.log(perm}
 * }
 *
 * // Here we see that the order of items that compare equal is not stable.
 * const strings = ['aaa', 'bbb', 'cc', 'd'];
 * const compare = (a, b) => (a.length - b.length);
 * const perms = permutationsOf(strings, { compare });
 * console.log(perm.next().value); // ['d', 'cc', 'aaa', 'bbb']
 * console.log(perm.next().value); // ['d', 'bbb', 'cc', 'aaa']
 *
 * // Here we must use the `slice: true` option to get the expected result.
 * console.log(Array.from(permutationsOf([1, 2, 3], { slice: true })));
 * ```
 */
export const permutationsOf = <T>(
  items: T[],
  options: PermutationsOptions<T> = {},
): IterableIterator<T[]> => {
  const { compare } = options;

  let isFirst = true;
  if (options.slice) {
    // Need to be careful when working with potentially repeated items because
    // the permutations generator is not "stable" in the sense of a stable sort.
    const initialItems = items.slice();
    initialItems.sort(compare);

    let workingItems = initialItems.slice();
    let getNext = getNextPermutation(workingItems, options);

    return {
      next() {
        if (isFirst) {
          isFirst = false;
          return { value: workingItems.slice() };
        }
        return getNext() === null
          ? { done: true, value: workingItems.slice() }
          : { value: workingItems.slice() };
      },
      [Symbol.iterator]() {
        // Reset to first lexicographic permutation.
        workingItems = initialItems.slice();
        getNext = getNextPermutation(workingItems, options);
        isFirst = true;
        return this;
      },
    };
  }

  // Don't care about slicing the items.
  items.sort(compare);
  const getNext = getNextPermutation(items, options);
  const done = { done: true, value: items };
  const value = { value: items };
  return {
    next() {
      if (isFirst) {
        isFirst = false;
        return value;
      }
      return getNext() === null ? done : value;
    },
    [Symbol.iterator]() {
      // Reset to first lexicographic permutation.
      items.sort(compare);
      isFirst = true;
      return this;
    },
  };
};

/**
 * Get the next permutation for an array of items.
 *
 * @param items
 * @returns
 */
export const nextPermutation = (items: DirectlyComparableType[]) => {
  const lastItem = items.length - 1;

  let j = lastItem - 1;
  while (items[j] >= items[j + 1]) {
    --j;
    if (j < 0) return null;
  }

  let l = lastItem;
  while (items[j] >= items[l]) {
    --l;
  }

  let temp = items[j];
  items[j] = items[l];
  items[l] = temp;

  l = lastItem;
  ++j;
  while (j < l) {
    temp = items[j];
    items[j] = items[l];
    items[l] = temp;
    ++j;
    --l;
  }
};

/**
 * Get the next permutation for an array of items using a compare function.
 *
 * @param items
 * @returns
 */
export const nextPermutationCompare = <T>(
  items: T[],
  compare: CompareFunction<T>,
) => {
  const lastItem = items.length - 1;

  let j = lastItem - 1;
  while (compare(items[j], items[j + 1]) >= 0) {
    --j;
    if (j < 0) return null;
  }

  let l = lastItem;
  while (compare(items[j], items[l]) >= 0) {
    --l;
  }

  let temp = items[j];
  items[j] = items[l];
  items[l] = temp;

  l = lastItem;
  ++j;
  while (j < l) {
    temp = items[j];
    items[j] = items[l];
    items[l] = temp;
    ++j;
    --l;
  }
};
