import { useEffect, useRef } from "react";
import Scene from "./Scene";
import "./animated-background.css";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new Scene(canvasRef.current);

    scene.start();

    return () => scene.destroy();
  }, []);

  return <canvas ref={canvasRef} className="animated-background" />;
}
