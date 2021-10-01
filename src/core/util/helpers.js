export function isObject(object) {
    return typeof object === 'object' && object !== null;
}

export function isString(string) {
    return typeof string === 'string';
}

export const hasWindow = typeof window !== "undefined";

export const now =
    hasWindow && typeof window.performance !== "undefined"
        ? performance.now.bind(performance)
        : Date.now.bind(Date);


export default { isObject, isString, now };