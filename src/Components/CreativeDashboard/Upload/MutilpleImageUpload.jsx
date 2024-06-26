import React, { useState } from "react";


    // var singleFileObj = [];
    // var singleFileArray = [];
    
    // const [singleFile, setSingleFile] = useState([]);
  
    // const [hiddenFile, setHiddenFile] = useState(false);
  
    // const uploadSingleFiles = (e) => {
    //     const file = e.target.files[0];
    //     singleFileObj.push(e.target.files);
    //     setImage_list(file);
    //     singleFileArray.push(URL.createObjectURL(singleFileObj[0][0]));
    //     setSingleFile([...singleFile, singleFileArray]);
    // };
  
  
    // const uploadFiles = (e) => {    
    //   e.preventDefault();
    //   console.log(singleFile);
    //   if(singleFile.length === 4) {
    //       setHiddenFile(true)
    //     }
      
    // };
  
    // const removeImage = (index) => {
    //   console.log("reomve");
    //   setSingleFile([
    //     ...singleFile.slice(0, index),
    //     ...singleFile.slice(index + 1, singleFile.length)
    //   ]);
    // };
  
const IterateUplaod = (
    {
        hiddenFile,
        uploadSingleFiles,
        uploadFiles,
        removeImage,
        singleFile
    }
) => {


  return (
    <>
      <form>
        <div className="container">
          <div className="form-group multi-preview">
            <div className="row">
              {singleFile.length !== 0 &&
                singleFile.map((url, index) => (
                  <div key={url} className="col-md-2">
                    <div className="img-block bg-gray">
                      <img className="img-fluid2" src={url} alt="..." />
                      <span
                        className="remove_img"
                        onClick={() => removeImage(index)}
                      >
                        X
                      </span>
                    </div>
                  </div>
                ))}

              {singleFile.length > 3 ? null : (
                <div className="col-md-2">
                  <div className="form-group">
                    <div className="upload-btn-wrapper">
                      <button className="image-btn"> + </button>
                      <input
                        type="file"
                        name="myfile"
                        multiple
                        onChange={uploadSingleFiles}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default IterateUplaod;
