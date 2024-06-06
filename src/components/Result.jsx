import React from "react";

function Result({ result }) {
  if (!result) return null;
  if (result.loading) {
    return (
      <p>
        <strong>Pobieranie kursu waluty z NBP...</strong>
      </p>
    );
  }
  if (result.error) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ maxWidth: "300px" }}
      >
        {result.error}
      </div>
    );
  }
  return (
    <p className="mt-3 font-weight-bold" style={{ fontSize: "1.4em" }}>
      {result.amount} {result.currency} = {result.result.toFixed(2)} PLN
    </p>
  );
}

export default Result;
