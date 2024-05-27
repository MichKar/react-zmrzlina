import React from "react";

function Range({  label, handleData, dataIn,id }) {
  const handleChange = (e) => {
    handleData(e.target.value, id);
  };

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        type="range"
        className="form-range w-100"
        onChange={handleChange}
        id={id}
        value={dataIn}
      />
    </>
  );
}

export default Range;
