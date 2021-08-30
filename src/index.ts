
import { NeuralNetwork } from './services/neural-network';
import { Matrix } from './services/matrix';

const neuralNetwork = new NeuralNetwork(3,3,3,.1)
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
  name: 'inputs'
})
  // Если это матрица для входящих или исходящих значений (т. е. имеет один столбец)
  // то можем опустить вторую цифру
  .setItem([0], .9)
  .setItem([1], .1)
  .setItem([2], .8)

const targetOutputs = new Matrix({
  rows: inputs.rows,
  columns: inputs.columns,
  name: 'target-outputs'
})
  .setItem([0], .98)
  .setItem([1], .75)
  .setItem([2], .1)

const beforeTrainOutput = neuralNetwork.query(inputs); 
const errorsBeforeTrain = beforeTrainOutput.subtractFrom(targetOutputs);
errorsBeforeTrain.setName('errors-before-train').print();

neuralNetwork.train(inputs, targetOutputs, 10000);

const afterTrainOutput = neuralNetwork.query(inputs); 
const errorsAfterTrain = afterTrainOutput.subtractFrom(targetOutputs);
errorsAfterTrain.setName('errors-after-train').normalizeValues().print();

