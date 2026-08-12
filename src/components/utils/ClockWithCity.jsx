import { useState, useEffect } from "react";
import useCityFromIP from "../../hooks/useCityFromIP";

const useClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
};

export default function ClockWithCity() {
  const now = useClock();
  const [city, country] = useCityFromIP();

  return (
    <div className="tabular-nums mix-blend-difference font-black">
      <span className="inline-block w-[26px] text-center">
        {now.getHours().toString().padStart(2, "0")}
      </span>
      :
      <span className="inline-block w-[26px] text-center">
        {now.getMinutes().toString().padStart(2, "0")}
      </span>
      :
      <span className="inline-block w-[26px] text-center">
        {now.getSeconds().toString().padStart(2, "0")}
      </span>
      {city && ` · ${city}`}
      {country && ` · ${country}`}
    </div>
  );
}
