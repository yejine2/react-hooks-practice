import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  // ingredients에 재료 목록이 저장되기 때문에 배열을 초기값으로 사용
  // 재료가 추가되거나 삭제될 경우에 전체가 업데이트
  const [userIngredients, setUserIngredients] = useState([]);

  // 기존에 있던 ingredients 목록에 새로 받은 값을 추가해 업데이트 하기
  // prevIngredients는 현재 state이다.
  // id, title, amount를 가진 새로운 객체가 ingredients 목록에 추가
  const addIngredientHandler = (ingredient) => {
    setUserIngredients((prevIngredients) => [
      ...prevIngredients,
      {
        id: Math.random().toString(),
        ...ingredient,
      },
    ]);
  };

  return (
    <div className="App">
      {/* Add Ingredient 버튼이 있는 form에 props로 전달 */}
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
};

export default Ingredients;
