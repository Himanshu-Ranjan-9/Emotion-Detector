import React, { useState } from "react";
import Image1 from "../assets/img/image_1.png";
import Image2 from "../assets/img/image_2.png";
import Image3 from "../assets/img/image_3.png";

function Slider() {
  const [slide, setSlide] = useState(1);
  const ChangeSlide = (id) => {
    setSlide(id);
  };

  return (
    <div className="inner-right-box">
      <div>
        {slide === 1 && <img src={Image1} alt="" className="image" />}
        {slide === 2 && <img src={Image2} alt="" className="image" />}
        {slide === 3 && <img src={Image3} alt="" className="image" />}
      </div>
      <div>
        <div className="text-wrap">
          {slide===1 &&<h1 className="text">Spot Faces , Age, Gender & Emotions</h1>}
          {slide===2 &&<h1 className="text">Discover Object - Identify Whats Around</h1>}
          {slide===3 &&<h1 className="text">Find Celebrities - Spot the Stars</h1>}
        </div>
        <div className="bullets">
          <span className={slide===1 && "active"} onClick={() => ChangeSlide(1)}></span>
          <span className={slide===2 && "active"}onClick={() => ChangeSlide(2)}></span>
          <span className={slide===3 && "active"}onClick={() => ChangeSlide(3)}></span>
        </div>
      </div>
    </div>
  );
}
export default Slider;