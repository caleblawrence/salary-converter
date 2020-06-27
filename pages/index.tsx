import Head from "next/head";
import { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import {
  calculateAnnualFromHourly,
  calculateHourlyFromAnnual,
  isNumber,
  removeFormatting,
} from "../utils/conversionUtils";

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
