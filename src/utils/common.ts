export function sigmoid(num: number) {
    return 1 / (1+Math.pow(Math.E, - num));
}