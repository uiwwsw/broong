import { ROUTES } from '!/routes/domain';
import useUiContext from '#/useUIContext';
import Smooth from '@/Smooth';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { size } = useUiContext();

  return (
    <div
      className="sticky min-w-48 p-3 shadow-2xl"
      style={{ top: size?.header, height: `calc(100vh - ${size?.header}px)` }}
    >
      <Smooth className="flex h-full flex-col">
        {size?.header && (
          <>
            <ul className="flex-auto">
              {ROUTES.map((route) => (
                <li key={route.path}>
                  <NavLink to={route.path}>{route.name}</NavLink>
                </li>
              ))}
            </ul>
            <div className="">푸터푸터</div>
          </>
        )}
      </Smooth>
    </div>
  );
};

export default Sidebar;
