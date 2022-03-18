## 구현 내용
- Sass를 활용한 스타일 코드 작성 (Detail.scss) 
  - 따라서 반드시 npm install 후 실행 바랍니다. 
- 모달창 열기 직전 스크롤 위치를 저장하여 모달창을 닫은 후 이전에 보던 위치에서 시작하도록 스크롤위치 state를 추가했습니다.
- 할인율(%)가 0인 경우 출력 안함
- 차량 목록 페이지 상단의 아이콘 버튼을 눌러 '한번에 보이는 차량 카드의 수'를 조절할 수 있습니다.
- 낮은가격순/높은가격순/인기순/할인율 기준으로 차량 카드를 정렬할 수 있습니다.
- 차량 타입과 가능한 지역 필터로 분류해서 확인할 수 있습니다.

## 기술스택
- React


## local에서 json-server 실행 방법
```
json-server db.json --routes routes.json --port 8080
```

## api url
- 차량 전체 리스트: `http://localhost:8080/carClasses`
- 차량 상세 정보: `http://localhost:8080/carClasses/${carClassId}`
