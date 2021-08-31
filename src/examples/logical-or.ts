
import { NeuralNetwork } from '../services/neural-network';
import { Matrix } from '../services/matrix';

const neuralNetwork = new NeuralNetwork(3,3,3,.01)
neuralNetwork.setTestWeights(
  [
    [.345, .3, .4],
    [.2, .266, .5],
    [.32, .189, .2],
  ],
  [
    [.3, .233, .222],
    [.51, .401, .2],
    [.24, .15, .3],
  ],
)

const inputsAndTargets: [Matrix, Matrix][] = [
  [
    // input
    new Matrix().setOneColumnValues([
      0.01,
      0.01,
      0.99
    ]),
    // target output
    new Matrix().setOneColumnValues([
      0.01,
      0.99,
      0.01,
    ]),
  ],
  [
    new Matrix().setOneColumnValues([
      0.99,
      0.01,
      0.99
    ]),
    new Matrix().setOneColumnValues([
      0.01,
      0.99,
      0.01
    ]),
  ],
  [
    new Matrix().setOneColumnValues([
      0.99,
      0.01,
      0.01
    ]),
    new Matrix().setOneColumnValues([
      0.01,
      0.99,
      0.01
    ]),
  ],
  [
    new Matrix().setOneColumnValues([
      0.01,
      0.01,
      0.01
    ]),
    new Matrix().setOneColumnValues([
      0.01,
      0.01,
      0.01
    ]),
  ]
]

for (let i = 0; i < inputsAndTargets.length; i++) {

  const [input] = inputsAndTargets[i];
  const beforeTrainOutput = neuralNetwork.query(input);
  input.setName('before-train-input' + i).print();
  beforeTrainOutput.setName('before-train-output' + i).print();
  console.log('================================================');
}
const LEARNING_COUNT = 100000
neuralNetwork.train(
  inputsAndTargets.map(([input]) => input),
  inputsAndTargets.map(([, target]) => target),
  LEARNING_COUNT
);

console.log('================ AFTER TRAIN ===================');
console.log('================================================');

for (let i = 0; i < inputsAndTargets.length; i++) {
  const [input] = inputsAndTargets[i];
  const afterTrainOutput = neuralNetwork.query(input);
  input.setName('after-train-input' + i).print();
  afterTrainOutput.setName('after-train-output' + i).print();
  console.log('================================================');
}

