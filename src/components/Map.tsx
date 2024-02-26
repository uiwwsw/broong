import { useEffect, useRef } from 'react';

const Map = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };
  useEffect(() => {
    if (!ref.current) return;

    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    var infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 지도를 생성합니다
    var map = new kakao.maps.Map(ref.current, mapOption);

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch('이태원 맛집', placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(result: kakao.maps.services.PlacesSearchResult, status: kakao.maps.services.Status) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < result.length; i++) {
          const currentResult = result[i];
          displayMarker(currentResult);
          bounds.extend(new kakao.maps.LatLng(+currentResult.y, +currentResult.x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: kakao.maps.services.PlacesSearchResultItem) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(+place.y, +place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infoWindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infoWindow.open(map, marker);
      });
    }
  }, [ref.current]);
  return <div ref={ref} style={{ width: 500, height: 400 }}></div>;
};

export default Map;
