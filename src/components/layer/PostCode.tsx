import useUiContext from '#/useUIContext';
import { useMemo } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { useLocation, useNavigate } from 'react-router-dom';
const PostCode = () => {
  const geoCoder = new kakao.maps.services.Geocoder();
  const navigate = useNavigate();
  const location = useLocation();
  const search = useMemo(() => new URLSearchParams(location.search), [location]);
  const keyword = useMemo(() => search.get('keyword') ?? '', [search]);
  const from = useMemo(() => search.get('from') ?? '', [search]);
  const { setCache } = useUiContext();
  const getAddressCoords = (address: string) => {
    return new Promise<kakao.maps.LatLng>((resolve) => {
      geoCoder.addressSearch(address, (result) => {
        const coords = new kakao.maps.LatLng(+result[0].x, +result[0].y);
        resolve(coords);
      });
    });
  };
  const handleComplete = async (data: Address) => {
    const mainAddress = data.roadAddress || data.jibunAddress;
    const coords = await getAddressCoords(mainAddress);
    const latitude = coords.getLat();
    const longitude = coords.getLng();

    setCache(`${from}/address`, mainAddress);
    setCache(`${from}/latitude`, `${latitude}`);
    setCache(`${from}/longitude`, `${longitude}`);
    navigate(from);
    // let fullAddress = data.address;
    // let extraAddress = '';

    // if (data.addressType === 'R') {
    //   if (data.bname !== '') {
    //     extraAddress += data.bname;
    //   }
    //   if (data.buildingName !== '') {
    //     extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    //   }
    //   fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    // }

    // setCache('address', fullAddress, { path: from });
    // navigate(from);
  };
  return <DaumPostcodeEmbed defaultQuery={keyword} onComplete={handleComplete} className="w-full" />;
};
export default PostCode;
