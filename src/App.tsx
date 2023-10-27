import { useEffect, useRef } from "react";

function App() {
  const backgroundImgRef = useRef<HTMLImageElement>(null);
  const foregroundImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    /// 1. Setup mouse movement effect on background and foreground images.
    /**
     * The background image.
     */
    const backgroundImg = backgroundImgRef.current;

    /**
     * The foreground image.
     */
    const foregroundImg = foregroundImgRef.current;

    // Guard against missing images.
    if (!backgroundImg || !foregroundImg) return;

    /**
     * Makes the images respond to mouse movement.
     * @param e The mouse event.
     */
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

    /// 2. Setup image loading effect.
    /**
     * The number of seconds that have passed since the images started loading.
     */
    let secondsPassed = 0;

    /**
     * The number of images that have loaded.
     */
    let numOfImagesLoaded = 0;

    /**
     * The minimum number of seconds to wait before fading in the images.
     */
    const minSecondsToLoad = 2;

    /**
     * The interval that states every second passed.
     */
    const imageLoadingInterval = setInterval(() => {
      secondsPassed++;

      // If passed seconds are equal to the minimum seconds to load, clear the interval.
      if (secondsPassed == minSecondsToLoad) {
        clearInterval(imageLoadingInterval);
      }
    }, 1000);

    function handleImgLoad() {
      // If the images have loaded earlier than the minimum seconds to load, wait until the minimum seconds to load have passed.
      if (secondsPassed < minSecondsToLoad) {
        // Clearing the interval since we need a definite timeout now.
        clearInterval(imageLoadingInterval);

        // Set the seconds passed to minimum seconds to load minus the seconds passed.
        // This ensures that we don't keep looping through this function.
        secondsPassed = minSecondsToLoad - secondsPassed;

        // Wait for the remaining seconds.
        // secondsPassed * 1000 is the number of milliseconds to wait.
        setTimeout(handleImgLoad, secondsPassed * 1000);

        return;
      }

      // Once images are loaded, fade both images in.
      backgroundImg!.classList.remove("!opacity-0");
      foregroundImg!.classList.remove("!opacity-0");

      // After 1 second, fade in shooting stars.
      setTimeout(() => {
        const shootingStars = document.querySelector(
          ".shooting-stars"
        ) as HTMLElement;
        shootingStars.classList.remove("opacity-0");
      }, 1000);
    }

    function handleBgImgLoad() {
      numOfImagesLoaded++;
      if (numOfImagesLoaded === 2) handleImgLoad();
    }

    function handleFgImgLoad() {
      numOfImagesLoaded++;
      if (numOfImagesLoaded === 2) handleImgLoad();
    }

    window.addEventListener("mousemove", handleMouseMove);
    backgroundImg.addEventListener("load", handleBgImgLoad);
    foregroundImg.addEventListener("load", handleFgImgLoad);

    return () => {
      clearInterval(imageLoadingInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      backgroundImg.removeEventListener("load", handleBgImgLoad);
      foregroundImg.removeEventListener("load", handleFgImgLoad);
    };
  }, []);

  return (
    <>
      {/* Background Image */}
      <img
        aria-hidden="true"
        ref={backgroundImgRef}
        src="/images/background.jpg"
        className="bg-image absolute w-full h-full object-cover object-center z-bgImage opacity-40 origin-bottom scale-125 transition-opacity duration-1000 !opacity-0"
        alt="An interstellar black hole surrounded by asteroidal terrain and gorgeous space landscape."
      />
      {/* Shooting Stars */}
      <section
        aria-hidden="true"
        className="shooting-stars z-shootingStars transition-opacity duration-1000 opacity-0"
      >
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
        className="fg-image absolute w-full h-full object-cover object-bottom z-fgImage origin-center scale-125 transition-opacity duration-1000 !opacity-0"
        alt="An interstellar black hole surrounded by asteroidal terrain and gorgeous space landscape."
      />
    </>
  );
}

export default App;
