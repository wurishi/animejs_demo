import { createTimer, engine, onScroll, Timer } from "animejs";

// engine.defaults.delay

async function waitForTimerToComplete() {
  return createTimer({
    duration: 250,
    onComplete: () => console.log("complete 250"),
    onUpdate: (self) => console.log(self.iterationCurrentTime),
  }) as any;
}

export default async function () {
  const t = createTimer({
    duration: 1000,
    loop: 3,
    // frameRate: 1,
    // alternate: true,
    // reversed: true,
    autoplay: false,
    playbackRate: 3,
    frameRate: 1,
    onUpdate: (self) => {
      console.log(
        "timer",
        self.currentTime,
        self.iterationCurrentTime,
        self.currentIteration
      );
      console.log("speed", self.speed);
    },
    onComplete: () => console.log(Date.now(), "complete1"),
  });
  //   t.seek(500, true);
  //   t.then(() => {
  //     console.log(Date.now(), "complete2");
  //   });
  //   console.log(Date.now(), t);

  const div = document.createElement("button");
  div.innerHTML = "click";
  div.addEventListener("click", () => {
    //   t.alternate();
    // t.seek(333, true);
    t.stretch(500);
    t.restart();
  });
  document.body.appendChild(div);

  //   const v = await waitForTimerToComplete();
  //   //   console.log(Date.now(), v);
  //   await v.reverse();
  //   t.play();
  //   v.play();
  //   setTimeout(() => {
  //     t.reverse();
  //   }, 3000);
}
