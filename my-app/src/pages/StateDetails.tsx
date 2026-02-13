
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { EKITI_PATHS } from "../constants/ekitiPaths";
import { IMO_PATHS } from "../constants/imoPath";
import { KADUNA_PATHS } from "../constants/kadunaPaths";
import { LAGOS_PATHS } from "../constants/lagosPaths";
import { YOBE_PATHS } from "../constants/yobePath";
import { ABUJA_PATHS } from "../constants/abujaPath";
import { ZAMFARA_PATHS } from "../constants/zamfaraPath";
import { TARABA_PATHS } from "../constants/tarabaPaths";
import { ONDO_PATHS } from "../constants/ondoPaths";
import { OGUN_PATHS } from "../constants/ogunPaths";
import { OYO_PATHS } from "../constants/oyoPaths";
import { SOKOTO_PATHS } from "../constants/sokotoPath";
import { PLATEAU_PATHS } from "../constants/plateauPath";
import { RIVERS_PATHS } from "../constants/riversPaths";
import { OSUN_PATHS } from "../constants/osunPath";
import { NIGER_PATHS } from "../constants/nigerPath";
import { NASARAWA_PATHS } from "../constants/nasarawaPath";
import { KWARA_PATHS } from "../constants/kwaraPaths";
import { KOGI_PATHS } from "../constants/kogiPaths";
import { KATSINA_PATHS } from "../constants/katsinaPath";
import { KEBBI_PATHS } from "../constants/kebbiPaths";
import { KANO_PATHS } from "../constants/kanoPaths";
import { JIGAWA_PATHS } from "../constants/jigawaPaths";
import { GOMBE_PATHS } from "../constants/gombePaths";
import { ENUGU_PATHS } from "../constants/enuguPaths";
import { EDO_PATHS } from "../constants/edoPaths";
import { EBONYI_PATHS } from "../constants/ebonyinPaths";
import { DELTA_PATHS } from "../constants/deltaPaths";
import { CROSS_RIVER_PATHS } from "../constants/crossriverPaths";
import { BORNO_PATHS } from "../constants/bornoPaths";
import { BENUE_PATHS } from "../constants/benuePaths";
import { BAYELSA_PATHS } from "../constants/bayelsaPaths";
import { BAUCHI_PATHS } from "../constants/bauchiPaths";
import { ANAMBRA_PATHS } from "../constants/anambraPaths";
import { AKWA_IBOM_PATHS } from "../constants/akwaibomPaths";
import { ADAMAWA_PATHS } from "../constants/adamawaPaths";
import { ABIA_PATHS } from "../constants/abiPaths";


const STATES_DATA: Record<string,{ name: string; capital: string; population: string }> = 
{
  abia: { name: "Abia", capital: "Umuahia", population: "3,841,000" },
  adamawa: { name: "Adamawa", capital: "Yola", population: "4,536,000" },
  akwa_ibom: { name: "Akwa Ibom", capital: "Uyo", population: "5,982,000" },
  anambra: { name: "Anambra", capital: "Awka", population: "6,358,000" },
  bauchi: { name: "Bauchi", capital: "Bauchi", population: "7,541,000" },
  bayelsa: { name: "Bayelsa", capital: "Yenagoa", population: "2,395,000" },
  benue: { name: "Benue", capital: "Makurdi", population: "6,176,000" },
  borno: { name: "Borno", capital: "Maiduguri", population: "6,843,000" },
  cross_river: { name: "Cross River", capital: "Calabar", population: "4,176,000" },
  delta: { name: "Delta", capital: "Asaba", population: "6,491,000" },
  ebonyi: { name: "Ebonyi", capital: "Abakaliki", population: "3,159,000" },
  edo: { name: "Edo", capital: "Benin City", population: "4,834,000" },
  ekiti: { name: "Ekiti", capital: "Ado-Ekiti", population: "3,471,000" },
  enugu: { name: "Enugu", capital: "Enugu", population: "4,869,000" },
  gombe: { name: "Gombe", capital: "Gombe", population: "3,634,000" },
  imo: { name: "Imo", capital: "Owerri", population: "5,982,000" },
  jigawa: { name: "Jigawa", capital: "Dutse", population: "6,711,000" },
  kaduna: { name: "Kaduna", capital: "Kaduna", population: "9,478,000" },
  kano: { name: "Kano", capital: "Kano", population: "15,463,000" },
  katsina: { name: "Katsina", capital: "Katsina", population: "9,300,000" },
  kebbi: { name: "Kebbi", capital: "Birnin Kebbi", population: "5,082,000" },
  kogi: { name: "Kogi", capital: "Lokoja", population: "4,935,000" },
  kwara: { name: "Kwara", capital: "Ilorin", population: "3,632,000" },
  lagos: { name: "Lagos", capital: "Ikeja", population: "15,394,000" },
  nasarawa: { name: "Nasarawa", capital: "Lafia", population: "2,874,000" },
  niger: { name: "Niger", capital: "Minna", population: "6,278,000" },
  ogun: { name: "Ogun", capital: "Abeokuta", population: "6,278,000" },
  ondo: { name: "Ondo", capital: "Akure", population: "5,231,000" },
  osun: { name: "Osun", capital: "Osogbo", population: "5,084,000" },
  oyo: { name: "Oyo", capital: "Ibadan", population: "8,931,000" },
  plateau: { name: "Plateau", capital: "Jos", population: "4,489,000" },
  rivers: { name: "Rivers", capital: "Port Harcourt", population: "7,981,000" },
  sokoto: { name: "Sokoto", capital: "Sokoto", population: "6,399,000" },
  taraba: { name: "Taraba", capital: "Jalingo", population: "3,634,000" },
  yobe: { name: "Yobe", capital: "Damaturu", population: "3,943,000" },
  zamfara: { name: "Zamfara", capital: "Gusau", population: "5,612,000" },
  abuja: {name: "Federal Capital Territory",capital: "Abuja",population: "4,928,000"},
};

const STATE_LGA_MAP: Record<string, Array<{ id: string; name: string; labelX: number; labelY: number; d: string }>> = {
  ekiti: EKITI_PATHS,
  imo: IMO_PATHS,
  kaduna: KADUNA_PATHS,
  lagos: LAGOS_PATHS, 
  yobe: YOBE_PATHS,

  abuja:ABUJA_PATHS,
  zamfara: ZAMFARA_PATHS,
  taraba: TARABA_PATHS,
  ondo: ONDO_PATHS,
  ogun: OGUN_PATHS,

  osun: OSUN_PATHS,
  oyo: OYO_PATHS,
  sokoto: SOKOTO_PATHS,
  plateau: PLATEAU_PATHS,
  rivers: RIVERS_PATHS,

  niger: NIGER_PATHS,
  nasarawa: NASARAWA_PATHS,
  kwara: KWARA_PATHS,
  kogi: KOGI_PATHS,
  kebbi: KEBBI_PATHS,

  katsina: KATSINA_PATHS,
  kano:KANO_PATHS,
  jigawa:JIGAWA_PATHS,
  gombe:GOMBE_PATHS,
  enugu:ENUGU_PATHS,

  edo:EDO_PATHS,
  ebonyin:EBONYI_PATHS,
  delta:DELTA_PATHS,
  cross_river:CROSS_RIVER_PATHS,
  borno:BORNO_PATHS,

  benue:BENUE_PATHS,
  bayesla:BAYELSA_PATHS,
  bauchi:BAUCHI_PATHS,
  anambra:ANAMBRA_PATHS,
  akwaibom:AKWA_IBOM_PATHS,

  abia:ABIA_PATHS,
  adamawa:ADAMAWA_PATHS

};

const StateDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // const navigate = useNavigate();
  

  const [hoveredLga, setHoveredLga] = useState<any | null>(null);

  if (!slug) return <div className="p-8 text-center text-red-600">No state selected</div>;

  const stateInfo = STATES_DATA[slug];
  const lgaPaths = STATE_LGA_MAP[slug] || [];

  if (!stateInfo) return <div>State not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      <div className="max-w-7xl mx-auto">
        {/* <button onClick={() => navigate(-1)} className="mb-8 text-blue-600 flex items-center gap-2">
          ← Back to Nigeria Map
        </button> */}

        {/* <h1 className="text-2xl font-bold text-gray-800 mb-10">{stateInfo.name}</h1> */}

        <div className="space-y-8">
           <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">State Summary</h2>
              <div className="space-y-4">
                <p><strong>State:</strong> {stateInfo.name}</p>
                <p><strong>Capital:</strong> {stateInfo.capital}</p>
                <p><strong>Population:</strong> {stateInfo.population}</p>
              </div>

              {/* <div className="mt-10 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">LGA Analytics</h3>
                {hoveredLga ? (
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-green-800 font-bold">{hoveredLga.name}</p>
                    <p className="text-2xl font-light text-green-900 mt-2">
                      {hoveredLga.name.length * 42} Teachers
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400 italic">Hover over an area to see teacher statistics</p>
                )}
              </div> */}
            </div>
          </div>
 
          <div className=" bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
             
            <div className="py-6 bg-transparent relative">
              

              {hoveredLga && (
                <div className="absolute top-4 right-4 bg-white p-4 shadow-2xl rounded-lg border-l-4 border-green-600 z-10 animate-in fade-in duration-200">
                  <p className="text-xs text-gray-500 uppercase font-bold">LGA Details</p>
                  <h3 className="text-lg font-bold text-gray-800">{hoveredLga.name}</h3>
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">Total Teachers: </span>
                    <span className="text-lg font-black text-green-700">
                      {(hoveredLga.name.length * 42).toLocaleString()} 
                    </span>
                  </div>
                </div>
              )}

              <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full" 
  preserveAspectRatio="xMidYMid meet"
              viewBox="150 50 500 450" >
                {lgaPaths.map((lga) => (
                  <g 
                    key={lga.id} 
                    className="group"
                    onMouseEnter={() => setHoveredLga(lga)}
                    onMouseLeave={() => setHoveredLga(null)}
                  >
                    <path
                      id={`lga-${lga.id}`}
                      d={lga.d}
                      className={`transition-all cursor-pointer stroke-gray-500 stroke-1 
                        ${hoveredLga?.id === lga.id ? 'fill-green-600' : 'fill-gray-300'}`}
                    />

                    {/* <text
                      x={lga.labelX} 
                      y={lga.labelY}
                      textAnchor="middle"
                      className="text-[10px] lg:text-[8px] fill-gray-800 font-bold pointer-events-none transition-opacity group-hover:opacity-100 opacity-60"
                    >
                      {lga.name}
                    </text> */}
                  </g>
                ))}
              </svg>
            </div>
          </div>

        

        </div>
      </div>
    </div>
  );
};

export default StateDetails;