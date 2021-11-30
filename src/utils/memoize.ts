type Key = string | number | symbol;

type Fn<U, V> = (u: U) => V;

type Memory<U extends Key, V> = Partial<Record<U, V>>;

const memoize = <U extends Key, V>(fn: Fn<U, V>): Fn<U, V> => {
  const memory: Memory<U, V> = {};

  return (u: U): V => {
    if (memory[u] !== undefined) {
      return memory[u];
    }

    const result = fn(u);
    memory[u] = result;
    return result;
  };
};

export default memoize;
