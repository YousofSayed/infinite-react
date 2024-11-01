import React, { useState } from "react";
import { Select } from "./Select";
import { LinearGradient } from "./LinearGradient";

export const Gradient = () => {
  const [type, setType] = useState("");
  return (
    <section className="flex flex-col gap-2 bg-gray-800 p-2 rounded-lg">
      <Select
        className="p-[unset] px-[unset]"
        placeholder="chose type"
        keywords={["linear", "radial"]}
        setVal={setType}
        val={type}
        // onInput={(value)=>{setType(value)}}
      />

      {
        type == "linear" ?
        <LinearGradient/>
        :
        null
      }
    </section>
  );
};
