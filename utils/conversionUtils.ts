const WEEKS_IN_YEAR = 52;
const FULL_TIME_HOURS = 40;

export const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
});

export function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function calculateHourlyFromAnnual(annual: number): string {
  let hourly = annual / (WEEKS_IN_YEAR * FULL_TIME_HOURS);
  hourly = Math.ceil(hourly);
  const hourlyString = formatter.format(hourly);
  return hourlyString;
}

export const removeFormatting = (s: string) => {
  let newString = s.replace("$", "");
  newString = s.replace(",", "");
  newString = newString.trim();
  newString = newString.replace(/[^0-9\.]+/g, "");
  return newString;
};

export function calculateAnnualFromHourly(hourlyRate: number): string {
  const annual = hourlyRate * WEEKS_IN_YEAR * FULL_TIME_HOURS;
  const annualString = formatter.format(annual);
  return annualString;
}
