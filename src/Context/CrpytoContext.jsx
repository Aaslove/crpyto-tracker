import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

function CrpytoContext({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
}

export default CrpytoContext;
export const CryptoState = () => {
  return useContext(Crypto);
};
