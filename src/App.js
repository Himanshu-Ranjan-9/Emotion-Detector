import "./assets/styles/style.css";
import logo from "./assets/img/react-ai.png";
import FileDropZone from "./component/DropZone";
import { useState } from "react";
import Slider from "./component/Slider";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
 const apiUrl = "https://python-api.techsimplus.com/api/amazon-service/";

const App = () => {
  const [files, setfiles] = useState({
    image: null,
    service_type: "ObjectDetection",
  });
  const [resultImage, setResultImage] = useState(null);
  const [loader,setLoader] = useState(false)

  const onFileChange = (file) => {
    setfiles({ ...files, image: file });
  };

  const onServiceTypeChange = (type) => {
    setfiles({ ...files, service_type: type });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        let out = reader.result.split(",")[1];
        resolve(out);
      };

      reader.readAsDataURL(file);
    });
  };
  const onSubmitClick = async () => {
    if(!files.image){
      alert("Image is not selected")
      return;
    }
    setLoader(true)
    let imageBase64 = await fileToBase64(files.image);
    let newfiles = { ...files, image: imageBase64 };
    let responce = await axios.post(apiUrl, newfiles);
    console.log(responce);
    setLoader(false)
    setResultImage(responce.data.data.image);
  };
  return (
    <div className="container">
      {resultImage && (
        <Modal
          onClose={() => setResultImage(null)}
          open={true}
          center
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
          }}
        >
          <div className="result-image-container">
            <img src={resultImage} alt="pic" />
          </div>
        </Modal>
      )}
      {loader && (<div className="loading-overlay">
        <div className="loader"/>
      </div>)
      }
      <div className="box">
        <div className="left-box">
          <div className="inner-left-box">
            <div className="logo">
              <img src={logo} alt="logo" />
              <h4>AI-React</h4>
            </div>
            <div className="heading">
              <h2>face-detector through Ai</h2>
              <h6>play with Ai</h6>
            </div>
            {files.image && (
              <span style={{ color: "darkblue" }}>
                File: {files.image.name}
              </span>
            )}
            <FileDropZone onFileChange={onFileChange} />
            <div className="service-container">
              <div className="service-item">
                <input
                  onChange={() => onServiceTypeChange("ObjectDetection")}
                  checked={files.service_type === "ObjectDetection"}
                  type="radio"
                  name="service"
                />
                <label>Object Detection</label>
              </div>
              <div className="service-item">
                <input
                  onChange={() => onServiceTypeChange("FaceDetection")}
                  checked={files.service_type === "FaceDetection"}
                  type="radio"
                  name="service"
                />
                <label>Face Detection</label>
              </div>
              <div className="service-item">
                <input
                  onChange={() => onServiceTypeChange("CelebrityDetection")}
                  checked={files.service_type === "CelebrityDetection"}
                  type="radio"
                  name="service"
                />
                <label>Celebrity Detection</label>
              </div>
            </div>

            <button onClick={onSubmitClick} className="sign-btn">
              See Reasult
            </button>
          </div>
        </div>
        <div className="right-box">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default App;
