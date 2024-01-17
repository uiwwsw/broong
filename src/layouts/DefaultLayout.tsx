import Header from '@/Header';
import Body from '@/_Body';
import { UiProvider } from '@/UiProvider';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <UiProvider>
      <Body>
        <Header />
        <div className="flex-auto">
          <Outlet />
        </div>
      </Body>
    </UiProvider>
  );
};

export default DefaultLayout;
