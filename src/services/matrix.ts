export type ActivationFn = (num: number) => number;

export interface Matrix {
  name?: string;
  data: number[][];
  setItem(rowCol: [number, number], val: number): void;
  multiply(matrix: Matrix): Matrix;
  activate(fn: ActivationFn): Matrix;
  print(): void;
}

export type MatrixOptions = {
  rows: number;
  columns: number;
  randFill?: boolean;
  name?: string;
}

export class Matrix {
    public rows: number = 0;
    public columns: number = 0;
    constructor(options: MatrixOptions) {
      this.rows = options.rows;
      this.columns = options.columns;
      this.data = [];
      this.name = `[${options.name ? options.name + ' ' : ''}${options.rows} x ${options.columns} ] `;
      let i = options.rows;
      while (i > 0) {
        const initialValue = !options.randFill ? 0.0 : (Math.random() - 0.5).toFixed(3);
        this.data.push(new Array(options.columns).fill(initialValue))
        i--;
      }
    }
    setItem(rowCol: [number, number?], val: number) {
      const [row, col = 0] = rowCol;
      if (row + 1 > this.rows) {
        console.error(`You try set value in row #${row + 1}, but only ${this.rows} exists`)
        return this;
      }
      if (col + 1 > this.columns) {
        console.error(`You try set value in column #${col + 1}, but only ${this.columns} exists`)
        return this;
      }
      this.data[row][col] = val;
      return this;
    };

    multiply(matrix: Matrix) {
      if (this.columns !== matrix.rows) {
        throw new Error('You can\'t multiply this matricies, cause first.columns !== second.rows')
      }
      const result = new Matrix({
        rows: this.rows,
        columns: matrix.columns
      });

      for (let i = 0; i < this.rows; i++) {
        const currentRow = this.data[i]
        for (let j = 0; j < matrix.columns; j++) {
          const sum = currentRow.reduce((acc, rowItem, ix) => acc + rowItem * matrix.data[ix][j], 0)
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