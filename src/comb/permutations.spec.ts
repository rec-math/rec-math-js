import {
  nextPermutation,
  nextPermutationCompare,
  permutationsOf,
} from './permutations';

const permutationsOfNumbers = [
  [1, 2, 3],
  [1, 3, 2],
  [2, 1, 3],
  [2, 3, 1],
  [3, 1, 2],
  [3, 2, 1],
];

const permutationsOfBigNumbers = [
  [1n, 2n, 2n, 3n],
  [1n, 2n, 3n, 2n],
  [1n, 3n, 2n, 2n],
  [2n, 1n, 2n, 3n],
  [2n, 1n, 3n, 2n],
  [2n, 2n, 1n, 3n],
  [2n, 2n, 3n, 1n],
  [2n, 3n, 1n, 2n],
  [2n, 3n, 2n, 1n],
  [3n, 1n, 2n, 2n],
  [3n, 2n, 1n, 2n],
  [3n, 2n, 2n, 1n],
];

const permutationsOfStringLengths = [
  ['d', 'cc', 'aaa', 'bbb'],
  // Note that 'bbb' comes before 'aaa' in the next iteration because the
  // implementation is not "stable" (in the sense of a stable sort).
  ['d', 'bbb', 'cc', 'aaa'],
  ['d', 'bbb', 'aaa', 'cc'],
  // Now 'bbb' and 'aaa' swap back.
  ['cc', 'd', 'aaa', 'bbb'],
  ['cc', 'bbb', 'd', 'aaa'],
  ['cc', 'bbb', 'aaa', 'd'],
  ['aaa', 'd', 'cc', 'bbb'],
  ['aaa', 'd', 'bbb', 'cc'],
  ['aaa', 'cc', 'd', 'bbb'],
  ['aaa', 'cc', 'bbb', 'd'],
  ['aaa', 'bbb', 'd', 'cc'],
  ['aaa', 'bbb', 'cc', 'd'],
];

describe('comb/permutations unit tests', () => {
  describe('nextPermutation()', () => {
    it('should work with distinct items', () => {
      const items = [1, 2, 3];

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([1, 3, 2]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([2, 1, 3]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([2, 3, 1]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([3, 1, 2]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([3, 2, 1]);

      expect(nextPermutation(items)).toBe(null);
      expect(items).toEqual([3, 2, 1]);
    });

    it('should work with repeated items', () => {
      const items = [1, 2, 2, 3];

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([1, 2, 3, 2]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([1, 3, 2, 2]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([2, 1, 2, 3]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([2, 1, 3, 2]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([2, 2, 1, 3]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([2, 2, 3, 1]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([2, 3, 1, 2]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([2, 3, 2, 1]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([3, 1, 2, 2]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([3, 2, 1, 2]);

      expect(nextPermutation(items)).toBeUndefined();
      expect(items).toEqual([3, 2, 2, 1]);

      expect(nextPermutation(items)).toBe(null);
      expect(items).toEqual([3, 2, 2, 1]);
    });
  });

  describe('nextPermutationCompare()', () => {
    it('should work with repeated items and is not "stable" (see docs)', () => {
      const strings = ['aaa', 'bbb', 'cc', 'd'];
      const compare = (a: string, b: string) => a.length - b.length;

      for (let i = 0; nextPermutationCompare(strings, compare) !== null; ++i) {
        expect(strings).toEqual(permutationsOfStringLengths[i]);
      }
    });
  });

  describe('permutationsOf()', () => {
    it('should work with numbers', () => {
      let i = 0;
      for (const perm of permutationsOf([3, 2, 1])) {
        expect(perm).toEqual(permutationsOfNumbers[i]);
        ++i;
      }
    });

    it('should work with repeated BigInts', () => {
      let i = 0;
      for (const perm of permutationsOf([3n, 2n, 1n, 2n])) {
        expect(perm).toEqual(permutationsOfBigNumbers[i]);
        ++i;
      }
    });

    it('should work with repeated items with a compare function and is not "stable" (see docs)', () => {
      const strings = ['aaa', 'bbb', 'cc', 'd'];
      const compare = (a: string, b: string) => a.length - b.length;

      let i = 0;
      for (const perm of permutationsOf(strings, { compare })) {
        expect(perm).toEqual(permutationsOfStringLengths[i]);
        ++i;
      }
    });

    it('should reset the iterator when slicing', () => {
      const perms = permutationsOf([3, 2, 1], { slice: true });

      expect(perms.next().value).toEqual(permutationsOfNumbers[0]);
      expect(perms.next().value).toEqual(permutationsOfNumbers[1]);

      expect(Array.from(perms)).toEqual(permutationsOfNumbers);

      expect(perms.next().done).toBe(true);

      expect(Array.from(perms)).toEqual(permutationsOfNumbers);
    });

    it('should reset the iterator when not slicing', () => {
      const perms = permutationsOf([3, 2, 1]);

      expect(perms.next().value).toEqual(permutationsOfNumbers[0]);
      expect(perms.next().value).toEqual(permutationsOfNumbers[1]);

      expect(Array.from(perms)).not.toEqual(permutationsOfNumbers);

      let i = 0;
      for (const perm of perms) {
        expect(perm).toEqual(permutationsOfNumbers[i]);
        ++i;
      }

      expect(perms.next().done).toBe(true);

      i = 0;
      for (const perm of perms) {
        expect(perm).toEqual(permutationsOfNumbers[i]);
        ++i;
      }
    });
  });
});
