import { Matrix } from './matrix';

describe('Matrix:', () => {
  test('Should correctly dot product', () => {
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
    
    const result = m1.dotProduct(m2);
    expect(result.data[0][0]).toBe(19);
    expect(result.data[0][1]).toBe(22);
    expect(result.data[1][0]).toBe(43);
    expect(result.data[1][1]).toBe(50);
  });

  test('Should correctly transpose matrix', () => {
    // input [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]
    // output [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
    const m1 = new Matrix({
      rows: 3,
      columns: 3
    })
      .setItem([0,0], 1)
      .setItem([0,1], 2)
      .setItem([0,2], 3)
      .setItem([1,0], 4)
      .setItem([1,1], 5)
      .setItem([1,2], 6)
      .setItem([2,0], 7)
      .setItem([2,1], 8)
      .setItem([2,2], 9)

    const result = Matrix.transpose(m1);
    expect(result.data[0][0]).toBe(1);
    expect(result.data[0][1]).toBe(4);
    expect(result.data[0][2]).toBe(7);
    expect(result.data[1][0]).toBe(2);
    expect(result.data[1][1]).toBe(5);
    expect(result.data[1][2]).toBe(8);
    expect(result.data[2][0]).toBe(3);
    expect(result.data[2][1]).toBe(6);
    expect(result.data[2][2]).toBe(9);
  })

  test('Should correctly multiply (*) matrix', () => {
    // input [ [1, 2, 3] ] * [ [2, 4, 6] ]
    // output [ [2, 8, 18] ]
    const m1 = new Matrix({
      rows: 1,
      columns: 3
    })
      .setItem([0,0], 1)
      .setItem([0,1], 2)
      .setItem([0,2], 3)
    const m2 = new Matrix({
      rows: 1,
      columns: 3
    })
      .setItem([0,0], 2)
      .setItem([0,1], 4)
      .setItem([0,2], 6)

    const result = m1.multiply(m2);
    expect(result.data[0][0]).toBe(2);
    expect(result.data[0][1]).toBe(8);
    expect(result.data[0][2]).toBe(18);
  })

  test('Should correctly multiply matrix (*) to number', () => {
    // input [ [1, 2, 3] ] * 2
    // output [ [2, 4, 6] ]
    const m1 = new Matrix({
      rows: 1,
      columns: 3
    })
      .setItem([0,0], 1)
      .setItem([0,1], 2)
      .setItem([0,2], 3)

    const result = m1.multiply(2);
    expect(result.data[0][0]).toBe(2);
    expect(result.data[0][1]).toBe(4);
    expect(result.data[0][2]).toBe(6);
  })

  test('Should correctly add matrix', () => {
    // input [ [1, 2, 3] ] + [ [2, 4, 6] ]
    // output [ [3, 6, 9] ]
    const m1 = new Matrix({
      rows: 1,
      columns: 3
    })
      .setItem([0,0], 1)
      .setItem([0,1], 2)
      .setItem([0,2], 3)
    const m2 = new Matrix({
      rows: 1,
      columns: 3
    })
      .setItem([0,0], 2)
      .setItem([0,1], 4)
      .setItem([0,2], 6)

    const result = m1.add(m2);
    expect(result.data[0][0]).toBe(3);
    expect(result.data[0][1]).toBe(6);
    expect(result.data[0][2]).toBe(9);
  })

  test('Should correctly add matrix to number', () => {
    // input [ [1, 2, 3] ] + 1
    // output [ [2, 3, 4] ]
    const m1 = new Matrix({
      rows: 1,
      columns: 3
    })
      .setItem([0,0], 1)
      .setItem([0,1], 2)
      .setItem([0,2], 3)
    const result = m1.add(1);
    expect(result.data[0][0]).toBe(2);
    expect(result.data[0][1]).toBe(3);
    expect(result.data[0][2]).toBe(4);
  })

  test('Should correctly subtract matrix from number', () => {
    // input 1 - [ [1, 2, 3], [2, 3, 4] ]
    // output [ [0, -1, -2], [-1, -2, -3] ]
    const m1 = new Matrix({
      rows: 2,
      columns: 3
    })
      .setItem([0,0], 1)
      .setItem([0,1], 2)
      .setItem([0,2], 3)
      .setItem([1,0], 2)
      .setItem([1,1], 3)
      .setItem([1,2], 4)
    const result = m1.subtractFrom(1);
    expect(result.data[0][0]).toBe(0);
    expect(result.data[0][1]).toBe(-1);
    expect(result.data[0][2]).toBe(-2);
    expect(result.data[1][0]).toBe(-1);
    expect(result.data[1][1]).toBe(-2);
    expect(result.data[1][2]).toBe(-3);
  })
})