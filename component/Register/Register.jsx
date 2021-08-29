import React, { useState } from "react";
import Link from "next/link";
import valid from "../../src/controller/userUtils";
import Cookies from "js-cookie";
import { postData } from "../../src/routes/userData";
import { useRouter } from "next/dist/client/router";
const RegisterPage = () => {
  const router = useRouter();
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
    const res = await postData("auth/register", data);
    if (res.err) {
      alert(res.err);
      return;
    }
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
            Register
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
