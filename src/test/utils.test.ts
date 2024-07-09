import { expect, test, describe } from "vitest";
import { hasValidNominationPeriod } from "../lib/utils";
import { getVotingPeriodMessage } from "../lib/utils";
describe("Validity of nominations period", () => {
  test("should be valid if actual data is passed", () => {
    expect(
      hasValidNominationPeriod({
        start_date: "2024-07-09T10:15:14.566Z",
        end_date: "2024-07-09T10:15:14.566Z",
      })
    ).toBe(true);
  });

  test("should not be valid an object with fields but invalid dates ", () => {
    expect(
      hasValidNominationPeriod({
        start_date: "not a date",
        end_date: "not a date",
      })
    ).toBe(false);
  });
  test("should not be valid if object is empty", () => {
    expect(hasValidNominationPeriod({})).toBe(false);
  });
});
describe("voting period return messages", () => {
  test("should return nothing if the return value is null", () => {
    expect(getVotingPeriodMessage({ start_date: "", end_date: "" })).toBe(null);
  });
  test("should return ongoing if current date is within voting period", () => {
    expect(
      getVotingPeriodMessage({
        start_date: "2024-05-23T00:00:00.000Z",
        end_date: "2024-07-23T00:00:00.000Z",
      })
    ).toMatch("ongoing");
  });

  test("should return ago if voting has ended", () => {
    expect(
      getVotingPeriodMessage({
        start_date: "2024-05-23T00:00:00.000Z",
        end_date: "2024-06-23T00:00:00.000Z",
      })
    ).toMatch("ended");
  });
  test("should return starts in if date is future", () => {
    expect(
      getVotingPeriodMessage({
        start_date: "2024-07-13T00:00:00.000Z",
        end_date: "2024-07-23T00:00:00.000Z",
      })
    ).toMatch("starts in");
  });
});
