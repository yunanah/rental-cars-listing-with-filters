import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faSortDown,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

import Card from "../Card";
import Detail from "../Detail";

//차량 리스트 페이지 컴포넌트
function CarList() {
  let [loading, setLoading] = useState(true); // 페이지 로딩 state
  let [stock, setStock] = useState(true); // 재고 여부 state
  let [cars, setCars] = useState([]); // 페이지에 보여줄 차량 데이터 배열 state
  let [detail, setDetail] = useState(false); // 상세 모달창 state
  let [carInfo, setCarInfo] = useState(null); // 선택한 차량 (상세페이지에 정보 불러올 차량 Id)
  let [morePress, setMorePress] = useState(0); // 더보기 버튼 누른 횟수 count
  let [more, setMore] = useState(true); // 더보기 버튼 보여주기 state - 더보여줄 차량이 없으면 false
  let [scroll, setScroll] = useState(0); // 스크롤 y축 정보 state
  let [viewMany, setViewMany] = useState(false); // 한번에 많이 보기 설정 state
  let [filter, setFilter] = useState(0); // 정렬 기준 - 0:가격 내림차순, 1:가격 오름차순, 2:인기순, 3:할인율순

  let [sizes, setSizes] = useState([true, true, true, true, true]); // 필터 선택된 차량 종류
  let [regions, setRegions] = useState([true, true, true, true, true]); // 필터 선택된 지역들

  const carSizes = ["경형/소형", "준중형", "중형/대형", "SUV", "수입"];
  const carRegions = [
    "광주",
    "대전",
    "대구/경북",
    "부산/창원",
    "서울/경기/인천",
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await axios
      .get("http://localhost:8080/carClasses")
      .then((result) => {
        let timer = setTimeout(() => {
          setLoading(false);
        }, 2000); // 데이터 로딩 종료
        // 더보기 버튼, 재고 상태 초기화
        setMore(true);
        setStock(true);

        // console.log(result.data)

        // 사이즈 및 지역 선택사항 필터링
        let cloneData = [...result.data]; // 원본데이터를 복제한 데이터
        let selectedSizes = []; // 필터에서 선택된 차종만 저장될 배열
        let selectedRegions = []; // 필터에서 선택된 지역만 저장될 배열

        // sizes와 regions state에서 필터된 것들만 저장
        sizes.forEach((a, i) => {
          if (a) return selectedSizes.push(carSizes[i]);
        });
        regions.forEach((a, i) => {
          if (a) return selectedRegions.push(carRegions[i]);
        });
        // console.log(selectedSizes, selectedRegions)

        // 차들 중에서 필터에 맞는 차만 걸러내 저장
        cloneData = cloneData.filter((a) => {
          if (selectedSizes.includes(a.carModel)) {
            for (let reg of selectedRegions) {
              if (a.regionGroups.includes(reg)) {
                return true;
              }
            }
          }
          return false;
        });

        // 필터링 후 길이를 통해 더보기 버튼, 재고 여부 state 변경
        if (cloneData.length < (morePress + 1) * 5) {
          // 차량 데이터 크기에 따라 0-재고없음 , 더보기버튼 보이는지 여부 처리
          setMore(false);
        }
        if (cloneData.length === 0) {
          setStock(false);
        }

        // filter에 따라 정렬 : 0-낮은가격순 , 1-높은가격순, 2-인기순, 3-할인율순
        if (filter == 0) {
          cloneData.sort((a, b) => {
            return a.price - b.price;
          });
        } else if (filter == 1) {
          cloneData.sort((a, b) => {
            return b.price - a.price;
          });
        } else if (filter == 2) {
          // 따로 수치가 없고 인기 태그 여부로 배치했습니다
          let tempArr = [];

          result.data.map((a, i) => {
            if (a.carTypeTags.includes("인기")) {
              tempArr.push(a);
            }
          });
          result.data.map((a, i) => {
            if (!a.carTypeTags.includes("인기")) {
              tempArr.push(a);
            }
          });

          cloneData = tempArr;
        } else if (filter == 3) {
          cloneData.sort((a, b) => {
            return b.discountPercent - a.discountPercent;
          });
        }

        // 더보기 버튼 클릭 횟수에 맞게 차량 개수 설정
        setCars(cloneData.slice(0, 5 * (morePress + 1)));
        // 이전에 확인한 스크롤로 이동
        window.scrollTo(0, scroll);
        // console.log('cars',cars)

        return () => {
          clearTimeout(timer);
        };
      })
      .catch((err) => console.log("에러", err));
  }, [morePress, detail, filter, sizes, regions]); // 더보기 버튼을 누르거나 상세 모달창 열고 닫을 때마다 실행됨

  // 정렬 방식 select 선택 이벤트 값 state에 저장
  const handleSelect = (e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
  };

  //render
  return (
    <div className={`body ${detail ? "dimmed" : ""}`}>
      <div className="list-view">
        <div className="header">
          <Link to="/">
            <FontAwesomeIcon className="go-back" icon={faArrowLeft} />
          </Link>
          <h2>추천 차량</h2>
          <div className="buttons">
            <div className="select-group is-active">
              <select
                onChange={handleSelect}
                value={filter}
                className="form-select"
              >
                <option value="0">낮은가격순</option>
                <option value="1">높은가격순</option>
                <option value="2">인기순</option>
                <option value="3">할인율</option>
              </select>
              <FontAwesomeIcon className="select-icon" icon={faSortDown} />
            </div>
            <div className="show-version-btn">
              <FontAwesomeIcon
                onClick={() => {
                  setViewMany(!viewMany);
                }}
                className="icon-btn"
                icon={viewMany ? faAlignJustify : faSquare}
              />
            </div>
          </div>
          <div className="types">
            <div className="size-filters">
              <h4>차종</h4>
              <div className="items">
                {carSizes.map((a, i) => {
                  return (
                    <span
                      className={`item ${sizes[i] ? "selected" : ""}`}
                      onClick={() => {
                        let cloneSizes = [...sizes];
                        cloneSizes[i] = !cloneSizes[i];
                        setScroll(0);
                        setSizes(cloneSizes);
                      }}
                    >
                      {a}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="region-filters">
              <h4>지역</h4>
              <div className="items">
                {carRegions.map((a, i) => {
                  return (
                    <span
                      className={`item ${regions[i] ? "selected" : ""}`}
                      onClick={() => {
                        let cloneRegions = [...regions];
                        cloneRegions[i] = !cloneRegions[i];
                        setScroll(0);
                        setRegions(cloneRegions);
                      }}
                    >
                      {a}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {loading === true ? (
          <div className="loading">로딩 중...</div>
        ) : !stock ? (
          <div className="no-stock">차량 없음</div>
        ) : (
          <>
            {
              // render 차량 Card 컴포넌트
              cars.map((a, i) => {
                return (
                  <Card
                    className="card"
                    viewMany={viewMany}
                    setScroll={setScroll}
                    setCarInfo={setCarInfo}
                    setDetail={setDetail}
                    car={cars[i]}
                    key={i}
                  />
                );
              })
            }

            {
              // 더보기 버튼
              more ? (
                <div
                  className="more"
                  onClick={() => {
                    setMorePress(morePress++);
                    setScroll(window.scrollY + 100);
                    let newCars = [...cars];
                    newCars.push();
                  }}
                >
                  더보기
                </div>
              ) : null
            }

            {
              // 상세정보 모달창
              detail ? <Detail setDetail={setDetail} carInfo={carInfo} /> : null
            }
          </>
        )}
      </div>
    </div>
  );
}

export default CarList;
