import { useEffect, useState, useTransition } from 'react';
import { useLocation } from 'react-router-dom';

const useRouteTransition = () => {
  const location = useLocation();
  const [oldLocation, setOldLocation] = useState(location);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // if the path or search params change, mark this is a navigational transition
    setOldLocation((oldLocation) =>
      oldLocation.pathname !== location.pathname || oldLocation.search !== location.search ? location : oldLocation,
    );
  }, [location]);

  useEffect(() => {
    // tell concurrent mode to pause UI rendering for a moment
    startTransition(() => {});
  }, [oldLocation]);

  return oldLocation;
};
export default useRouteTransition;
