import { useEffect, useState } from "react";

const useYearChange = () => {
    const [year, setYear] = useState('');

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  return <div>{year}</div>;
};

export default useYearChange;