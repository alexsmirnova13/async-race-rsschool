import { useEffect, useRef } from 'react';

interface IuseAnimationFrameProps {
  nextAnimationFrameHandler : any;
  duration: number;
  shouldAnimate:boolean
}

const useAnimationFrame = ({
  nextAnimationFrameHandler,
  duration = Number.POSITIVE_INFINITY,
  shouldAnimate = true,
}: IuseAnimationFrameProps) => {
  const frame = useRef(0);
  const firstFrameTime = useRef(performance.now());

  const animate = (now:any) => {
    let timeFraction = (now - firstFrameTime.current) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }

    if (timeFraction <= 1) {
      nextAnimationFrameHandler(timeFraction);

      if (timeFraction !== 1) frame.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (shouldAnimate) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame.current);
    }

    return () => cancelAnimationFrame(frame.current);
  }, [shouldAnimate]);
};

export default useAnimationFrame;
