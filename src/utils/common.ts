export function sigmoid(t: number) {
    return 1/(1+Math.pow(Math.E, -t));
}