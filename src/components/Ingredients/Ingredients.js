import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  // ingredients에 재료 목록이 저장되기 때문에 배열을 초기값으로 사용
  // 재료가 추가되거나 삭제될 경우에 전체가 업데이트
  const [userIngredients, setUserIngredients] = useState([]);

  /* useEffect() 첫번째 인수: 렌더링이 끝난 뒤에 실행되는 함수, 
  두번째 인수: 함수에서 사용하는 의존성(dependencies)이 저장된 배열, 이 의존성 배열이 변경될 때만 함수가 다시 실행
  빈 배열이면 컴포넌트가 처음 렌더링될 때만 실행 그 후로는 절대 실행되지 않는다.*/
  useEffect(() => {
    fetch(
      "https://react-hooks-update-a3dd5-default-rtdb.firebaseio.com/ingredients.json"
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
        setUserIngredients(loadedIngredients);
      });
  }, []);

  // Search 컴포넌트에서 onLoadIngredients가 호출됐을 때 실행할 함수
  const filteredIngredientsHandler = (filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  };

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
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
};

export default Ingredients;
