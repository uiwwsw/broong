import Header from '@/Header';
import { UiProvider } from '@/UiProvider';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <UiProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex-auto">
          <Outlet />
        </div>
      </div>
    </UiProvider>
  );
};

export default DefaultLayout;
