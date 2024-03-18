import { useEffect, useState } from 'react';
import useDebounceValue from '#/useDebounceValue'; // 가정: useDebounceValue 훅이 이미 정의되어 있음

interface PlacesProps {
  keyword: string;
  onSelect: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}

const Places = ({ keyword, onSelect }: PlacesProps) => {
  const debounceKeyword = useDebounceValue(keyword, 500);
  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResult>([]);
  const handleSelect = (place: kakao.maps.services.PlacesSearchResultItem) => onSelect(place);
  useEffect(() => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(debounceKeyword, (result, status) =>
      setPlaces(status === kakao.maps.services.Status.OK ? result : []),
    );
  }, [debounceKeyword, setPlaces]);

  return (
    <ul className="flex flex-col gap-6">
      {places.map((place) => (
        <li className="cursor-pointer p-2" key={place.id} onClick={() => handleSelect(place)}>
          <p className="flex items-end gap-2">
            <span>{place.place_name}</span>
            <span className="text-sm text-gray-500">{place.category_name}</span>
          </p>
          <p className="flex items-end gap-2">
            <span>리뷰</span>
            <span className="text-sm text-gray-500">(300)</span>
          </p>
          <p className="flex items-end gap-2">
            <span>주소</span>
            <span className="text-sm text-gray-500">{place.address_name}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Places;
