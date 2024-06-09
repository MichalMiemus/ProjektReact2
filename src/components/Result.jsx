function Result({ result }) {
  if (!result) return null;
  if (result.loading) {
    return (
      <p className="loader">
        <strong>Pobieranie kursu waluty z NBP...</strong>
      </p>
    );
  }
  if (result.error) {
    return (
      <div className="alert alert-danger" role="alert">
        {result.error}
      </div>
    );
  }
  return (
    <p className="mt-3 result-text">
      {result.amount} {result.currency} = {result.result.toFixed(2)} PLN
    </p>
  );
}

export default Result;
