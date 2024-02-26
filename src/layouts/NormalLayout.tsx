import Wrap from '@/_Wrap';
import { UiProvider } from '@/UiProvider';
import { Outlet } from 'react-router-dom';
const NormalLayout = () => {
  return (
    <UiProvider>
      <Wrap>
        <div className="flex-auto">
          <Outlet />
        </div>
      </Wrap>
    </UiProvider>
  );
};

export default NormalLayout;
