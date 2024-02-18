import Wrap from '@/_Wrap';
import { UiProvider } from '@/UiProvider';
import { Outlet } from 'react-router-dom';
import Main from './_Main';

const NormalLayout = () => {
  return (
    <UiProvider>
      <Wrap>
        <Main>
          <Outlet />
        </Main>
      </Wrap>
    </UiProvider>
  );
};

export default NormalLayout;
