import { useEffect, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

export default function App() {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((val) => {
        if (val >= 100) {
          clearInterval(interval);
          return 100;
        }
        return val + 0.1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleComplete = () => {
    setSuccess(true);
  };

  return (
    <main className="app">
      <h1>Progress Bar</h1>
      <ProgressBar value={value} onComplete={handleComplete} />
      <h2>{success ? "Complete!" : "Loading..."}</h2>
    </main>
  );
}
