import memoize from "./memoize";

describe("memoize", function () {
  test("While the memoized function is called many times, the underlying function should be called one time only", function () {
    // GIVEN
    const fn = jest.fn().mockImplementation((n: number) => n);
    const memoizedFn = memoize(fn);

    // WHEN
    memoizedFn(0);
    memoizedFn(0);

    // THEN
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
