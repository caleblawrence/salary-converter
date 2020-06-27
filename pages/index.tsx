import Head from "next/head";
import { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

const WEEKS_IN_YEAR = 52;
const FULL_TIME_HOURS = 40;

const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
});

function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function calculateHourlyFromAnnual(annual: number): string {
  let hourly = annual / (WEEKS_IN_YEAR * FULL_TIME_HOURS);
  hourly = Math.ceil(hourly);
  const hourlyString = formatter.format(hourly);
  return hourlyString;
}

const removeFormatting = (s: string) => {
  let newString = s.replace("$", "");
  newString = s.replace(",", "");
  newString = newString.trim();
  newString = newString.replace(/[^0-9\.]+/g, "");
  return newString;
}

function calculateAnnualFromHourly(hourlyRate: number): string {
  const annual = hourlyRate * WEEKS_IN_YEAR * FULL_TIME_HOURS;
  const annualString = formatter.format(annual);
  return annualString;
}

const Home = () => {
  const [hourly, setHourly] = useState("");
  const [annual, setAnnual] = useState("");

  const handleAnnualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnnual = removeFormatting(e.target.value);
    setAnnual(e.target.value);

    if (isNumber(newAnnual)) {
      const hourlyAmmount = calculateHourlyFromAnnual(parseFloat(newAnnual));
      setHourly(hourlyAmmount);
    } else {
      setHourly("");
    }
  };

  const handleHourlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHourly = removeFormatting(e.target.value);
    
    setHourly(e.target.value);
    if (isNumber(newHourly)) {
      const annualAmmount = calculateAnnualFromHourly(parseFloat(newHourly));
      setAnnual(annualAmmount);
    } else {
      setAnnual("");
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Salary Converter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Fill in one of the fields.</h1>

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-hourly">
            Hourly Rate
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-hourly"
            value={hourly}
            onChange={handleHourlyChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={85}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" style={{ marginTop: 20 }}>
          <InputLabel htmlFor="outlined-adornment-annual">
            Annual Salary
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-annual"
            value={annual}
            onChange={handleAnnualChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={98}
          />
        </FormControl>
        <p style={{ color: "#797272" }}>
          This assumes you work 40 hours a week and 52 weeks a year.
        </p>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: #121212 !important;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
