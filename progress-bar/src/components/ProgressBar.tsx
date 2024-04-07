import { useEffect, useMemo, useState } from "react";

const MIN = 0;
const MAX = 100;

interface ProgressBarProps {
  value: number;
  onComplete: () => void;
}

export default function ProgressBar({ value = 0, onComplete = () => {} }: ProgressBarProps) {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    if (value >= MAX && percent < MAX) {
      onComplete();
    }
    setPercent(Math.min(Math.max(value, MIN), MAX));
  }, [value, percent, onComplete]);

  const progressBarStyle = useMemo(
    () => ({
      transform: `scaleX(${percent / MAX})`,
      transformOrigin: "left",
      transition: "transform 0.2s ease",
      backgroundColor: value >= MAX ? "green" : "blue",
    }),
    [percent, value]
  );

  const textStyle = useMemo(
    () => ({
      color: percent > 49 ? "white" : "black",
    }),
    [percent]
  );

  return (
    <div
      className="progress-container"
      role="progressbar"
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      aria-valuenow={percent}
    >
      <span className="progress-text" style={textStyle}>
        {percent.toFixed()}%
      </span>
      <div className="progress-bar" style={progressBarStyle} />
    </div>
  );
}
