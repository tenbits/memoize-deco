Memoizeer: Function and Decorator
----

> Typescripts type annotations included

#### Cache functions result for same arguments.

```
import { memoize } from 'memoize-deco'

class Service {
    @memoize 
    async loadData (url: string) {
        let foo = await fetch(url);
        return await foo.json();
    }
}

const service = new Service();

const promiseA = service.loadData('/foo');
const promiseB = service.loadData('/foo');
const promiseC = service.loadData('/bar');

assert(promiseA === promiseB);
assert(promiseA !== promiseC);
```



#### Clear cached result by argument(s)

```
service.loadData.clearArgs('/foo');
```

#### Clear all cached results

```
service.loadData.clearAll();
```


----
MIT
