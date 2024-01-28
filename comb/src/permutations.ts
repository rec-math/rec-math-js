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
export const permutations = <T>(
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
 * This will return a function that will
 * @param items
 * @param options
 * @returns
 */
export const permutationsIterator = <T>(
  items: T[],
  options: PermutationsOptions<T> = {},
) => {
  const next = permutations(items, options);
  const done = { done: true, value: items };
  const value = { done: false, value: items };
  let isFirst = true;
  return {
    next() {
      if (isFirst) {
        isFirst = false;
        return options.slice ? { done: false, value: items.slice() } : value;
      }
      return next() === null
        ? done
        : options.slice
          ? { done: false, value: items.slice() }
          : value;
    },
    [Symbol.iterator]() {
      // Reset to first lexicographic permutation.
      items.sort(options.compare);
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
