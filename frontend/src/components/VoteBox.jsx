import { useAuth0 } from "@auth0/auth0-react";

function upvote(user_id, stock_id) {
  const data = {
    votetype: true,
    user_id: user_id,
    stock_id: stock_id,
  };
  fetch("http://localhost:8000/vote", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Upvote Success:");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function downvote(user_id, stock_id) {
  const data = {
    votetype: false,
    user_id: user_id,
    stock_id: stock_id,
  };
  fetch("http://localhost:8000/vote", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Downvote Success:");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function VoteBox(props) {
  const voteCount = props.stock.likes - props.stock.dislikes;
  const { user, isAuthenticated } = useAuth0();

  function handleUpvote(e) {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Login to vote");
    } else {
      upvote(user.sub, props.stock.id);
    }
  }
  function handleDownvote(e) {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Login to vote!");
    } else {
      downvote(user.sub, props.stock.id);
    }
  }

  return (
    <>
      <button onClick={handleDownvote}>-</button>
      {voteCount}
      <button onClick={handleUpvote}>+</button>
    </>
  );
}
export default VoteBox;
