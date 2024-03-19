import { useSearchReviews } from '!/review/applications/search';
import { Review } from '!/review/domain';
import { SearchReviewRequest } from 'library';
import { useEffect, useRef, useState } from 'react';
interface MapProps {
  keyword?: string;
}
const Map = ({ keyword }: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { trigger, data } = useSearchReviews();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [permissionToast, setPerToast] = useState(false);
  const getMyLocation = (x: number, y: number) => setPosition({ x, y });
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          getMyLocation(position.coords.latitude, position.coords.longitude);
        },
        function (error) {
          if (error.code === error.PERMISSION_DENIED) setPerToast(true);
        },
      );
    } else {
      console.error('위치기능이 제공되지 않는 브라우저입니다.');
      // 없는 브라우저라면,
    }
  }, [navigator.geolocation]);
  useEffect(() => {
    if (!ref.current) return;

    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const mapOption = {
      center: new kakao.maps.LatLng(position.x, position.y), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(ref.current, mapOption);
    // kakao.maps.event.addListener(map, 'zoom_changed', function () {
    //   // 지도의 현재 레벨을 얻어옵니다
    //   const level = map.getLevel();
    //   console.log(level);
    // });
    search();
    kakao.maps.event.addListener(map, 'dragend', search);

    async function search() {
      const arg = map.getBounds() as unknown;
      const data = await trigger(arg as SearchReviewRequest);
      placesSearchCB(data);
    }

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(result?: Review[]) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      if (!result) return;

      for (let i = 0; i < result.length; i++) {
        const currentResult = result[i];
        displayMarker(currentResult);
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: Review) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(+place.y, +place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infoWindow.setContent('<div style="padding:5px;font-size:12px; color: #000;">' + place.placeName + '</div>');
        infoWindow.open(map, marker);
      });
    }
  }, [ref.current, position, keyword]);
  return <div ref={ref} style={{ height: 400 }}></div>;
};

export default Map;
