export type ActivationFn = (num: number) => number;

export type MatrixOptions = {
  rows: number;
  columns: number;
  randFill?: boolean;
  name?: string;
}
export class Matrix {
    public name?: string;
    public data: number[][] = [];
    public rows: number = 0;
    public columns: number = 0;

    constructor(options?: MatrixOptions) {
      if (typeof options === 'undefined') {
        return;
      }
      this.rows = options.rows;
      this.columns = options.columns;
      this.data = [];
      this.setName(options.name as string);
      let i = options.rows;
      while (i > 0) {
        const initialValue = !options.randFill ? 0.0 : (Math.random() - 0.5).toFixed(3);
        this.data.push(new Array(options.columns).fill(initialValue))
        i--;
      }
    }

    setWeights(data: number[][]) {
      this.data = data;
      return this;
    }

    /**
     * Можно удобно засетить веса в один столбец, 
     * подходит для создания матриц входных значений и матриц целевых значений
     * @param weights 
     */
    setOneColumnValues(values: number[]) {
      this.columns = 1;
      this.rows = values.length;
      this.data = []
      values.forEach((value, ix) => {
        this.data[ix] = [value];
      });
      return this;
    }

    setName(name: string) {
        this.name = `[${name ? name + ' ' : ''}${this.rows} x ${this.columns} ] `;
        return this;
    }
    setItem(rowCol: [number, number?], val: number) {
      const [row, col = 0] = rowCol;
      if (row + 1 > this.rows) {
        throw new Error(`You try set value in row #${row + 1}, but only ${this.rows} exists`);
      }
      if (col + 1 > this.columns) {
        throw new Error(`You try set value in column #${col + 1}, but only ${this.columns} exists`);
      }
      this.data[row][col] = val;
      return this;
    };

    multiply(input: Matrix | number) {
      const inputIsMatrix = input instanceof Matrix;
      if (inputIsMatrix && this.rows !== (input as Matrix).rows) {
        throw new Error('You can\'t multiply matricies with different rows quantity');
      }
      const result = new Matrix({
        rows: this.rows,
        columns: this.columns,
      })

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (inputIsMatrix)
            result.setItem([i, j], this.data[i][j] * (input as Matrix).data[i][j]);
          else
            result.setItem([i, j], this.data[i][j] * (input as number));
        }
      }

      return result;
    }

    add(input: Matrix | number) {
      const inputIsMatrix = input instanceof Matrix;
      if (inputIsMatrix && this.rows !== (input as Matrix).rows) {
        throw new Error('You can\'t add matricies with different rows quantity');
      }
      const result = new Matrix({
        rows: this.rows,
        columns: this.columns,
      })

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (inputIsMatrix)
            result.setItem([i, j], this.data[i][j] + (input as Matrix).data[i][j]);
          else
            result.setItem([i, j], this.data[i][j] + (input as number));
        }
      }
      return result;
    }

    subtractFrom(from: Matrix | number) {
      const fromIsMatrix = from instanceof Matrix;
      if (fromIsMatrix && this.rows !== (from as Matrix).rows) {
        throw new Error('You can\'t subtract matrix from matrix with different rows');
      }

      const result = new Matrix({
        rows: this.rows,
        columns: this.columns,
      })

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (fromIsMatrix) {
            result.setItem([i, j], (from as Matrix).data[i][j] - this.data[i][j]);
          } else {
            result.setItem([i, j], (from as number) - this.data[i][j]);
          }
        }
      }
      return result;
    }

    normalizeValues() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.setItem([i, j], Number(this.data[i][j].toFixed(3)));
        }
      }
      return this;
    }

    subtract(input: Matrix | number) {
      const inputIsMatrix = input instanceof Matrix;
      if (inputIsMatrix && this.rows !== (input as Matrix).rows) {
        throw new Error('You can\'t add matricies with different rows quantity');
      }
      const result = new Matrix({
        rows: this.rows,
        columns: this.columns,
      })

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (inputIsMatrix)
            result.setItem([i, j], this.data[i][j] - (input as Matrix).data[i][j]);
          else
            result.setItem([i, j], this.data[i][j] - (input as number));
        }
      }

      return result;
    }

    dotProduct(matrix: Matrix) {
      if (this.columns !== matrix.rows) {
        throw new Error('You can\'t dot product this matricies, cause first.columns !== second.rows');
      }
      const result = new Matrix({
        rows: this.rows,
        columns: matrix.columns
      });

      for (let i = 0; i < this.rows; i++) {
        const currentRow = this.data[i]
        for (let j = 0; j < matrix.columns; j++) {
          const sum = currentRow
            .reduce(
              (acc, rowItem, ix) => acc + rowItem * matrix.data[ix][j],
              0
            )
          result.setItem([i, j], Number(sum.toFixed(3)))
        }
      }
      return result;
    }

    activate(fn: ActivationFn) {
      if (this.columns > 1) {
        throw new Error("Activate can be used on one columns matricies");
      }
      const result = new Matrix({ rows: this.rows, columns: this.columns });
      for (let i = 0; i < this.rows; i++) {
        for(let j = 0; j < this.columns; j++) {
          result.setItem([i,j], Number(fn(this.data[i][j]).toFixed(3)))
        }
      }      
      return result
    }

    diff(matrix: Matrix) {
      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new Error('You can\'t get diff between matricies with different rows or columns quantities')
      }
      const result = new Matrix({ rows: this.rows, columns: this.columns })
      for (let i = 0; i < this.rows; i++) {
        for(let j = 0; j < this.columns; j++) {
          result.setItem([i,j], this.data[i][j] - matrix.data[i][j])
        }
      }      
      return result
    }
 
    print() {
      console.log(JSON.stringify(this.data, (...args) => {
        const [, value] = args;
        if (Array.isArray(value) && value.length && !Array.isArray(value[0])) {
          return `${value.join(' , ')}`
        }
        return value;
      }, 0).replace(/\]/g, '\n<<').replace(/\[/g, `\n${this.name}>>\n\t`).replace(/\"\,\"/g, '\n\t').replace(/\"/g, ''))
      return this;
    }
    // input [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]
    // output [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
    public static transpose(matrix: Matrix) {
      const result = new Matrix({ rows: matrix.columns, columns: matrix.rows })
      for (let i = 0; i < matrix.rows; i++) {
        for(let j = 0; j < matrix.columns; j++) {
          result.setItem([j, i], matrix.data[i][j])
        }
      }
      return result;
    }
}

// Пример использования:
// const m1 = new Matrix({
//   rows: 3,
//   columns: 3
// })
//   // first column
//   .setItem([0,0], .9)
//   .setItem([1,0], .2)
//   .setItem([2,0], .1)

//   // second column
//   .setItem([0,1], .3)
//   .setItem([1,1], .8)
//   .setItem([2,1], .5)

//   // third column
//   .setItem([0,2], .4)
//   .setItem([1,2], .2)
//   .setItem([2,2], .6)
//   .print()

// const m2 = new Matrix({
//   rows: 3,
//   columns: 1
// })
//   .setItem([0,0], .9)
//   .setItem([1,0], .1)
//   .setItem([2,0], .8)
//   .print()

// const result = m1.multiply(m2)
// result.print()