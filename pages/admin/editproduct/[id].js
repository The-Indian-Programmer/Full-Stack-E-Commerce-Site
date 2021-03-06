import { useRouter } from "next/router";
import Head from "next/dist/shared/lib/head";
import React, { useState } from "react";
import {
  getProductById,
  putProductData,
} from "../../../src/routes/productData";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../../store/index";
import { imageUpload } from "../../api/upload/imageUpload";
import ButtonLoader from "../../../component/ButtonLoader/ButtonLoader";
const EditProduct = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [images, setImages] = useState(data.images);
  const [inputData, setInputData] = useState(data);
  const [btnLoading, setbtnLoading] = useState(false);
  const categoryData = useSelector((state) => state.category);
  const dispatch = useDispatch();
  // handle Input Change

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const removeImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  const handleUploadChange = (e) => {
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch(
        showNotification({
          show: true,
          data: { message: "Files does not exist.", type: "error" },
        })
      );

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err)
      dispatch(
        showNotification({ show: true, data: { message: err, type: "error" } })
      );

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch(
        showNotification({
          show: true,
          data: { message: "Select UpTo 5 Images", type: "error" },
        })
      );
    setImages([...images, ...newImages]);
  };

  /// handle form submit
  const handleFormSubmit = async (e) => {
    // console.log(inputData);
    // console.log(images);
    if (
      !inputData.title ||
      !inputData.price ||
      !inputData.inStock ||
      !inputData.description ||
      !inputData.content ||
      inputData.category === "" ||
      images.length === 0
    )
      return dispatch(
        showNotification({
          show: true,
          data: { message: "All fields are required.", type: "error" },
        })
      );

    setbtnLoading(true);
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    const res = await putProductData(`product/updateproduct`, {
      ...inputData,
      images: [...imgOldURL, ...media],
    });
    if (res.err) {
      setbtnLoading(false);
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
    setbtnLoading(false);
    router.push("/admin/products");
  };
  return (
    <div className="edit_product_page">
      <Head>
        <title>Edit Product</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
      </Head>
      <main className="container">
        <form className="product_form">
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
              value={inputData.inStock}
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
            <select
              name="category"
              id="category"
              value={inputData.category}
              onChange={handleChange}
            >
              {categoryData.map((item) => {
                return (
                  <option key={item._id} value={item.name}>
                    Category : {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="isprime">
            <select
              name="isprime"
              value={inputData.checked}
              onChange={handleChange}
              id="isprime"
            >
              <option value={true}>It is prime</option>
              <option value={false}>It is not prime</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleFormSubmit}
            className="btn_create_product"
          >
            {btnLoading ? <ButtonLoader /> : "Update Product"}
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
            {images.map((img, index) => {
              return (
                <div key={index} className={`image`}>
                  <img
                    src={img.url ? img.url : URL.createObjectURL(img)}
                    alt=""
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
    </div>
  );
};

export default EditProduct;

export async function getServerSideProps(context) {
  const response = await getProductById(
    "product/getproductbyid",
    context.query.id
  );
  console.log(response);
  return {
    props: {
      data: response.product,
    },
  };
}
