import { Matrix } from "./matrix";
import { sigmoid } from "../utils/common";

type NeuralNetworkInputsOutputsData = { inputs: Matrix; outputs: Matrix }[];
export class NeuralNetwork {
	public layers: Matrix[] = [];
	public inputHidden: null | Matrix = null;
	public hiddenOutput: null | Matrix = null;
	constructor(
		private layerQuantity: number,
		private layerNodesQuantity: number,
		private learningRate: number,
		private activationFn = sigmoid
	) {
		if (layerQuantity < 3) {
			throw new Error("Minimum layers quantity is 3");
		}
		this.layers = new Array(layerQuantity - 1).fill(null).map((_, ix) => {
			return new Matrix({
				rows: layerNodesQuantity,
				columns: layerNodesQuantity,
				randFill: true,
				name: `layer [${ix} - ${ix + 1}]`,
			});
		});
	}

	printMatrices() {
		this.layers.forEach((m) => m.print());
	}

	train(inputValues: Matrix[], targetValues: Matrix[], count = 1000) {
		if (inputValues.length !== targetValues.length) {
			throw new Error("Inputs and outputs sizes must be equal");
		}
		while (count > 0) {
			for (let i = 0; i < inputValues.length; i++) {
				if (inputValues[i].columns !== 1 || targetValues[i].columns !== 1) {
					return new Error("Inputs and outputs must have ");
				}
				this.trainValue(inputValues[i], targetValues[i]);
			}
			count--;
		}
	}

	private trainValue(inputValues: Matrix, targetValues: Matrix) {
		const layersInputsOutputs = this.query(inputValues).map((io) => ({
			...io,
			errors: {} as Matrix,
		}));

		for (let i = layersInputsOutputs.length - 1; i >= 0; i--) {
			const layer = layersInputsOutputs[i];
			const nextLayer = layersInputsOutputs[i + 1];
			const isOutputLayer = i === layersInputsOutputs.length - 1;
			layer.errors = isOutputLayer
				? targetValues.diff(layer.outputs)
				: this.layers[i + 1].dotProduct(nextLayer.errors);
		}
		for (let i = layersInputsOutputs.length - 1; i >= 0; i--) {
			const layer = layersInputsOutputs[i];
			const prevLayerOutputs =
				layersInputsOutputs[i - 1]?.outputs || inputValues;
			const modifiedLayerWeights = layer.errors
				.multiply(layer.outputs)
				.multiply(layer.outputs.subtractFrom(1))
				.dotProduct(Matrix.transpose(prevLayerOutputs))
				.multiply(this.learningRate);
			this.layers[i] = this.layers[i].add(modifiedLayerWeights) as Matrix;
		}
	}

	query(
		inputValues: Matrix,
		result = [] as NeuralNetworkInputsOutputsData
	): NeuralNetworkInputsOutputsData {
		const currentLayer = result.length;
		const nextLayer = result.length + 1;
		const currentLayerInputs =
			this.layers[currentLayer]?.dotProduct(inputValues);
		const currentLayerOutputs = currentLayerInputs.activate(this.activationFn);
		result.push({ inputs: currentLayerInputs, outputs: currentLayerOutputs });
		if (nextLayer === this.layers.length) {
			return result;
		}
		return this.query(currentLayerOutputs, result);
	}
}
