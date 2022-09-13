import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  // ingredients에 재료 목록이 저장되기 때문에 배열을 초기값으로 사용
  // 재료가 추가되거나 삭제될 경우에 전체가 업데이트
  const [userIngredients, setUserIngredients] = useState([]);

  // Firebase 연결
  const addIngredientHandler = (ingredient) => {
    fetch(
      "https://react-hooks-update-a3dd5-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      // Firebase가 responseData를 반환하고 반환된 데이터는 객체이며, 그 안에 name 프로퍼티가 있고, 그 name 프로퍼티에는 Firebase가 생성한 고유한 ID가 들어있다.
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          {
            id: responseData.name,
            ...ingredient,
          },
        ]);
      });
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
