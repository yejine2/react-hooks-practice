import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  // title과 amount의 입력값에 사용될 state
  // input의 요소값은 문자열이기 때문에 문자열로 초기화
  const inputState = useState({ title: "", amount: "" });

  const submitHandler = (event) => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            {/* 2-way binding, inputState 배열에는 두 개의 요소가 있고, 0번 인덱스에 있는 첫 번째 요소는 현재 상태의 스냅샷 */}
            <input
              type="text"
              id="title"
              value={inputState[0].title}
              // 입력된 키는 newTitle에 값을 저장하고, 키가 입력될 때마다 새로 가져온 타이틀을 사용하게 한다.
              onChange={(event) => {
                const newTitle = event.target.value;
                inputState[1]((prevInputState) => ({
                  title: newTitle,
                  amount: prevInputState.amount,
                }));
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={inputState[0].amount}
              // 새로운 객체를 inputState에 전달해 현재 상태를 새로운 객체의 데이터로 업데이트
              onChange={(event) => {
                const newAmount = event.target.value;
                inputState[1]((prevInputState) => ({
                  amount: newAmount,
                  title: prevInputState.title,
                }));
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
