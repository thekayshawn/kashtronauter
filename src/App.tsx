import { useEffect, useRef } from "react";

function App() {
  const backgroundImgRef = useRef<HTMLImageElement>(null);
  const foregroundImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const backgroundImg = backgroundImgRef.current;
    const foregroundImg = foregroundImgRef.current;

    if (!backgroundImg || !foregroundImg) return;

    function handleMouseMove(e: MouseEvent) {
      // Dividing mouse position by window size to get relative position.
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Multiplying by 100 to get a relative percentage, dividing by 2 to get half speed.
      const twX = (x * 100) / 2;
      const twY = (y * 100) / 2;

      backgroundImg!.setAttribute(
        "style",
        // Background image moves at default speed.
        `--tw-translate-x: ${twX}px; --tw-translate-y: ${twY}px;`
      );

      foregroundImg!.setAttribute(
        "style",
        // Foreground image moves at half speed.
        `--tw-translate-x: ${twX / 2}px; --tw-translate-y: ${twY / 2}px;`
      );
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Background Image */}
      <img
        aria-hidden="true"
        ref={backgroundImgRef}
        src="/images/background.jpg"
        className="absolute w-full h-full object-cover object-center z-0 opacity-40 origin-bottom scale-125"
        alt="An interstellar black hole surrounded by asteroidal terrain and gorgeous space landscape."
      />
      {/* Shooting Stars */}
      <section aria-hidden="true" className="shooting-stars z-1">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </section>
      {/* Foreground Image */}
      <img
        aria-hidden="true"
        ref={foregroundImgRef}
        src="/images/foreground.png"
        className="absolute w-full h-full object-cover object-bottom z-2 origin-center scale-125"
        alt="An interstellar black hole surrounded by asteroidal terrain and gorgeous space landscape."
      />
    </>
  );
}

export default App;
