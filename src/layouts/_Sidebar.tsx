import { ROUTES } from '!/routes/domain';
import useUiContext from '#/useUIContext';
import Smooth from '@/Smooth';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { size } = useUiContext();

  return (
    <div
      className="sticky flex w-48 flex-col p-3 shadow-2xl"
      style={{ top: size.header, height: `calc(100vh - ${size.header}px)` }}
    >
      <ul className="flex-auto">
        {ROUTES.map((route) => (
          <li key={route.path}>
            <NavLink to={route.path}>{route.name}</NavLink>
          </li>
        ))}
      </ul>
      <div className="">푸터푸터</div>
    </div>
  );
};

export default Sidebar;
