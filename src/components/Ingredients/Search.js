import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");

  // 사용자가 입력한 데이터를 firebase에서 가져오기 -> onChange에 등록한 함수에서 키 입력이 들어올때마다 http 요청 보내기
  // 이 함수는 enteredFilter 값이 변하거나 onLoadIngredients 값이 변했을 때만 다시 실행된다.
  // 다시 실행 시 요청을 통해 데이터를 받으면 onLoadIngredients()를 호출한다. 그러면  Ingredients 컴포넌트에 값이 들어간다.
  useEffect(() => {
    // 필터링 된 재료 가져오기
    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch(
      "https://react-hooks-update-a3dd5-default-rtdb.firebaseio.com/ingredients.json" +
        query
    )
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        // Ingredients 컴포넌트에 props 전달
        // onLoadIngredients(loadedIngredients);
      });
  }, [enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            // 사용자가 입력한 값이 저장된 state를 업데이트하는 일만 한다. 실행하는 건 useEffect()가 한다.(동작 분리)
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
