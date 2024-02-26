import Header from './_Header';
import Wrap from '@/_Wrap';
import { UiProvider } from '@/UiProvider';
import { Outlet } from 'react-router-dom';
import Sidebar from './_Sidebar';

const DefaultLayout = () => {
  return (
    <UiProvider>
      <Wrap>
        <Header />
        <div className="flex flex-auto">
          <Sidebar />
          <div className="flex-auto overflow-hidden">
            <Outlet />
          </div>
        </div>
      </Wrap>
    </UiProvider>
  );
};

export default DefaultLayout;
