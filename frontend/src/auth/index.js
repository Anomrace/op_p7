import axios from "axios";

const auth = () => {
  axios
    .get(
      "http://localhost:3000/api/auth/user",
      JSON.parse(localStorage.getItem("token"))
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default auth;
