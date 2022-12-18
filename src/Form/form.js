import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import axios from "axios";
export default function Form() {
  let reset;
  let url = "https://instaclone-apii.onrender.com/user/api/v1/posts";
  const [data, setData] = useState({
    Author: "",
    Location: "",
    Description: "",
    image: "",
  });
  const routes = [
    { key: "Camera", route: "/form" },
    { key: "Enter", route: "/postview" },
  ];

  async function Submit(e) {
    e.preventDefault();

    let formData = new FormData();
    if (data.image && data.Author) {
      formData.append("image", data.image);
      formData.append("Author", data.Author);
      formData.append("Description", data.Description);
      formData.append("Location", data.Location);
    } else {
      return toast.error("Image or Author Field is Empty!!");
    }
    try {
      if (formData) {
        const response = await axios.post(url, formData);
        if (response.status === 200) {
          toast.success("Posted Successfully");
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
    // console.log(formData);

    setData({
      Author: "",
      Location: "",
      Description: "",
      image: "",
    });
  }
  return (
    <>
      <div className="Background_form">
        <nav className="navbar bg-light">
          <div className="container-fluid">
            <Link to={routes[1].route}>
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <p className="navbar-brand">Instaclone</p>
            <Link to={routes[0].route}>
              <i className="fa-solid fa-camera"></i>
            </Link>
          </div>
        </nav>
        <ToastContainer
          autoClose={2000}
          position="top-center"
          className="toast-container"
          toastClassName="dark-toast"
        />
        <form
          className="form_container"
          onSubmit={Submit}
          encType="multipart/form-data"
        >
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              value={reset}
              name="photo"
              onChange={(e) => {
                setData({ ...data, image: e.target.files[0] });
              }}
            />
          </div>
          <div className="Author_location">
            <input
              className="Auth-loct-input"
              id="Author"
              type="text"
              name="Author"
              placeholder="Author"
              value={data.Author}
              onChange={(e) => {
                setData({ ...data, Author: e.target.value });
              }}
            />
            <input
              className="Auth-loct-input"
              id="location"
              type="text"
              placeholder="Location"
              name="Location"
              value={data.Location}
              onChange={(e) => {
                setData({ ...data, Location: e.target.value });
              }}
            />
            <textarea
              className="textarea"
              placeholder="Description"
              name="Description"
              value={data.Description}
              onChange={(e) => {
                setData({ ...data, Description: e.target.value });
              }}
            ></textarea>
          </div>

          <button type="submit" className="button" id="postbtn">
            Post
          </button>
        </form>
      </div>
    </>
  );
}
