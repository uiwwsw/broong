import Wrap from '@/ui/Wrap';
import Button from '@/Button';
import { ComponentType } from 'react';
import Modal from '@/Modal';
export interface WithLayerProps {
  show?: boolean;
  onClose?: (params?: unknown) => void;
}
const withLayer = <P,>(WrappedComponent: ComponentType<P & WithLayerProps>) => {
  return (props: P & WithLayerProps) => {
    const handleClick = () => props?.onClose && props.onClose();

    return (
      <Modal show={props?.show}>
        <Wrap>
          <div>
            <Button onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
            </Button>
          </div>
          <WrappedComponent {...props} />
        </Wrap>
      </Modal>
    );
  };
};

export default withLayer;
