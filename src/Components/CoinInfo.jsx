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
import { ChartDays } from "../config/ChartDays";
import SelectBtn from "./SelectBtn";

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

  const [historicalData, setHistoricalData] = useState();

  const { symbol, currency } = CryptoState();

  const fetchChart = async () => {
    try {
      const data = await axios.get(HistoricalChart(currency, days, coin));
      console.log(data?.prices);
      setFlag(true);
      setHistoricalData(data.prices);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchChart();
  }, []);
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
        {flag && !historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData?.map((coinData) => {
                  let date = new Date(coinData[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData?.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {ChartDays.map((day) => {
                <SelectBtn
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                />;
              })}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;
