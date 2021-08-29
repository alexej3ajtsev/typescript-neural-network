
import { NeuralNetwork } from './services/neural-network';
import { Matrix } from './services/matrix';
import { sigmoid } from './utils/common';
const neuralNetwork = new NeuralNetwork(3,3,3,.3)
neuralNetwork.setTestWeights(
  [
    [.9, .3, .4],
    [.2, .8, .2],
    [.1, .5, .6],
  ],
  [
    [.3, .7, .5],
    [.6, .5, .2],
    [.8, .1, .9],
  ],
)

const inputs = new Matrix({
  rows: 3,
  columns: 1,
})
  // Если это матрица для входящих или исходящих значений (т. е. имеет один столбец)
  // то можем опустить вторую цифру
  .setItem([0], .9)
  .setItem([1], .1)
  .setItem([2], .8)

neuralNetwork.printMatrices()
const outputs = neuralNetwork.query(inputs)
outputs.print()