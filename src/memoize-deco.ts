
import { memoizeFn } from './memoize-fn'

export function memoize (target, propertyKey, descriptor) {
    let viaProperty = descriptor == null;
    let fn = memoizeFn(viaProperty ? target[propertyKey] : descriptor.value);
    if (viaProperty) {
        target[propertyKey] = fn;
        return;
    }
    descriptor.value = fn;
    return descriptor;
}

export { memoizeFn }