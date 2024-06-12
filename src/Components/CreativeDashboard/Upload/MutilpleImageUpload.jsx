import React, { useState } from "react";

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
