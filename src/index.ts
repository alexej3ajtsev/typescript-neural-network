
import { NeuralNetwork } from './services/neural-network';
import { Matrix } from './services/matrix';

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
