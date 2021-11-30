import { atm, computeNumberOfBills } from ".";

describe("atm", function () {
  const bills = [500, 200, 100, 50, 20, 10];

  test("", function () {
    expect(atm(bills)(10)).toEqual({ 10: 1 });
  });

  test("", function () {
    expect(atm(bills)(20)).toEqual({ 20: 1 });
  });

  test("", function () {
    expect(atm(bills)(40)).toEqual({ 20: 2 });
  });

  test("[control]", function () {
    expect(atm(bills)(30)).toEqual({ 20: 1, 10: 1 });
  });

  test("[control]", function () {
    expect(atm(bills)(270)).toEqual({ 200: 1, 50: 1, 20: 1 });
  });

  test("[control] non-canonical currency", function () {
    const bills = [1, 3, 4];
    expect(atm(bills)(6)).toEqual({ 3: 2 });
  });
});

describe("computeNumberOfBills", function () {
  test("No bill", function () {
    expect(computeNumberOfBills({})).toEqual(0);
  });

  test("One bill", function () {
    expect(computeNumberOfBills({ 10: 1 })).toEqual(1);
  });

  test("One bill many times", function () {
    expect(computeNumberOfBills({ 10: 2 })).toEqual(2);
  });

  test("Many bills many times", function () {
    expect(computeNumberOfBills({ 10: 2, 20: 1 })).toEqual(3);
  });
});
