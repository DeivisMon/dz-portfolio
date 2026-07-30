import { useState, useEffect } from "react";

const useCityFromIP = () => {
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.success !== false) {
          setCity(data.city);
          setCountry(data.country_code);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCity(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return [city, country];
};

export default useCityFromIP;
