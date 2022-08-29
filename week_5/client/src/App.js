import { useState } from "react";
import "./App.css";

function App() {
  const [fileData, setFileData] = useState();
  const [submitText, setSubmitText] = useState();
  const [image, setImage] = useState();

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Handle file data from state before submission
    const data = new FormData();
    data.append("image", fileData);

    fetch("/single", {
      method: "POST",
      body: data,
    })
      .then((result) => {
        console.log(result)
        console.log("File Sent");
        setSubmitText("File Sent");
      })
      .catch((err) => {
        console.log(err.message);
        setSubmitText(err.message);
      });
  };

  const getRandomImage = (e) => {
    // Fetch request to express api to get image
    fetch("/single")
      .then((result) => {
        // Error handling
        if(result.status != 200){
          setSubmitText("Could not get random image");
          return Promise.reject("Exit promise");
        }
        return result.blob();
      })
      .then((image) => {
        console.log(image);
        setSubmitText("Random file received");
        setImage(image);
      })
      .catch((err) => {
        console.log(err.message);
        setSubmitText("Could not get random image");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmitHandler}>
          <input type="file" onChange={fileChangeHandler} />
          <br />
          <button type="button" onClick={getRandomImage}>
            Get random image from backend
          </button>
          <br />
          <br />
          <button type="submit">Submit file to Backend</button>
          <br />
          <br />
          <p>{submitText}</p>
          {image != null && (
            <img
              alt=""
              src={URL.createObjectURL(image)}
              width="1000"
              height="auto"
            />
          )}
        </form>
      </header>
    </div>
  );
}

export default App;
