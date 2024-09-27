import React, { useState } from "react";

export const SelectMulti = ({ placeholder }) => {
  const [choices, setChoices] = useState([]);
  
  return (
    <section className="">
      <input type="text" placeholder={placeholder} />
      <section id="choices"></section>
    </section>
  );
};
