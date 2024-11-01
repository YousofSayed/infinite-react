import React, { useEffect, useState } from "react";
import { Select } from "./Select";
import { SmallButton } from "./SmallButton";
import { Icons } from "../../Icons/Icons";
import { Choices } from "./Choices";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";
import { useUpdateInputValue } from "../../../hooks/useUpdateInputValue";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../../helpers/atoms";

/**
 *
 * @param {{cssProp : string , keywords: string[]}} param0
 * @returns
 */
export const AddMultiValuestoSingleProp = ({ cssProp, keywords }) => {
  const [value, setValue] = useState("");
  const [values, setValues] = useState([]);
  const [updatedValue, setUpdateValue] = useState("");
  const selectedEl = useRecoilValue(currentElState);
  const setClass = useSetClassForCurrentEl();
  const addValue = () => {
    const newValues = Array.from(new Set([...values, value]));
    setValues(newValues);
    setClass({
      cssProp,
      value: Array.from(newValues).join(","),
    });
  };

  useUpdateInputValue({
    cssProp,
    setVal: setUpdateValue,
  });

  useEffect(() => {
    setValues(!updatedValue.split(",")[0]? [] : updatedValue.split(","));
  }, [updatedValue]);


  return (
    <section className=" flex flex-col gap-3 p-2 bg-gray-800 rounded-lg">
      <section className="flex justify-between gap-2">
        <Select
          className="p-[unset] px-[unset]"
          placeholder="Attachment"
          setVal={setValue}
          val={value}
          keywords={keywords}
          onInput={(value) => {
            setValue(value);
          }}
        />
        <SmallButton
          className="bg-gray-900"
          onClick={(ev) => {
            addValue();
          }}
        >
          {Icons.plus("white")}
        </SmallButton>
      </section>

      {values[0] ? (
        <Choices
          className="bg-gray-900"
          keywords={values}
          onCloseClick={(ev, keyword) => {
            const newValues = values.filter(value => value != keyword);
            setValues(newValues);
            setClass({
                cssProp,
                value: newValues.join(',')
            })
          }}
        />
      ) : null}
    </section>
  );
};