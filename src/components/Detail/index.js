import ".././../styles/Detail.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 상세 모달창 컴포넌트
function Detail(props) {
  //props
  let { carInfo, setDetail } = props;

  //render
  return (
    <div
      className="modalBackground"
      onClick={() => {
        setDetail(false);
      }}
    >
      <div className="modalBox">
        <span
          className="close"
          onClick={() => {
            setDetail(false);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <img src={carInfo[0].carImage} alt="" />
        <h3>{carInfo[0].carClassName}</h3>
        <div className="basic-Info">
          <table>
            <tr>
              <th>제조사</th>
              <td>{carInfo[0].maker}</td>
            </tr>
            <tr>
              <th>분류</th>
              <td>{carInfo[0].carModel}</td>
            </tr>
            <tr>
              <th>연료</th>
              <td>{carInfo[0].fuel}</td>
            </tr>
            <tr>
              <th>변속방식</th>
              <td>{carInfo[0].gearbox}</td>
            </tr>
            <tr>
              <th>승차정원</th>
              <td>{carInfo[0].capacity}</td>
            </tr>
          </table>
        </div>
        <div className="safe-info">
          <h4>안전옵션</h4>
          <ul>
            {carInfo[0].safetyOption.map((a, i) => {
              return <li>- {a}</li>;
            })}
          </ul>
        </div>
        <div className="comfort-info">
          <h4>편의옵션</h4>
          <ul>
            {carInfo[0].additionalOption.map((a, i) => {
              return <li>- {a}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Detail;
