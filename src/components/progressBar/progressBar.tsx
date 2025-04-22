import { memo, useState, useEffect } from "react";
import "./progressBarStyles.css";

function ProgressBar() {
  const [bars, setBars] = useState(0);

  const addBar = () => {
    setBars((prev) => prev + 1);
  };

  return (
    <main className="w-full h-screen flex flex-col gap-4">
      <button className="border-2 rounded-md border-grey w-1/7 cursor-pointer" onClick={addBar}>
        Add Bar
      </button>
      <div className="flex flex-col gap-1">
        {[...Array(bars)].map((_, i) => <Bar key={i} />)}
      </div>
    </main>
  );
}

const Bar = memo(() => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId: number = NaN;

    const increaseProgress = () => {
      setProgress((prev) => prev + 1);

      frameId = requestAnimationFrame(increaseProgress);
    };

    requestAnimationFrame(increaseProgress);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="w-1/2 h-4 bg-cyan-100 border-2 rounded-md border-grey">
      <div
        className="h-full pBarb bg-cyan-800"
        style={{
          width: `${progress / 100}%`,
        }}
      ></div>
    </div>
  );
});

export default memo(ProgressBar);
