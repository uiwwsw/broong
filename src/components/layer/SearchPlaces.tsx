import Places from '@/ui/Places';
import { useState } from 'react';
import Input from '@/Input';
import withLayer, { WithLayerProps } from './withLayer';
type SearchPlacesProps = WithLayerProps;
const SearchPlaces = ({ onClose }: SearchPlacesProps) => {
  const [keyword, setKeyword] = useState('');

  const handleComplete = (place: kakao.maps.services.PlacesSearchResultItem) => {
    onClose && onClose(place);
  };
  return (
    <>
      <Input className="sticky top-8 mb-4 mt-2 w-full" onChange={(e) => setKeyword(e.target.value)} />
      <Places keyword={keyword} onSelect={handleComplete} />
    </>
  );
};

export default withLayer(SearchPlaces);
