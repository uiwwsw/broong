import useUiContext from '#/useUIContext';
import Scroll from '@/Scroll';
import { useEffect, useRef } from 'react';

const Header = () => {
  const { title, setSize } = useUiContext();
  const headRef = useRef<HTMLHeadElement>(null);
  const iRef = useRef<HTMLElement>(null);
  const handleScroll = () => {
    const { scrollY, innerHeight } = window;
    const ceilScrollY = Math.ceil(scrollY);
    const opacity = Math.min(ceilScrollY / Math.min(300, document.body.scrollHeight - innerHeight), 1).toFixed(2);
    const width = Math.min(ceilScrollY / (document.body.scrollHeight - innerHeight), 1).toFixed(2);
    headRef.current && headRef.current.setAttribute('style', `--tw-bg-opacity: ${opacity}`);
    // console.log(iRef.current.style.backgroundColor);
    iRef.current && iRef.current.setAttribute('style', `transform: scaleX(${width})`);
  };
  useEffect(() => {
    if (headRef.current) setSize({ header: headRef.current.clientHeight });
  }, [headRef.current]);
  return (
    <>
      <Scroll infinity onScroll={handleScroll} throttle={10} />
      <header
        ref={headRef}
        className="sticky top-0 z-50 origin-left bg-white bg-opacity-0 p-3 shadow backdrop-blur-lg dark:bg-zinc-700"
      >
        <h1>{title}</h1>
        <i className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-teal-700`} ref={iRef} />
      </header>
    </>
  );
};
export default Header;
