import { useParams } from "react-router-dom";
import { statesData } from "../data/states";

const StatePage = () => {
  const { state } = useParams();

  const stateKey = Object.keys(statesData).find(
    key =>
      statesData[key].name
        .toLowerCase()
        .replace(/\s+/g, "-") === state
  );

  if (!stateKey) {
    return <p className="text-center mt-10">State not found</p>;
  }

  const data = statesData[stateKey];

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
      <p><strong>Capital:</strong> {data.capital}</p>
      <p><strong>Population:</strong> {data.population}</p>

      <button
        onClick={() => history.back()}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
      >
        ← Back to Map
      </button>
    </div>
  );
};

export default StatePage;
