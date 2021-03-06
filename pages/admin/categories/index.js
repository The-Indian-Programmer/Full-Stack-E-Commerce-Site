import React, { useEffect, useState } from "react";
import {
  createCategories,
  deleteCategories,
  getCategories,
  updateCategories,
} from "../../../src/routes/category";
import Head from "next/dist/shared/lib/head";
import { setCategory, setUser, showNotification } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getData } from "../../../src/routes/userData";
const Categories = ({ data }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const [name, setName] = useState("");
  const cookie = Cookies.get("userAuth");
  const categorySubmit = async (e) => {
    e.preventDefault();
    const res = await createCategories(
      "category/createcategory",
      name.toLowerCase()
    );
    if (res.err) {
      return dispatch(
        showNotification({
          show: true,
          data: { message: res.err, type: "error" },
        })
      );
    }
    dispatch(
      showNotification({
        show: true,
        data: { message: res.message, type: "success" },
      })
    );
    setName("");
    dispatch(setCategory(res.categories));
  };
  useEffect(() => {
    if (cookie === undefined) {
      router.push("/signin");
    } else {
      setUserInRedux();
    }
  }, []);
  const setUserInRedux = async () => {
    const response = await getData("auth/getuser", cookie);
    dispatch(setUser(response.data));
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const deleteCategory = async (id) => {
    const deleteResponse = await deleteCategories(
      "category/deletecategory",
      id
    );
    if (deleteResponse.err) {
      return dispatch(
        showNotification({
          show: true,
          data: { message: deleteResponse.err, type: "error" },
        })
      );
    }
    dispatch(
      showNotification({
        show: true,
        data: { message: "Category Deleted", type: "success" },
      })
    );
    dispatch(setCategory(deleteResponse.categories));
  };
  const updateCategory = async (id) => {
    const newName = prompt("Updated Name");
    const updateResponse = await updateCategories("category/updatecategory", {
      id: id,
      name: newName.toLowerCase(),
    });
    if (updateResponse.err) {
      return dispatch(
        showNotification({
          show: true,
          data: { message: updateResponse.err, type: "error" },
        })
      );
    }
    dispatch(
      showNotification({
        show: true,
        data: { message: "Category Updated", type: "success" },
      })
    );
    console.log(updateResponse);
    dispatch(setCategory(updateResponse.categories));
  };
  return (
    <>
      <Head>
        <title>Admin Categories Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
      </Head>
      <main className="createcategories">
        <form onSubmit={categorySubmit} action="">
          <div className="category_input">
            <input
              type="text"
              className=""
              name="category"
              value={name}
              onChange={handleChange}
              placeholder="Create Category"
            />
          </div>
          <button className="category_submit">Submit</button>
        </form>
        <div className="category_container">
          {categories.map((item) => {
            return (
              <div key={item._id} className="category">
                <h2 className="name">{item.name.toUpperCase()}</h2>
                <div className="action_button">
                  <i
                    onClick={() => updateCategory(item._id)}
                    className="fas fa-edit edit_category"
                  ></i>
                  <i
                    onClick={() => deleteCategory(item._id)}
                    className="far fa-trash-alt delete_category"
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Categories;

export async function getServerSideProps() {
  const response = await getCategories("category/getcategory");
  return {
    props: { data: response.data }, // will be passed to the page component as props
  };
}
