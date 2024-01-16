import React, { useEffect, useState } from "react";
import { CryptoState } from "../Context/CrpytoContext";
import { HistoricalChart } from "../config/api";
import axios from "axios";
import {
  CircularProgress,
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      widht: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

function CoinInfo({ coin }) {
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);
  const { symbol, currency } = CryptoState();

  const fetchChart = async () => {
    const data = await axios.get(HistoricalChart);
    setFlag(true);
    setHistoricalData(data.prices);
    console.log(data.prices);
    console.log(coin);
  };
  const [historicalData, setHistoricalData] = useState();

  useEffect(() => {
    fetchChart();
  }, [currency, days]);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {flag && historicalData ? (
          <Line
            data={{
              labels: historicalData.map((coinData) => {
                let date = new Date(coinData[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()}`
                    : `${date.getHours()}:${date.getMinutes()}`;
                return time;
              }),
            }}
          />
        ) : (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        )}{" "}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;
