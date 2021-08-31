import { Matrix } from './matrix';
import { sigmoid } from '../utils/common';

export class NeuralNetwork {
  public inputHidden: null | Matrix = null;
  public hiddenOutput: null | Matrix = null;
  constructor(
    private inputNodesQty: number,
    private hiddenNodesQty: number,
    private outputNodesQty: number,
    private learningRate: number,
    private activationFn = sigmoid,
  ) {
    // Если у нас три слоя то мы можем создать две матрицы:
    // !!!именно в такой последовательности rows x columns!!!
    // rows: hiddenNodesQty x columns: inputNodesQty 
    // rows: outputNodesQty x columns: hiddenNodesQty
    this.inputHidden = new Matrix({
      rows: hiddenNodesQty,
      columns: inputNodesQty,
      randFill: true,
      name: 'input -> hidden'
    });
    this.hiddenOutput = new Matrix({
      rows: outputNodesQty,
      columns: hiddenNodesQty,
      randFill: true,
      name: 'hidden -> output'
    });
  }

  setTestWeights(inputsHiddensData: number[][], hiddensOutputsData: number[][]) {
    if (this.inputHidden?.data)
      this.inputHidden.data = inputsHiddensData;
    if (this.hiddenOutput?.data)
      this.hiddenOutput.data = hiddensOutputsData;
  }

  printMatrices() {
    [
      this.inputHidden,
      this.hiddenOutput
    ].forEach(m => m?.print());
  }

  train(inputValues: Matrix[], targetValues: Matrix[], count = 1000) {
    if (inputValues.length !== targetValues.length) {
      throw new Error('Inputs and outputs sizes must be equal');
    }
    while (count > 0) {
      for (let i = 0; i < inputValues.length; i++) {
        if (inputValues[i].columns !== 1 || targetValues[i].columns !== 1) {
          return new Error('Inputs and outputs must have ')
        }
        const hiddenInputs = this.inputHidden?.dotProduct(inputValues[i]);
        const hiddenOutputs = hiddenInputs?.activate(this.activationFn) as Matrix;
        const finalInputs = this.hiddenOutput?.dotProduct(hiddenOutputs) as Matrix;
        const finalOutputs = finalInputs.activate(this.activationFn);
        const outputErrors = targetValues[i].diff(finalOutputs)
        const hiddenErrors = this.hiddenOutput?.dotProduct(outputErrors) as Matrix;
        // TODO : переименовать более осмысленно
        const hiddenOutputErrorsMatrix = outputErrors.multiply(finalOutputs).multiply(finalOutputs.subtractFrom(1));
        const addHiddenOutputWeights = hiddenOutputErrorsMatrix.dotProduct(Matrix.transpose(hiddenOutputs)).multiply(this.learningRate);
        this.hiddenOutput = this.hiddenOutput?.add(addHiddenOutputWeights) as Matrix;
        this.hiddenOutput.setName('hidden -> output');
        // TODO : переименовать более осмысленно
        const inputHiddenErrorsMatrix = hiddenErrors.multiply(hiddenOutputs).multiply(hiddenOutputs.subtractFrom(1));
        const addInputHiddenWeights = inputHiddenErrorsMatrix.dotProduct(Matrix.transpose(inputValues[i])).multiply(this.learningRate);
        this.inputHidden = this.inputHidden?.add(addInputHiddenWeights) as Matrix;
        this.inputHidden.setName('input -> hidden');
      }
      count--;
    }
  }

  query(inputValues: Matrix) {
    const hiddenInputs = this.inputHidden?.dotProduct(inputValues);
    const hiddenOutputs = hiddenInputs?.activate(this.activationFn) as Matrix;
    const finalInputs = this.hiddenOutput?.dotProduct(hiddenOutputs) as Matrix;
    const finalOutputs = finalInputs.activate(this.activationFn);
    finalOutputs.setName('output-values');
    return finalOutputs;
  }
}