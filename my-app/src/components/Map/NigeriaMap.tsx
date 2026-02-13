import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapTooltip from "./MapTooltip";
import { NIGERIA_PATHS } from "../../constants/statePaths";

export interface StateInfo {
  name: string;
  population: string;
  capital: string;
}

interface HoverInfo extends StateInfo {
  x: number;
  y: number;
}


interface NigeriaMapProps {
  data: Record<string, StateInfo>;
}



const NigeriaMap: React.FC<NigeriaMapProps> = ({ data }) => {
  const [hover, setHover] = useState<HoverInfo | null>(null);
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-4xl border bg-blue-50 rounded-xl overflow-hidden">
    <svg 
  viewBox="0 0 800 650" 
  className="w-full h-auto drop-shadow-lg bg-white "
  xmlns="http://www.w3.org/2000/svg"
>
  {NIGERIA_PATHS.map((state) => (
    <path
      key={state.id}
      d={state.d}
     
      className="fill-gray-200 stroke-black stroke-[1] hover:fill-green-600 transition-all cursor-pointer "
      onMouseEnter={(e) => {
        const info = data[state.id];
        if (info) setHover({ ...info, x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => setHover(null)}
      onClick={() => navigate(`/dashboard/overview/state/${state.id}`)}
    />
  ))}
</svg>

      {hover && <MapTooltip info={hover} />}
    </div>
  );
};

export default NigeriaMap;