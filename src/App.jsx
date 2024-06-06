import React, { useState } from "react";
import CurrencyForm from "./components/CurrencyForm";
import Result from "./components/Result";

function App() {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Przelicznik walut</h1>
      <CurrencyForm onResult={handleResult} />
      <Result result={result} />
    </div>
  );
}

export default App;
