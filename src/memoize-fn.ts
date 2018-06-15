
export interface IMemoizedFunction {
	(...args): any
	clearArgs (...args): void
	clearAll (): void
}

	export function memoizeFn<T extends  Function> (fn: T): IMemoizedFunction {
		let _cache = {},
			_args = [];

		let Wrapper = <IMemoizedFunction> function(...args) : any {
			var id = fn_argsId(args, _args);
			return _cache.hasOwnProperty(id) 
				? (_cache[id])
				: (_cache[id] = fn.apply(this, args))
				;
		};

		Wrapper.clearArgs = function (...args) {
			var id = fn_argsId(args, _args);
			_cache[id] = null;
		};
		Wrapper.clearAll = function () {
			_cache = {};
		};
		return Wrapper;
	};
	
export function memoizeCb(fn) {
		var _cache = {},
			_cacheCbs = {},
			_args = [];
			
		return function(...args: any[]){
			
			let callback = args.pop() as Function;			
			let id = fn_argsId(args, _args);
			
			if (_cache[id]){
				callback.apply(this, _cache[id]);
				return; 
			}
			
			if (_cacheCbs[id]) {
				_cacheCbs[id].push(callback);
				return;
			}
			
			_cacheCbs[id] = [callback];
			
			args.push(fn_resolveDelegate(_cache, _cacheCbs, id));
			
			fn.apply(this, args);
		};
	};
	
	// === private
	function fn_resolveDelegate(cache, cbs, id) {
		return function(...args){
			cache[id] = args;
			
			for (var i = 0, x, imax = cbs[id].length; i < imax; i++){
				x = cbs[id][i];
				x.apply(this, args);
			}
			
			cbs[i] = null;
			cache = null;
			cbs = null;
		};
	}

 function fn_argsId (args: any[], cache: any[][]){
		if (args.length === 0)
			return 0;
		
		var imax = cache.length,
			i = -1;
		while( ++i < imax ){
			if (args_match(cache[i], args))
				return i + 1;
		}
		cache.push(args);
		return cache.length;
	};
	


	function args_match(a, b){
		if (a.length !== b.length) 
			return false;
		
		var imax = a.length,
			i = 0;
		for (; i < imax; i++){
			if (a[i] !== b[i])
				return false;
		}
		return true;
	}