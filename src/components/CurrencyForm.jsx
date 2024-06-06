import React, { useState } from "react";

function CurrencyForm({ onResult }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setError("Podaj kwotę większą od zera.");
      return;
    }
    setError("");
    onResult({ loading: true });

    try {
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`
      );
      const data = await response.json();
      const rate = data?.rates?.[0]?.mid;

      if (!rate) {
        setError("Błędne dane z API.");
        onResult({ loading: false });
        return;
      }

      const result = amount * rate;
      onResult({ amount, currency, result });
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania kursu waluty:", error);
      onResult({ error: "Wystąpił błąd. Spróbuj ponownie później." });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="amount">Wpisz kwotę:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-control"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="currency">Wybierz walutę:</label>
            <select
              id="currency"
              name="currency"
              className="form-control"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            >
              <option value="EUR">Euro</option>
              <option value="USD">Dolary amerykańskie</option>
              <option value="CHF">Franki szwajcarskie</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Przelicz
      </button>
      {error && (
        <div className="alert alert-danger mt-3" style={{ maxWidth: "300px" }}>
          {error}
        </div>
      )}
    </form>
  );
}

export default CurrencyForm;
