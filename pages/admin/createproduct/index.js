import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getData } from "../../../src/routes/userData";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/index";
import { getCategories } from "../../../src/routes/category";
import { imageUpload } from "../../api/upload/imageUpload";
import { postProductData } from "../../../src/routes/productData";
const CreateProduct = ({ data }) => {
  const [images, setImages] = useState([]);
  const [inputData, setInputData] = useState({
    title: "",
    price: "",
    originalprice: "",
    instock: "",
    description: "",
    content: "",
    category: "",
    isprime: "",
  });
  const router = useRouter();
  const cookie = Cookies.get("userAuth");
  const dispatch = useDispatch();
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
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };
  const handleFormSubmit = async () => {
    console.log("hello");
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);
    console.log(imgNewUrl);
    const imagedata = await imageUpload(imgNewUrl);
    console.log(imagedata);
  };

  const handleUploadChange = (e) => {
    let newImages = [];
    const files = [...e.target.files];
    if (files.length === 0) {
      alert("Files do not exist.");
      return;
    }
    files.forEach((file) => {
      if (file.size > 1024 * 1024) {
        alert("Largest file size is 1Mb");
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("Image format is incorrect");
        return;
      }
      newImages.push(file);
      return newImages;
    });
    const imagecount = images.length + newImages.length;
    if (imagecount > 6) {
      alert("Images shound not be greater than 6");
      return;
    }
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    // const image = images.splice(index, 1);
    // console.log(image, index);
    // console.log(images);
    const imagebox = images.filter(function (file, i) {
      return i !== index;
    });
    setImages(imagebox);
  };
  return (
    <>
      <Head>
        <title>Create Product</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossorigin="anonymous"
        />
      </Head>
      <main className="create_product">
        <form>
          <div className="title">
            <input
              type="text"
              name="title"
              className="input_title"
              placeholder="Enter Title"
              value={inputData.title}
              onChange={handleChange}
            />
          </div>
          <div className="price">
            <input
              type="number"
              name="price"
              className="input_price"
              placeholder="Enter Price"
              value={inputData.price}
              onChange={handleChange}
            />
          </div>
          <div className="originalprice">
            <input
              type="number"
              name="originalprice"
              className="input_originalprice"
              placeholder="Enter Original Price"
              value={inputData.originalprice}
              onChange={handleChange}
            />
          </div>
          <div className="instock">
            <input
              type="number"
              name="instock"
              className="input_stock"
              placeholder="How Many You Have InStock?"
              value={inputData.instock}
              onChange={handleChange}
            />
          </div>
          <div className="description">
            <textarea
              name="description"
              id="input_description"
              placeholder="Enter Description"
              value={inputData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="content">
            <textarea
              name="content"
              id="input_content"
              placeholder="Content"
              value={inputData.content}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="category">
            <label htmlFor="category">Choose Category</label>
            <select
              name="category"
              name="category"
              id="category"
              value={inputData.category}
              onChange={handleChange}
            >
              {data.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.name.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="isprime">
            <label htmlFor="isprime">Is Prime</label>
            <select
              name="isprime"
              value={inputData.isprime}
              onChange={handleChange}
              id="isprime"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleFormSubmit}
            className="btn_create_product"
          >
            Submit
          </button>
        </form>
        <div className="image_container">
          <div className="image_input">
            <label htmlFor="image">Upload</label>
            <input
              id="image"
              type="file"
              name="image"
              multiple
              onChange={handleUploadChange}
            />
          </div>
          <div className="images">
            {images.map((file, index) => {
              return (
                <div key={index} className="image">
                  <img
                    src={file.url ? file.url : URL.createObjectURL(file)}
                    alt=""
                    srcset=""
                  />
                  <span onClick={() => removeImage(index)} className="close">
                    X
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateProduct;

export async function getServerSideProps() {
  const response = await getCategories("category/getcategory");
  return {
    props: { data: response.data },
  };
}
