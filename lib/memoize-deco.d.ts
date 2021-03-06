// Generated by dts-bundle v0.7.3

declare module 'memoize-deco' {
    import { memoizeFn } from 'memoize-deco/memoize-fn';
    export function memoize(target: any, propertyKey: any, descriptor: any): any;
    export { memoizeFn };
}

declare module 'memoize-deco/memoize-fn' {
    export interface IMemoizedFunction {
        (...args: any[]): any;
        clearArgs(...args: any[]): void;
        clearAll(): void;
    }
    export function memoizeFn<T extends Function>(fn: T): IMemoizedFunction;
    export function memoizeCb(fn: any): (...args: any[]) => void;
}

