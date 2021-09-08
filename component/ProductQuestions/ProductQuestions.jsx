import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../store/index";
import { postProductQuestion } from "../../src/routes/productquestion";
import { useRouter } from "next/dist/client/router";
import EmptyEntry from "../Empty/EmptyEntry";
const ProductQuestions = ({ data }) => {
  console.log(data);
  const user = useSelector((state) => state.setUser);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState("");
  const dispatch = useDispatch();
  // submit question
  const router = useRouter();
  const submitQuestion = async (e) => {
    e.preventDefault();
    if (!question)
      dispatch(
        showNotification({
          show: true,
          data: { message: "Question is Empty", type: "error" },
        })
      );
    const response = await postProductQuestion(
      "productquestion/productquestion",
      user._id,
      router.query.id,
      question,
      user.name
    );
    if (response.err) {
      return dispatch(
        showNotification({
          show: true,
          data: { message: response.err, type: "error" },
        })
      );
    }
    dispatch(
      showNotification({
        show: true,
        data: { message: response.message, type: "success" },
      })
    );
    setQuestion("");
    setShowModal(false);
  };
  return (
    <div className="product_questions">
      {/* ask questions  */}
      <div onClick={() => setShowModal(true)} className="askquestion">
        <img src={user.avatar} alt="" className="image" />
        <p className="askquestion_text">Ask a question. </p>
      </div>
      {/* questions  */}
      <div className="questions">
        {data.questions.length === 0 ? (
          <EmptyEntry text="No Question! Be the first to ask a question" />
        ) : (
          ""
        )}
        {data.questions.map((item) => {
          return (
            <div className="question_box">
              <p className="question">
                Question : <span>{item.question}</span>
              </p>
              <p className="answer">
                Answer :{" "}
                <span>
                  {item.answer === "" ? "Wait for the reply" : item.answer}
                </span>
              </p>
            </div>
          );
        })}
      </div>
      {/* modal  */}
      {showModal ? (
        <div className="modal">
          <form onSubmit={submitQuestion}>
            <div className="question">
              <input
                type="text"
                className="question_input"
                placeholder="Enter Your Question here ..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="question_action_button">
              <button onClick={() => setShowModal(false)} className="close">
                Close
              </button>
              <button type="submit" className="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductQuestions;
