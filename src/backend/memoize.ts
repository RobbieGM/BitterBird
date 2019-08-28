type JSONValue = string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }

/**
 * Memoizes a function to improve its performance. The function's arguments must be JSON.stringify-compatible
 * in order to make memoizable keys.
 * @param f The pure function to memoize the return values of
 */
export default function memoize<T extends JSONValue[], R>(f: (...args: T) => R): typeof f {
  const returnValues = new Map<string, R>();
  return function memoized(...args: T) {
    const key = JSON.stringify(args);
    if (returnValues.has(key)) {
      return returnValues.get(key) as R;
    } else {
      const value = f(...args);
      returnValues.set(key, value);
      return f(...args);
    }
  };
}
