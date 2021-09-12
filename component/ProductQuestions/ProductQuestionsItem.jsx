import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProductReply } from "../../src/routes/productreply";
import { setProduct, showNotification } from "../../store/index";
const ProductQuestionsItem = ({ item, productid }) => {
  const user = useSelector((state) => state.setUser);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();
  // reply questions
  const replyQuestion = () => {
    setShowReplyModal(true);
  };
  const handleSubmitReply = async (e) => {
    e.preventDefault();
    const response = await postProductReply(
      "productreply/productReply",
      item.userid,
      item.username,
      item.question,
      productid,
      reply
    );
    console.log(response);
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
    dispatch(setProduct(response.product));
    setReply("");
    setShowReplyModal(false);
  };

  return (
    <>
      <div key={item._id} className="question_box">
        <p className="question">
          Question : <span>{item.question}</span>
          {/* show button only if user is admin */}
          {user.role === "admin" && (
            <button
              onClick={() =>
                replyQuestion(item.userid, item.username, item.question)
              }
              className="question_reply_button"
            >
              Reply
            </button>
          )}
        </p>

        <p className="answer">
          Answer :{" "}
          <span>
            {item.answer === ""
              ? item.userid === user._id
                ? "Wait for the reply"
                : "No Reply yet"
              : item.answer}
          </span>
        </p>
      </div>
      {/* replymodal */}
      {showReplyModal ? (
        <div className="replymodal">
          <form onSubmit={handleSubmitReply}>
            <div className="reply">
              <textarea
                className="reply_input"
                placeholder="Enter Reply here ..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></textarea>
            </div>
            <div className="reply_action_button">
              <button
                onClick={() => setShowReplyModal(false)}
                className="close"
              >
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

      {/* modal  */}
    </>
  );
};

export default ProductQuestionsItem;
