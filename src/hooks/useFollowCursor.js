import { useEffect } from "react";
import { useMotionValue, useSpring } from "motion/react";

export function useFollowCursor(ref) {
  // Create motion values for the cursor coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply smooth spring physics to the motion values
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      // Update motion values directly without triggering React re-renders
      x.set(e.clientX - rect.left / 2);
      y.set(e.clientY - rect.top / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y, ref]);

  return { x: springX, y: springY };
}
