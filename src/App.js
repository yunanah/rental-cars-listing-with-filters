import React from "react";
import "../src/styles/App.css";
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
      </Route>

      <Route exact path="/list" component={CarList} />
    </div>
  );
}

export default App;
