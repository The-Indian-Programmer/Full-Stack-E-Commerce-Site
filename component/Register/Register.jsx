import React, { useState } from "react";
import Link from "next/link";
import valid from "../../src/controller/userUtils";
import Cookies from "js-cookie";
import { postData } from "../../src/routes/userData";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { showNotification } from "../../store/index";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
const RegisterPage = () => {
  const [btnLoading, setBtnLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const res = await postData("auth/register", data);
    if (res.err) {
      setBtnLoading(false);
      dispatch(
        showNotification({
          show: true,
          data: { message: res.err, type: "error" },
        })
      );
      return;
    }
    setBtnLoading(false);
    Cookies.set("userAuth", res.data.tokens[0].token, { expires: 7 });
    router.push("/");
  };
  return (
    <>
      <div className="register">
        <form onSubmit={handleSubmit} method="post">
          <h1>Register </h1>
          <div className="input_name">
            <input
              type="text"
              name="name"
              id="name"
              className="name"
              placeholder="UserName"
              value={data.name}
              onChange={handleChange}
            />
          </div>
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
          <div className="input_cpassword">
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              className="cpassword"
              placeholder="Confirm Password"
              value={data.cpassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn_submit">
            {btnLoading ? <ButtonLoader /> : "Register"}
          </button>
          <p className="login_text">
            Already have an account <Link href="/signin">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
