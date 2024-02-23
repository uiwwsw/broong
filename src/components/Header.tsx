import useUiContext from '#/useUIContext';
import Scroll from '@/Scroll';
import { useRef } from 'react';

const Header = () => {
  const { title, underlineColor } = useUiContext();
  const headRef = useRef<HTMLHeadElement>(null);
  const iRef = useRef<HTMLElement>(null);
  const handleScroll = () => {
    const { scrollY, innerHeight } = window;
    const ceilScrollY = Math.ceil(scrollY);
    const opacity = Math.min(ceilScrollY / Math.min(300, document.body.scrollHeight - innerHeight), 1).toFixed(2);
    const width = Math.min(ceilScrollY / (document.body.scrollHeight - innerHeight), 1).toFixed(2);
    headRef.current && headRef.current.setAttribute('style', `--tw-bg-opacity: ${opacity}`);
    iRef.current && iRef.current.setAttribute('style', `transform: scaleX(${width})`);
  };
  return (
    <>
      <Scroll infinity onScroll={handleScroll} debounce={0} />
      <header ref={headRef} className="sticky top-0 z-50 origin-left bg-white bg-opacity-0 p-3 backdrop-blur-lg">
        <h1>{title}</h1>
        <i
          className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-teal-700"
          ref={iRef}
          style={{ backgroundColor: underlineColor }}
        />
      </header>
    </>
  );
};
export default Header;
