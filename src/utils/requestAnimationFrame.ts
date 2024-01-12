type requestAnimationFrameProps = (value: number) => boolean;
const requestAnimationFrame = (frame: requestAnimationFrameProps) => {
  let startTime: number;
  const requestAnimationFrame = (time: number) => {
    if (startTime === undefined) startTime = time;

    const timeElapsed = time - startTime;
    if (frame(timeElapsed)) window.requestAnimationFrame(requestAnimationFrame);
  };
  window.requestAnimationFrame(requestAnimationFrame);
};

export default requestAnimationFrame;
