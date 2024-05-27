import React from "react";

function NumImp({ maxNr, minNr, dataIn, label, handleData, id }) {
  const handleChange = (e) => {
    handleData(e.target.value, id);
  };

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        type="number"
        className="form-control"
        value={dataIn}
        id={id}
        min={minNr}
        max={maxNr}
        onChange={handleChange}
      />
    </>
  );
}

export default NumImp;
