import { ROUTES } from '!/routes/domain';
import useRipple from '#/useRipple';
import Icon from '@/Icon';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const { Ripple, ...rippleProps } = useRipple();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-0 m-auto flex h-16 max-w-lg gap-1 overflow-hidden border-t border-t-zinc-800 bg-inherit"
      {...rippleProps}
    >
      {ROUTES.map((x) => (
        <NavLink key={x.path} className="relative flex flex-1 select-none" to={x.path}>
          {({ isActive }) => (
            <p className="m-auto flex flex-col self-center text-center">
              <Icon
                solid={isActive}
                className={clsx({
                  'm-auto h-5 w-5': true,
                  'fill-gray-200': isActive,
                  'stroke-gray-400': !isActive,
                })}
              >
                {x.name}
              </Icon>
              <span
                className={clsx({
                  'mt-1 text-sm font-light': true,
                  'text-gray-200': isActive,
                  'text-gray-400': !isActive,
                })}
              >
                {x.name}
              </span>
            </p>
          )}
        </NavLink>
      ))}
      {Ripple}
    </div>
  );
};
export default NavBar;
