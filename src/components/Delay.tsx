import { ReactElement, cloneElement, useEffect, useState } from 'react';
interface DelayProps {
  show?: boolean;
  before?: number;
  after?: number;
  children?: ReactElement;
}
const Delay = ({ show, children, before, after, ...props }: DelayProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show === undefined) return;
    const sti = setTimeout(() => setVisible(show), (show ? before : after) ?? 0);
    return () => clearTimeout(sti);
  }, [show, before, after]);
  return visible && children ? cloneElement(children, props) : null;
};

export default Delay;
