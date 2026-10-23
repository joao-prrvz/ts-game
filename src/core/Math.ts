declare global {
    interface Math {
        randInt(min: number, max: number): number;
    }
}

Math.randInt = (min, max) => 
Math.floor(Math.random() * (max - min + 1)) + min;

const module = Math;

export { module as Math };