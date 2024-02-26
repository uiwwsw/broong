import { ROUTES } from '!/routes/domain';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex basis-64 flex-col">
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
