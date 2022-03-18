import React from "react";
import "./App.css";
import CarList from "./CarList";
import { Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <p>차량 리스트 보러가기</p>
        <div className="button">
          <Link className="move-btn" to="/list">
            목록보기
          </Link>
        </div>
        <p className="my-info">
          <span className="title">Written By</span> <br />
          이 름 : 백유라 <br />
          연락처 : 010-4512-9080 <br />
          email : bbyl6319@gmail.com{" "}
          <a className="mail-btn" href="mailto:bbyl6319@gmail.com">
            메일보내기
          </a>
        </p>
      </Route>

      <Route exact path="/list" component={CarList} />
    </div>
  );
}

export default App;
