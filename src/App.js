import React, { useState } from "react";
function App() {
  // /** start states */
  const [name, setName] = useState();
  const [file, setFile] = useState();
  // const [desc, setDesc] = useState();

  const send = async (event) => {
    event.preventDefault();
    console.log(name);

    const formData = new FormData();
    // file is the name of the request parameter
    // file is the state variable  that holds 
    // event.target.file[0] from <input type= "file" .../> on line 67
    formData.append('file', file);
        const options = {
          method: 'POST',
          body: formData,
        };
        
        let response = await fetch('/images/save', options);
        console.log('this is the response', response)


    // need to send the photo to the db
    // let response = await fetch("/images/save", {
    //   method: "post",
    //   // headers: { "Content-Type": "image/png" },
    //   body: Buffer,
    // });
    // console.log("this is buffer", Buffer)

    // let data = await response.json();
    // // Should be reaponse.blob() or response.arrayBuffer()?
    // let message = JSON.stringify(data);

    // if (response.status === 200) {
    //   //let data = await response.json()
    //   return message;
    // } else {
    //   //throw new Error(error)
    //   throw new Error(message);
    // }
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <form action="/images/save" method="POST" encType="multipart/form-data">
        <div>
          <label htmlFor="name">Image Title</label>
          <input
            type="text"
            id="name"
            onChange={(event) => {
              const { value } = event.target;
              setName(value);
              // changeName(event.target.value)
            }}
            placeholder="Name"
            value={name}
            name="name"
            required
          />
        </div>

        {/* <div>
          <label htmlFor="desc">Image Description</label>
          <textarea
            id="desc"
            name="desc"
            value={desc}
            rows="2"
            placeholder="Description"
            required 
          ></textarea>
        </div> */}
        <div>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={(event) => {
              const image = event.target.files[0];
              setFile(image);
            }}
            name="image"
            required
          />

          <div>{file ? <p></p> : <i></i>}</div>
        </div>
        <div>
          <button
            onClick={send}
            type="submit"
            className="btn btn-primary w-100"
          >
            Submit
          </button>
        </div>
      </form>
      <br></br>
    </div>
  );
}

export default App;
