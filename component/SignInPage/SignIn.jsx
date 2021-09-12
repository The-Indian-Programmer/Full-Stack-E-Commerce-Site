import React, { useEffect, useState } from "react";
import Link from "next/link";
import { postData, getData } from "../../src/routes/userData";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";
import setUser from "../../reducers/AuthReducer";
import { showNotification } from "../../store/index";
const SignInPage = () => {
  const user = useSelector((state) => state.setUser);
  const cookie = Cookies.get("userAuth");
  const router = useRouter();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  useEffect(async () => {
    if (cookie !== undefined) {
      router.push("/");
    }
  }, []);
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postData("auth/signin", data);
    if (res.err) {
      dispatch(
        showNotification({
          show: true,
          data: { message: res.err, type: "error" },
        })
      );
      return;
    }
    Cookies.set("userAuth", res.data.tokens[0].token, { expires: 7 });
    router.push("/");
  };
  return (
    <div className="signinpage">
      <div className="signin">
        <form method="post" onSubmit={handleSubmit}>
          <h1>Login </h1>
          <div className="input_email">
            <input
              type="text"
              name="email"
              id="email"
              className="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="input_password">
            <input
              type="password"
              name="password"
              id="password"
              className="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn_submit">
            Login
          </button>
          <p className="register_text">
            Don't have an account <Link href="/register">Create One</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
