import { Matrix } from './matrix';

const m1 = new Matrix({
  rows: 2,
  columns: 2
})
  .setItem([0,0], 1)
  .setItem([1,0], 3)
  .setItem([0,1], 2)
  .setItem([1,1], 4)

const m2 = new Matrix({
  rows: 2,
  columns: 2
})
  .setItem([0,0], 5)
  .setItem([0,1], 6)
  .setItem([1,0], 7)
  .setItem([1,1], 8)



test('Correctly multiply matricies', () => {
  const result = m1.multiply(m2);
  expect(result.data[0][0]).toBe(19);
  expect(result.data[0][1]).toBe(22);
  expect(result.data[1][0]).toBe(43);
  expect(result.data[1][1]).toBe(50);
});