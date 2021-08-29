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

  train() {}

  query(inputValues: Matrix) {
    const hiddenInputs = this.inputHidden?.multiply(inputValues);
    const hiddenOutputs = hiddenInputs?.activate(this.activationFn) as Matrix;
    const finalInputs = this.hiddenOutput?.multiply(hiddenOutputs) as Matrix;
    const finalOutputs = finalInputs.activate(this.activationFn);
    return finalOutputs;
  }
}