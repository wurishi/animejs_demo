import { animate, utils, waapi } from "animejs";

export default function () {
  const container = document.createElement("div");
  container.className = "animation-container";
  document.body.appendChild(container);
  const str = "HELLO WORLD";
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    const span = document.createElement("span");
    span.innerHTML = char;
    container.appendChild(span);
  }

  animate("span", {
    y: [
      { to: "-2.75rem", ease: "outExpo", duration: 600 },
      { to: 0, ease: "outBounce", duration: 800, delay: 100 },
    ],
    // Property specific parameters
    rotate: {
      from: "-1turn",
      delay: 0,
    },
    delay: (_, i) => i * 50, // Function based value
    ease: "inOutCirc",
    loopDelay: 1000,
    loop: true,
  });

  const res1 = document.createElement("div");
  document.body.appendChild(res1);

  const vector = { x: 0, y: 0 };
  animate(vector, {
    duration: 10000,
    x: 100,
    y: 150,
    modifier: utils.round(0),
    onUpdate: () => (res1.textContent = JSON.stringify(vector)),
  });
}
