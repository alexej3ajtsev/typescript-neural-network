import { NeuralNetwork } from "../services/neural-network";
import { Matrix } from "../services/matrix";

const NETWORK_LAYERS_QUANTITY = 4;
const NETWORK_LAYER_NODES_QUANTITY = 3;
const NETWORK_LEARNING_RATE = 0.05;

const neuralNetwork = new NeuralNetwork(
	NETWORK_LAYERS_QUANTITY,
	NETWORK_LAYER_NODES_QUANTITY,
	NETWORK_LEARNING_RATE
);

const inputsAndTargets: [Matrix, Matrix][] = [
	[
		// input
		new Matrix().setOneColumnValues([0.01, 0.01, 0.99]),
		// target output
		new Matrix().setOneColumnValues([0.01, 0.99, 0.01]),
	],
	[
		new Matrix().setOneColumnValues([0.99, 0.01, 0.99]),
		new Matrix().setOneColumnValues([0.01, 0.99, 0.01]),
	],
	[
		new Matrix().setOneColumnValues([0.99, 0.01, 0.01]),
		new Matrix().setOneColumnValues([0.01, 0.99, 0.01]),
	],
	[
		new Matrix().setOneColumnValues([0.01, 0.01, 0.01]),
		new Matrix().setOneColumnValues([0.01, 0.01, 0.01]),
	],
];

for (let i = 0; i < inputsAndTargets.length; i++) {
	const [input] = inputsAndTargets[i];
	const outputData = neuralNetwork.query(input);
	input.setName("before-train-input" + i).print();
	outputData[NETWORK_LAYERS_QUANTITY - 2].outputs
		.setName("before-train-output" + i)
		.print();
	console.log("================================================");
}
const LEARNING_COUNT = 100000;
neuralNetwork.train(
	inputsAndTargets.map(([input]) => input),
	inputsAndTargets.map(([, target]) => target),
	LEARNING_COUNT
);

console.log("================ AFTER TRAIN ===================");
console.log("================================================");

for (let i = 0; i < inputsAndTargets.length; i++) {
	const [input] = inputsAndTargets[i];
	const outputData = neuralNetwork.query(input);
	input.setName("after-train-input" + i).print();
	outputData[NETWORK_LAYERS_QUANTITY - 2].outputs
		.setName("after-train-output" + i)
		.print();
	console.log("================================================");
}

neuralNetwork.printMatrices();
