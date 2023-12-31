import gsap from "gsap";
import SpaceShip from "./SpaceShip";
import { useEffect, useRef } from "react";
import { isScreenSize } from "./utils";
import Hyperdrive from "./Hyperdrive";

function App() {
  const backgroundImgRef = useRef<HTMLImageElement>(null);
  const foregroundImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    /// 1. Setup mouse movement effect on background and foreground images.
    /**
     * The background image.
     */
    const $backgroundImg = backgroundImgRef.current;

    /**
     * The foreground image.
     */
    const $foregroundImg = foregroundImgRef.current;

    // Guard against missing images.
    if (!$backgroundImg || !$foregroundImg) return;

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

      $backgroundImg!.setAttribute(
        "style",
        // Background image moves at default speed.
        `--tw-translate-x: ${twX}px; --tw-translate-y: ${twY}px;`
      );

      $foregroundImg!.setAttribute(
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

      // Once images are loaded, fade preloader out.

      document.querySelector(".preloader")?.classList.add("opacity-0");

      // Remove overflow-y-hidden from body and root.
      document.body.classList.remove("overflow-y-hidden");
      document.getElementById("root")!.classList.remove("overflow-y-hidden");

      // Then, fade everything in.
      [
        ".bg-image",
        ".fg-image",
        ".shooting-stars",
        ".welcome-text h1",
        ".welcome-text p",
      ].forEach((tag) => {
        document.querySelector(tag)?.classList.remove("!opacity-0");
      });

      // Now, add keydown and click listener to window.
      window.addEventListener("keydown", handleWindowKeyDown);
      window.addEventListener("click", handleWindowKeyDown);
    }

    function handleBgImgLoad() {
      numOfImagesLoaded++;
      if (numOfImagesLoaded === 2) handleImgLoad();
    }

    function handleFgImgLoad() {
      numOfImagesLoaded++;
      if (numOfImagesLoaded === 2) handleImgLoad();
    }

    /// 3. Setup keydown effect.
    function handleWindowKeyDown() {
      // Remove the listener to prevent multiple keydowns and clicks.
      window.removeEventListener("keydown", handleWindowKeyDown);
      window.removeEventListener("click", handleWindowKeyDown);

      // Fade out the welcome text as well as the about text.
      document.querySelector(".welcome-text")?.classList.add("!opacity-0");
      document.querySelector(".about-text")?.classList.add("!opacity-0");

      // Then, slide down the foreground image.
      $foregroundImg!.setAttribute(
        "style",
        `--tw-translate-y: 100%; transition: transform 2s ease-in-out .5s`
      );

      // And remove the mousemove listener.
      window.removeEventListener("mousemove", handleMouseMove);

      // Then, fade out the shooting stars.
      document.querySelector(".shooting-stars")?.classList.add("!opacity-0");

      // Then, get the space ship.
      const $spaceShip = document.getElementById("spaceShip");
      const $hyperdrive = document.getElementById("hyperdrive");
      const $hyperdriveCounter = document.getElementById("hyperdriveCounter");

      if (!$spaceShip || !$hyperdrive || !$hyperdriveCounter) return;

      // And animate it in.
      $spaceShip.classList.remove("!z-0", "!opacity-0", "!scale-[2]");

      // Also, fade the bg image out.
      gsap.to($backgroundImg, {
        opacity: 0,
        duration: 2,
      });

      const hyperdriveTl = gsap.timeline();

      // Then, animate the hyperdrive in.
      hyperdriveTl.fromTo(
        $hyperdrive,
        {
          opacity: 0,
          "--tw-hyperdrive-perspective": "100px",
        },
        {
          delay: 0.5,
          opacity: 0.2,
          duration: 4,
          "--tw-hyperdrive-perspective": "10px",
        }
      );

      // Then, animate the hyperdrive to be even more intense.
      hyperdriveTl.to($hyperdrive, {
        opacity: 1,
        duration: 1,
        "--tw-hyperdrive-perspective": "1px",
      });

      // Then, after 13 seconds, animate the hyperdrive to be less intense.
      hyperdriveTl.to(
        $hyperdrive,
        {
          opacity: 0.2,
          duration: 1,
          "--tw-hyperdrive-perspective": "10px",
        },
        "+=13"
      );

      // Then, within 8 seconds, fade out the hyperdrive.
      hyperdriveTl.to($hyperdrive, {
        opacity: 0,
        duration: 8,
        perspective: "100px",
      });

      // Let the ship animate in for 1 second.
      setTimeout(() => {
        // Add hyperdrive to the space ship.
        $spaceShip.classList.add("hyperdrive");
      }, 2000);

      let counter = parseInt($hyperdriveCounter.innerHTML);

      // Play the hyperdrive sound.
      new Audio("/hyperdrive.mp3").play();

      // Wait for 800 milliseconds, then
      setTimeout(() => {
        // An interval that counts down from 3 to 0.
        const hyperdriveInterval = setInterval(() => {
          counter--;

          if (counter > 0) {
            // Update the counter as long as it is greater than 0.
            if ($hyperdriveCounter) $hyperdriveCounter.innerHTML = counter + "";

            return;
          }

          // Else
          // Clear the interval
          clearInterval(hyperdriveInterval);

          // Remove the counter
          $hyperdriveCounter.parentElement?.classList.add("!opacity-0");

          // Wait for 1 second, then add intense hyperdrive.
          setTimeout(() => {
            $spaceShip.classList.add("hyperdrive-intense");

            // Set the hyperdrive perspective to 0 for an intense effect.
            $hyperdrive.setAttribute("style", "--tw-hyperdrive-perspective: 0");

            // Wait for 14 seconds, this is the duration of the hyperdrive.
            setTimeout(() => {
              // Remove the hyperdrive-intense class.
              $spaceShip.classList.remove("hyperdrive-intense");

              gsap.to("#hyperdriveDestination", {
                delay: 3,
                duration: 7,
                opacity: 0.1,
              });

              // After 7 seconds, remove the hyperdrive
              setTimeout(() => {
                $spaceShip.classList.remove("hyperdrive");

                // Display the CTA.
                document
                  .getElementById("hyperdriveCta")
                  ?.classList.remove("!opacity-0");
              }, 8000);
            }, 14000);
          }, 1000);
        }, 1000);
      }, 800);
    }

    $backgroundImg.addEventListener("load", handleBgImgLoad);
    $foregroundImg.addEventListener("load", handleFgImgLoad);

    // Mousemove listener is only for desktop devices.
    if (isScreenSize("lg")) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      // Remove the image loading interval.
      clearInterval(imageLoadingInterval);

      // Remove the mousemove listener.
      window.removeEventListener("mousemove", handleMouseMove);

      // Remove the load listeners.
      $backgroundImg.removeEventListener("load", handleBgImgLoad);
      $foregroundImg.removeEventListener("load", handleFgImgLoad);

      // Remove the keydown and click listener.
      window.removeEventListener("keydown", handleWindowKeyDown);
      window.removeEventListener("click", handleWindowKeyDown);
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
        className="shooting-stars z-shootingStars transition-opacity duration-1000 !opacity-0 delay-2000"
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
        className="fg-image absolute w-full h-full object-cover object-bottom z-fgImage origin-bottom lg:origin-center scale-125 transition-opacity duration-1000 !opacity-0"
        alt="An interstellar black hole surrounded by asteroidal terrain and gorgeous space landscape."
      />
      <div className="welcome-text z-welcomeText px-4 pt-8 md:px-0 text-center text-white opacity-100 relative transition-opacity duration-1000">
        <h1 className="text-[7.5vw] lg:text-[5vw] font-bold transition-opacity duration-1000 !opacity-0">
          Welcome Stranger!
        </h1>
        <p className="transition-opacity duration-1000 !opacity-0 delay-1000 mt-4 md:mt-0">
          Press{" "}
          <span className="font-bold underline underline-offset-8">
            any key
          </span>{" "}
          to begin your journey through the cosmos.
        </p>
      </div>
      <p className="about-text fixed inline-block bottom-4 lg:bottom-8 right-4 lg:right-8 z-aboutText text-right text-xs drop-shadow-sm shadow-black transition-opacity duration-1000">
        An interstellar creation by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://kashanahmad.me"
          className="font-bold underline underline-offset-8 hover:underline-offset-4 focus:underline-offset-4 transition-all"
        >
          Kashan
        </a>
      </p>
      <Hyperdrive />
      <SpaceShip />
    </>
  );
}

export default App;
