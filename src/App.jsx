import "./App.css";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useRef } from "react";
gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0 ,0.1,1");

function App() {
  const isScrollingDown = useRef(null);

  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(".bar", {
      scaleY: 0,
      transformOrigin: "top",
    });
    gsap.set(".menu-bar", {
      xPercent: 100,
    });

    let scrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      gsap.killTweensOf(".navbar");
      if (window.scrollY > 970) {
        gsap.to(".navbar", {
          backgroundColor: "white",
          color: "black",
        });
      } else {
        gsap.to(".navbar", {
          backgroundColor: "transparent",
          color: "white",
        });
      }
      if (window.scrollY > scrollY) {
        isScrollingDown.current = true;
      } else {
        isScrollingDown.current = false;
      }
      scrollY = window.scrollY;

      if (isScrollingDown.current) {
        gsap.to(".navbar", {
          yPercent: -100,
        });
      } else {
        gsap.to(".navbar", {
          yPercent: 0,
        });
      }
    });

    const counts = gsap.utils.toArray(".countdown");
    let splitNine;
    counts.forEach((count, index) => {
      let split = new SplitText(count, { type: "chars" });
      if (index === 2) {
        splitNine = split.chars[0];
      }

      tl.from(
        split.chars,
        {
          yPercent: 100,
          duration: 0.75,
          ease: "power4.out",
          stagger: 0.1,
          delay: index === 3 ? 0.1 : 0,
        },
        index === 0 ? ">" : "<0.45",
      ).to(split.chars, {
        yPercent: (el) => {
          if (index === 2) {
            return el === 0 ? 0 : -100;
          }
          return -100;
        },
        stagger: 0.1,
        ease: "power4.in",
        duration: 0.75,
      });

      if (index === 3) {
        tl.to(
          splitNine,
          {
            yPercent: -100,
            duration: 0.75,
            ease: "power4.in",
          },
          "<-0.1",
        );
      }
    });

    tl.to(".spinner", {
      autoAlpha: 0,
    })
      .from(".title-1", {
        yPercent: 100,
        duration: 1,
        ease: "power4.out",
      })
      .from(
        ".title-2",
        {
          yPercent: -100,
          duration: 1,
          ease: "power4.out",
        },
        "<",
      )
      .to(".bar", {
        scaleY: 1,
      })
      .to(
        ".bar",
        {
          scaleY: 0,
          transformOrigin: "bottom",
        },
        ">0.2",
      )
      .to(".title-1", {
        yPercent: -100,
      })
      .to(
        ".title-2",
        {
          yPercent: 100,
        },
        "<",
      )
      .to(".blocks", {
        yPercent: -100,
        stagger: 0.05,
        duration: 1,
        ease: "power2.out",
      })
      .to(".preloader", {
        autoAlpha: 0,
        duration: 0,
      })
      .from("img", {
        scale: 1.5,
        ease: "hop",
      })
      .from(
        ".navbar",
        {
          autoAlpha: 0,
          y: -20,
        },
        "<",
      )
      .from(
        ".root-1",
        {
          yPercent: 100,
          duration: 1,
        },
        "<",
      )
      .from(
        ".root-2",
        {
          yPercent: 100,
          duration: 1,
        },
        "<0.2",
      )
      .from(
        ".main-p",
        {
          opacity: 0,
          y: 20,
        },
        "<0.3",
      )
      .from(
        ".buybar",
        {
          scale: 0,
          opacity: 0,
        },
        "<0.2",
      )
      .from(
        ".buybar button",
        {
          opacity: 0,
        },
        "<0.2",
      )
      .from(
        ".ball",
        {
          opacity: 0,
          scale: 0,
        },
        "<0.1",
      );
  });
  return (
    <>
      <div className="menu-bar w-[min(75vw,500px)] rounded-l-2xl fixed top-0 right-0 h-screen p-8 bg-white/40 backdrop-blur-2xl z-40">
        <div className="flex flex-col gap-5 items-center">
          <span className="text-black text-3xl">Menu</span>
          <ul className="flex gap-5">
            <li>Home</li>
            <li>Services</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="">
          <button
            onClick={contextSafe(() => {
              gsap.to(".menu-bar", {
                xPercent: 100,
                duration: 0.5,
              });
            })}
          >
            Close
          </button>
        </div>
      </div>
      <div
        className="fixed z-50 preloader top-0 left-0 w-full h-screen text-white overflow-hidden
"
      >
        <div className="absolute top-0 left-0 blocks h-full bg-black w-1/2"></div>{" "}
        <div className="absolute top-0 right-0 blocks h-full bg-black w-1/2"></div>
        <div className="countdown py-5 whitespace-nowrap text-[12rem] overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          56
        </div>
        <div className="countdown py-5 whitespace-nowrap text-[12rem] overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          77
        </div>
        <div className="countdown py-5 whitespace-nowrap text-[12rem] overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          95
        </div>
        <div className="countdown py-5 whitespace-nowrap text-[12rem] overflow-hidden absolute top-1/2 left-[64%] md:left-[53%] -translate-x-1/2 -translate-y-1/2">
          9
        </div>
        <div className="absolute flex gap-5 top-1/2 left-1/2 overflow-hidden -translate-x-[50%] -translate-y-1/2 text-4xl">
          <h1 className="font-serif italic title-1">Kind</h1>
          <h1 className="title-2 font-sans">Root</h1>
        </div>
        <div className="bar absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white"></div>
        <div className="spinner w-15 h-15 absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full border-2 border-[#bbbbbb48] border-t-white border-x-white animate-spin"></div>
      </div>

      <div className="main-content text-white relative h-screen flex justify-center items-center overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-full">
          <img
            src="public\fleur-kaan-w4Dj3MshHQ0-unsplash.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center mx-5">
          <div className="overflow-hidden text-center">
            <span className="root-1 inline-block  text-[clamp(3rem,6vw,6rem)]  font-serif italic">
              Rooted in care,
            </span>
          </div>
          <div className="overflow-hidden text-center">
            <span className="root-2 inline-block  text-[clamp(3rem,6vw,6rem)]">
              grown in kindness
            </span>
          </div>
          <p className="text-center mt-5 main-p max-w-4xl mx-auto font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            nesciunt. Delectus labore similique velit, nemo error itaque odit
            dolorum quidem in! Nesciunt voluptates amet cumque rerum, error
            repudiandae nostrum! Aut.
          </p>
        </div>
        <div className="absolute buybar p-6 bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] bg-white flex justify-center items-center rounded-3xl">
          <button className="text-xl font-semibold text-black">
            Explore More
          </button>
          <div className="ball absolute right-2 bg-black grid place-items-center rounded-full w-14 h-14">
            <span className="text-white">&rarr;</span>
          </div>
        </div>
        <div className="h-16 navbar fixed w-full top-0">
          <div className="h-full px-5 flex justify-between items-center">
            <div className="">
              <h3 className="font-bold ">KindRoot</h3>
            </div>
            <ul className="hidden md:flex gap-5 items-center">
              <li>Services</li>
              <li>Testimonials</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
            <div className="">
              <button
                onClick={contextSafe(() => {
                  gsap.to(".menu-bar", {
                    xPercent: 0,
                    duration: 0.5,
                  });
                })}
              >
                Menu
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </>
  );
}

export default App;
