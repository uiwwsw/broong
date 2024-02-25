import { useEffect, useRef } from 'react';

const Map = () => {
  const ref = useRef<HTMLDivElement>(null);
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };
  useEffect(() => {
    if (!ref.current) return;
    new kakao.maps.Map(ref.current, options);
  }, [ref.current]);
  return <div ref={ref} style={{ width: 500, height: 400 }}></div>;
};

export default Map;
