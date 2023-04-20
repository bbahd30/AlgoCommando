import React from "react";

export const Image = ({ title, largeImage, smallImage }) => {
  return (
    <div className="portfolio-item">
      <div className="hover-bg" style={{ height: "300px" }}>
        {" "}
        {/* <a href={largeImage} title={title} data-lightbox-gallery="gallery1"> */}
        <div className="hover-text">
          <h4>{title}</h4>
        </div>
        <center>
          <img src={smallImage} className="img-responsive" alt={title} />
        </center>
        {/* </a>{" "} */}
      </div>
    </div>
  );
};
