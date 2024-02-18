import Header from '@/Header';
import Wrap from '@/_Wrap';
import { UiProvider } from '@/UiProvider';
import { Outlet } from 'react-router-dom';
import Main from './_Main';

const DefaultLayout = () => {
  return (
    <UiProvider>
      <Wrap>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </Wrap>
    </UiProvider>
  );
};

export default DefaultLayout;
