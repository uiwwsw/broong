import Body from '@/_Body';
import { UiProvider } from '@/UiProvider';
import { Outlet } from 'react-router-dom';

const NormalLayout = () => {
  return (
    <UiProvider>
      <Body>
        <div className="flex-auto">
          <Outlet />
        </div>
      </Body>
    </UiProvider>
  );
};

export default NormalLayout;
