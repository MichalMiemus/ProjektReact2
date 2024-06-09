function CurrencyForm({ onResult }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = parseFloat(formData.get("amount"));
    const currency = formData.get("currency");

    if (amount <= 0) {
      onResult({ error: "Podaj kwotę większą od zera." });
      return;
    }

    onResult({ loading: true });

    try {
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`
      );
      const data = await response.json();
      const rate = data?.rates?.[0]?.mid;

      if (!rate) {
        onResult({ error: "Błędne dane z API.", loading: false });
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
    </form>
  );
}

export default CurrencyForm;
