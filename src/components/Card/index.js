import Card from "./components/Card";

// 차량 정보 카드 컴포넌트
function Card(props) {
  // props
  let { viewMany, setScroll, setDetail, setCarInfo, car } = props;

  // render
  return (
    <div
      className={`box ${viewMany ? "short" : ""}`}
      onClick={() => {
        setScroll(window.scrollY);
        axios
          .get(`http://localhost:8080/carClasses/${car.carClassId}`)
          .then((result) => {
            // 클릭한 차량 Card의 Id로 해당 차량의 상세 정보 데이터를 불러와서 저장
            setCarInfo(result.data);
            setDetail(true);
            // console.log(carInfo)
          })
          .catch((err) => console.log(err));
      }}
    >
      <img src={car.image} alt="" />
      <div className="info">
        <h4 className="name-tags">{car.carClassName}</h4>
        <div className="tags">
          {car.carTypeTags.map((a, i) => {
            return a === "인기" ? (
              <span className="popular">{a}</span>
            ) : (
              <span>{a}</span>
            );
          })}
        </div>
        <p>
          {car.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          원{" "}
          <span className="discount">
            {car.discountPercent !== 0 ? `(-${car.discountPercent}%)` : null}
          </span>{" "}
          <br />
          <span className="sub-info">
            {car.year}년 |{" "}
            {car.drivingDistance >= 10000
              ? car.drivingDistance / 10000 + "만km"
              : car.drivingDistance / 1000 + "천km"}
            &nbsp;| {car.regionGroups.join(", ")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Card;
