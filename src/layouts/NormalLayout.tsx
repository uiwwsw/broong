// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Outlet } from 'react-router-dom';

const NormalLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default NormalLayout;
