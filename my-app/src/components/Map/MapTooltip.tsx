interface TooltipInfo {
  name: string;
  capital: string;
  population: string;
  x: number;
  y: number;
}

interface MapTooltipProps {
  info: TooltipInfo;
}

const MapTooltip: React.FC<MapTooltipProps> = ({ info }) => {
  return (
    <div
      style={{
        position: "fixed",
        left: info.x + 12,
        top: info.y + 12,
        background: "#111",
        color: "#fff",
        padding: "8px",
        borderRadius: "6px",
        fontSize: "13px",
        zIndex: 1000,
      }}
    >
      <strong>{info.name}</strong>
      <br />
      Capital: {info.capital}
      <br />
      Population: {info.population}
    </div>
  );
};

export default MapTooltip;
