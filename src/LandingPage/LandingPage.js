import React from "react";
import { Link } from "react-router-dom";
import img from "../imgs/IMG.jpg";
export default function Landing_page() {
  const routes = [{ key: "Enter", route: "/postview" }];
  return (
    <>
      <div className="landing_main_container">
        <div className="landing_img_container">
          <img src={img} alt="img" />
        </div>
        <section className="landing_button_container">
          <p>10x Team 04</p>
          <button>
            <Link to={routes[0].route}>{routes[0].key}</Link>
          </button>
        </section>
      </div>
    </>
  );
}
