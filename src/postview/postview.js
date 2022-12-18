import React from "react";
import axios from "axios";
import loader from "../imgs/128x128.gif";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Postview() {
   const [loaderflag, setLoaderflag] = useState(false);
  const [Data, setData] = useState();
  const routes = [{ key: "Camera", route: "/form" }];
  useEffect(() => {
    setLoaderflag(true);
    axios
      .get("https://instaclone-apii.onrender.com/user/api/v1/posts")
      .then((res) => {
       setLoaderflag(false);
        // console.log(res);
        if (res.data.Result !== undefined) {
          setData(res.data.Result.reverse());
        }
      })
      .catch((e) => {
      setLoaderflag(false);
        return e;
      });
  }, []);

  // console.log(Data);

  return (
    <>
      <div className="Background_postView">
        <nav className="navbar bg-light">
          <div className="container-fluid">
            <i className="fa-brands fa-instagram"></i>
            <p className="navbar-brand">Instaclone</p>
            <Link to={routes[0].route}>
              <i className="fa-solid fa-camera"></i>
            </Link>
          </div>
        </nav>
        <div className="maincontainer">
          {Data
            ? Data.map((elem, indx) => {
                return (
                  <div key={indx} className="card">
                    <div className="heading_container">
                      <span className="city_and_user_name_container">
                        <p className="user_name">{elem.Author}</p>
                        <p className="location">{elem.Location}</p>
                      </span>
                      <span className="dots_container">
                        <p>...</p>
                      </span>
                    </div>
                    <div className="image_container">
                      <img
                        src={`${elem.imageUrl ? elem.imageUrl : ""}`}
                        alt="img1"
                      />
                      <div className="icon_container">
                        <i className="fa-regular fa-heart"></i>
                        <i className="fa-solid fa-rocket"></i>
                      </div>
                    </div>
                    <div className="date_Container">
                      <p>{elem.date}</p>
                    </div>
                    <div className="likes_Counter">
                      <p>{elem.likes} likes</p>
                    </div>
                    <div className="description_container">
                      <p>{elem.Description}</p>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <div className="loader">
        {loaderflag ? <img src={loader} alt="" /> : ""}
      </div>
    </>
  );
}
