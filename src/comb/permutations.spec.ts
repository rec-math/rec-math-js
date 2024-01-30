import {
  nextPermutation,
  nextPermutationCompare,
  permutations,
  permutationsIterator,
  type CompareFunction,
} from './permutations';

interface Animal {
  name: string;
  legs: number;
}

const man: Animal = { name: 'man', legs: 2 };
const dog: Animal = { name: 'dog', legs: 4 };
const cat: Animal = { name: 'cat', legs: 4 };
const ant: Animal = { name: 'ant', legs: 6 };

const animalPermutations = [
  [man, dog, cat, ant],
  [man, dog, ant, cat],
  // Note that cat comes before dog here because the implementation is not
  // stable by design.
  [man, ant, cat, dog],
  [dog, man, cat, ant],
  [dog, man, ant, cat],
  [dog, cat, man, ant],
  [dog, cat, ant, man],
  [dog, ant, man, cat],
  [dog, ant, cat, man],
  // Again cat comes before dog.
  [ant, man, cat, dog],
  [ant, dog, man, cat],
  [ant, dog, cat, man],
];

const BIG_1 = BigInt(1);
const BIG_2 = BigInt(2);
const BIG_3 = BigInt(3);

const compareAnimal: CompareFunction<Animal> = (a, b) => a.legs - b.legs;

describe('Permutations', () => {
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
    it('should work with distinct items', () => {
      const items = [man, dog, ant];

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([man, ant, dog]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([dog, man, ant]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([dog, ant, man]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([ant, man, dog]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([ant, dog, man]);

      expect(nextPermutationCompare(items, compareAnimal)).toBe(null);
      expect(items).toEqual([ant, dog, man]);
    });

    it('should work with repeated items and is not "stable" (see docs)', () => {
      const items = [man, dog, cat, ant];

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([man, dog, ant, cat]);

      // Note that cat comes before dog here because the implementation is not
      // stable by design.
      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([man, ant, cat, dog]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([dog, man, cat, ant]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([dog, man, ant, cat]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([dog, cat, man, ant]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([dog, cat, ant, man]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([dog, ant, man, cat]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([dog, ant, cat, man]);

      // Again cat comes before dog.
      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([ant, man, cat, dog]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([ant, dog, man, cat]);

      expect(nextPermutationCompare(items, compareAnimal)).toBeUndefined();
      expect(items).toEqual([ant, dog, cat, man]);

      expect(nextPermutationCompare(items, compareAnimal)).toBe(null);
      expect(items).toEqual([ant, dog, cat, man]);
    });
  });

  describe('permutations()', () => {
    it('should work with distinct items', () => {
      const next = permutations([1, 2, 3]);

      expect(next()).toEqual([1, 3, 2]);
      expect(next()).toEqual([2, 1, 3]);
      expect(next()).toEqual([2, 3, 1]);
      expect(next()).toEqual([3, 1, 2]);
      expect(next()).toEqual([3, 2, 1]);
      expect(next()).toBe(null);
    });

    it('should work with repeated items', () => {
      const next = permutations([1, 2, 2, 3]);

      expect(next()).toEqual([1, 2, 3, 2]);
      expect(next()).toEqual([1, 3, 2, 2]);
      expect(next()).toEqual([2, 1, 2, 3]);
      expect(next()).toEqual([2, 1, 3, 2]);
      expect(next()).toEqual([2, 2, 1, 3]);
      expect(next()).toEqual([2, 2, 3, 1]);
      expect(next()).toEqual([2, 3, 1, 2]);
      expect(next()).toEqual([2, 3, 2, 1]);
      expect(next()).toEqual([3, 1, 2, 2]);
      expect(next()).toEqual([3, 2, 1, 2]);
      expect(next()).toEqual([3, 2, 2, 1]);
      expect(next()).toBe(null);
    });

    it('should work with distinct items with a compare function', () => {
      const next = permutations([man, dog, ant], { compare: compareAnimal });

      expect(next()).toEqual([man, ant, dog]);
      expect(next()).toEqual([dog, man, ant]);
      expect(next()).toEqual([dog, ant, man]);
      expect(next()).toEqual([ant, man, dog]);
      expect(next()).toEqual([ant, dog, man]);
      expect(next()).toBe(null);
    });

    it('should work with repeated items with a compare function and is not "stable" (see docs)', () => {
      const next = permutations([man, dog, cat, ant], {
        compare: compareAnimal,
      });

      expect(next()).toEqual([man, dog, ant, cat]);
      // Note that cat comes before dog here because the implementation is not
      // stable by design.
      expect(next()).toEqual([man, ant, cat, dog]);
      expect(next()).toEqual([dog, man, cat, ant]);
      expect(next()).toEqual([dog, man, ant, cat]);
      expect(next()).toEqual([dog, cat, man, ant]);
      expect(next()).toEqual([dog, cat, ant, man]);
      expect(next()).toEqual([dog, ant, man, cat]);
      expect(next()).toEqual([dog, ant, cat, man]);
      // Again cat comes before dog.
      expect(next()).toEqual([ant, man, cat, dog]);
      expect(next()).toEqual([ant, dog, man, cat]);
      expect(next()).toEqual([ant, dog, cat, man]);
      expect(next()).toBe(null);
    });

    it('should work with repeated BigInts', () => {
      const next = permutations([BIG_1, BIG_2, BIG_2, BIG_3]);

      expect(next()).toEqual([BIG_1, BIG_2, BIG_3, BIG_2]);
      expect(next()).toEqual([BIG_1, BIG_3, BIG_2, BIG_2]);
      expect(next()).toEqual([BIG_2, BIG_1, BIG_2, BIG_3]);
      expect(next()).toEqual([BIG_2, BIG_1, BIG_3, BIG_2]);
      expect(next()).toEqual([BIG_2, BIG_2, BIG_1, BIG_3]);
      expect(next()).toEqual([BIG_2, BIG_2, BIG_3, BIG_1]);
      expect(next()).toEqual([BIG_2, BIG_3, BIG_1, BIG_2]);
      expect(next()).toEqual([BIG_2, BIG_3, BIG_2, BIG_1]);
      expect(next()).toEqual([BIG_3, BIG_1, BIG_2, BIG_2]);
      expect(next()).toEqual([BIG_3, BIG_2, BIG_1, BIG_2]);
      expect(next()).toEqual([BIG_3, BIG_2, BIG_2, BIG_1]);
      expect(next()).toBe(null);
    });
  });

  describe('permutationsIterator()', () => {
    it('should work with repeated items with a compare function and is not "stable" (see docs)', () => {
      const perms = permutationsIterator([man, dog, cat, ant], {
        compare: compareAnimal,
      });

      expect(Array.from(perms)).toEqual(animalPermutations);
    });

    it('should reset the iterator', () => {
      const perms = permutationsIterator([man, dog, cat, ant], {
        compare: compareAnimal,
      });

      expect(perms.next().value).toEqual(animalPermutations[0]);
      expect(perms.next().value).toEqual(animalPermutations[1]);
      expect(Array.from(perms)).toEqual(animalPermutations);
      expect(perms.next().done).toBe(true);
    });
  });
});
