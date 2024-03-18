import useUiContext from '#/useUIContext';
import Places from '@/ui/Places';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '@/Input';
import withLayer from './Layer';
const SearchPlaces = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const { setCache } = useUiContext();
  const location = useLocation();
  const search = useMemo(() => new URLSearchParams(location.search), [location]);
  const from = useMemo(() => search.get('from') ?? '', [search]);

  const handleComplete = (place: kakao.maps.services.PlacesSearchResultItem) => {
    setCache(`${from}/placeId`, place.id);
    setCache(`${from}/placeName`, place.place_name);
    setCache(`${from}/longitude`, place.x);
    setCache(`${from}/latitude`, place.y);
    navigate(from);
  };
  return (
    <>
      <Input className="sticky top-8 mb-4 mt-2 w-full" onChange={(e) => setKeyword(e.target.value)} />
      <Places keyword={keyword} onSelect={handleComplete} />
    </>
  );
};

export default withLayer(SearchPlaces);
