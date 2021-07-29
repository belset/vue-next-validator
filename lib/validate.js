import { isRef, isReactive, reactive, watch, readonly } from 'vue';

export function validate(conditions, source, callback, options = { delay: 0, immediate: true }) {
  const op = { delay: 400, immediate: false, ...options };
  const warn = (s, args) => console.warn('[vue-next-validator]: ' + s, args);
  const exec = (fn, args) => {
    let res;
    try {
      res = args ? fn(...args) : fn();
    }
    catch (err) {
      warn(`execution error:`, err);
    }
    return res;
  }
  const resolve = (e) => {
    if (typeof e === "function") {
      return () => exec(e);
    } else if (isReactive(e)) {
      return () => e;
    } else if (isRef(e)) {
      return () => e.value;
    }
    return () => e;
  }

  if (typeof callback !== "function") {
    warn(`'callback' must be a function`);
  }
  const state = reactive({ valid: false, invalid: false, validating: false, value: undefined, data: undefined })
  const setState = (st, val, data) => {
    state.valid = (st === 1); state.invalid = (st === 2); state.validating = (st === 3);
    state.value = val; state.data = data;
  }
  let timer = 0, iter = 0;
  const debounced = (it, value, fnValid, fnInvalid) => {
    const cb = () => {
      const ret = callback.call(this, value, fnValid, fnInvalid);
      if (ret === true) {
        setState(1, value, undefined); it = undefined;
      } else if (ret === false) {
        setState(2, value, undefined); it = undefined;
      }
    };
    if (timer) {
      timer = clearTimeout(timer);
    } else if (op.immediate) cb();
    if (iter === it) {
      timer = setTimeout(() => {
        timer = clearTimeout(timer);
        if (iter === it) cb();
      }, op.delay > 0 ? op.delay : 10);
    }
  }
  const process = (value) => {
    const it = ++iter;
    if (value === undefined) {
      setState(undefined, undefined, undefined);
    } else {
      setState(3, value, undefined);
      debounced(
        it, value,
        (data) => { if (iter === it) setState(1, value, data); },
        (data) => { if (iter === it) setState(2, value, data); }
      );
    }
  }
  let unwatch = null;
  watch(conditions, ret => {
    if (!!ret && !unwatch) {
      process(ret);
      unwatch = watch(resolve(source), wval => process(wval));
    } else if (!ret && unwatch) {
      unwatch(); unwatch = null;
      process(undefined);
    }
  });
  return readonly(state);
};