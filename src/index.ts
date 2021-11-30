import isDefined from "./utils/isDefined";
import isEmpty from "./utils/isEmpty";
import memoize from "./utils/memoize";
import sum from "./utils/sum";

type Bill = number;

type NumberOfBills = number;

type Withdrawal = Record<Bill, NumberOfBills>;

interface Attempt {
  bill: Bill;
  remaining: Withdrawal;
}

const EMPTY_WITHDRAWAL: Withdrawal = {};

export const atm = (bills: Bill[]) => {
  const memoizedAtm = memoize(
    (amount: number): Withdrawal => {
      const attempts = generateAttempts(amount);

      if (isEmpty(attempts)) {
        return EMPTY_WITHDRAWAL;
      }

      const bestAttempt = findAttemptWithLowestNumberOfBills(attempts);

      return buildWithdrawal(bestAttempt);
    }
  );

  const generateAttempts = (amount: number): Attempt[] => {
    return bills
      .map((bill) => {
        if (bill > amount) {
          return undefined;
        }
        return {
          bill,
          remaining: memoizedAtm(amount - bill),
        };
      })
      .filter(isDefined);
  };

  const findAttemptWithLowestNumberOfBills = (attempts: Attempt[]): Attempt => {
    return attempts.sort(
      ({ remaining: w1 }, { remaining: w2 }) => computeNumberOfBills(w1) - computeNumberOfBills(w2)
    )[0];
  };

  const buildWithdrawal = (best: Attempt): Withdrawal => {
    const { bill, remaining } = best;
    return {
      ...remaining,
      [bill]: (remaining[bill] || 0) + 1,
    };
  };

  return memoizedAtm;
};

export const computeNumberOfBills = (withdrawal: Withdrawal): number => {
  return Object.values(withdrawal).reduce(sum, 0);
};

export default atm;
