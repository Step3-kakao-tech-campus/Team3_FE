"use client";

import { MdPlace } from "react-icons/md";
import React, { useState, useEffect } from "react";
import useToast from "@/hooks/useToast";

interface Props {
  place: string;
  update: boolean;
}

function KaKaoMap({ place, update }: Props) {
  const [location, setLocation] = useState({ latitude: 37.566826, longitude: 126.9786567 });
  const { addWarningToast } = useToast();

  function showCenterInfo(map: any) {
    const geocoder = new window.kakao.maps.services.Geocoder();

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    window.kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords: any, callback: () => void) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function displayCenterInfo(result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const infoDiv = document.getElementById("centerAddr");

        for (let i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  }

  function showPlaceOverlay(map: any, keyword: string) {
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, placesSearch);

    function placesSearch(data: any, status: any) {
      if (data.length === 0) {
        addWarningToast("검색결과가 없습니다.");
        return;
      }
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place: any) {
      const overlayContent = `
        <a href=${place.place_url} target='_blank' rel='noreferrer'>
          <div style="position: relative; padding: 5px; background-color: #fff; border: 1px solid #FE7E07; border-radius: 0.375rem; display: inline-block; cursor: pointer;">
            ${place.place_name}
            <div style="content: ''; position: absolute; top: 100%; left: 50%; border: 8px solid transparent; border-top-color: #FE7E07; transform: translateX(-50%);" />
          </div>
        </a>`;

      const overlay = new window.kakao.maps.CustomOverlay({
        map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
        content: overlayContent,
      });
    }
  }

  const initializeMap = (initializeLocation: { latitude: number; longitude: number }) => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(initializeLocation.latitude, initializeLocation.longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const markerPosition = new window.kakao.maps.LatLng(initializeLocation.latitude, initializeLocation.longitude);

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
        showCenterInfo(map);
      });
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        const newLocation = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
        setLocation(newLocation);
        initializeMap(newLocation);
      },
      () => {
        const defaultLocation = {
          // 서울 시청
          latitude: 37.566826, // Default latitude
          longitude: 126.9786567, // Default longitude
        };
        setLocation(defaultLocation);
        initializeMap(defaultLocation);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );
  };

  function move() {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
          center: new window.kakao.maps.LatLng(location.latitude, location.longitude), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        // 지도를 생성합니다
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        showCenterInfo(map);

        showPlaceOverlay(map, place);
      });
    }
  }

  useEffect(() => {
    if (place === "") return;
    move();
  }, [update]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="ml-auto mb-4 flex items-center text-blue-600 hover:underline hover:brightness-95"
        onClick={() => getLocation()}
      >
        <span className="text-lg">내위치</span>
        <MdPlace className="w-5 h-5" />
      </button>
      <div id="map" className="relative w-full pb-[100%]">
        <span id="centerAddr" className="absolute z-10 left-2 top-2 p-2 bg-white bg-opacity-75" />
      </div>
    </div>
  );
}
export default KaKaoMap;
