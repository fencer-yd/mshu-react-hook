export function isPromise<T>(it: T | PromiseLike<T>): it is PromiseLike<T> {
    return it instanceof Promise || typeof (it as any)?.then === 'function';
}

export function sleep(duration?: number) {
    return new Promise(resolve => setTimeout(resolve, duration));
}
