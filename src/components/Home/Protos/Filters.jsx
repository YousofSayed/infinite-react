import React, { useEffect, useState } from "react";
import { Select } from "./Select";
import { SmallButton } from "./SmallButton";
import { Icons } from "../../Icons/Icons";
import { Input } from "./Input";
import { filterTypes, filterUnits } from "../../../constants/constants";
import { Adder } from "./Adder";
import { useSetClassForCurrentEl } from "../../../hooks/useSetclassForCurrentEl";
import { useUpdateInputValue } from "../../../hooks/useUpdateInputValue";
import { pushBetween } from "../../../helpers/cocktail";
import { useRemoveCssProp } from "../../../hooks/useRemoveCssProp";

export const Filters = () => {
  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState("");
  const [updatedVal, setUpdatedValue] = useState("");
  const setClass = useSetClassForCurrentEl();
  const removeProp = useRemoveCssProp();

  const stringifyFilter = (filtersVals = []) => {
    const value = filtersVals
      .map(({ name, value }) => `${name}(${value}${filterUnits[name]})`)
      .join(" ");

    return value;
  };

  const parseFilters = (stringValue = "") => {
    const value = stringValue
      .match(/\w+\(\w+(\W+)?\)|/ig)
      .filter((text) => text)
      .map((prop) => {
        const vals = prop.split(/\(|\)/gi);
        return {
          name: vals[0],
          value: vals[1].split(filterUnits[vals[0]]).join(""),
        };
      });
    return value;
  };


  
  const setPropVal = (propValue, index) => {
    const newArr = [...filters];
    newArr[index].value = propValue;
    console.log(newArr );
    
    setClass({
      cssProp:'filter',
      value:stringifyFilter(newArr)
    })
    setFilters(newArr);
  };

  const addProp = (filterProp) => {
    if (!filter)return;
    setFilters([...filters, { name: filterProp, value: "" }]);
  };

  const addPropBetween = (filterProp, index) => {
    const newArr = pushBetween({
      arr: filters,
      oldContet: filters[index],
      content: { name: filterProp, value: "" },
    })
    setFilters(newArr);
  };

  const deleteProp = (index) => {
    const newArr = filters.filter((prop, i) => i != index);
    !newArr.length && removeProp({cssProp:'filter'});
    setFilters(newArr);
  };

  useEffect(() => {
    console.log(stringifyFilter());
    
    
  }, [filters]);

  useUpdateInputValue({
    cssProp: "filter",
    setVal: setUpdatedValue,
    onEffect(prop, value) {
      setFilters(parseFilters(value));
    },
  });

  return (
    <section className="mt-3 flex flex-col gap-2">
      <section className="flex gap-2">
        <Select
          placeholder="Select Filter"
          keywords={filterTypes}
          val={filter}
          setVal={setFilter}
        />
        <SmallButton
          title="Add Filter"
          onClick={(ev) => {
            addProp(filter);
          }}
        >
          {Icons.plus("white")}
        </SmallButton>
      </section>

      <main className=" rounded-lg flex flex-col gap-2  ">
        {filters.map((filterProp, i) => {
          return (
            <Adder
              key={i}
              className=" bg-gray-800 p-2"
              addClassName="bg-gray-900"
              delClassName="bg-gray-900"
              placeholder="New Prop"
              showSelectMenu={true}
              keywords={filterTypes}
              value={filter}
              setVal={setFilter}
              onInput={(ev) => {
                console.log('inputttt22222222');
                
                setFilter(ev.target.value);
              }}
              onAddClick={(ev) => {
                addPropBetween(filter, i);
              }}
              onDeleteClick={(ev) => {
                deleteProp(i);
              }}
            >
              <section key={i} className="flex flex-col   gap-2">
                <p className="font-semibold capitalize text-white flex-grow flex-shrink-0">
                  {filterProp.name} :
                </p>
                <section className="flex gap-2 h-[40px] ">
                  <Input
                    className="bg-gray-900 w-[90%]"
                    placeholder={filterProp.name}
                    value={filterProp.value}
                    onInput={(ev) => {
                      console.log('inputttttttttttttttttttttt');
                      
                      setPropVal(ev.target.value, i);
                    }}
                  />
                  <p className="w-[40px] font-bold flex flex-shrink-0  items-center justify-center text-slate-200 bg-gray-900 h-[100%] rounded-lg">
                    {filterUnits[filterProp.name]}
                  </p>
                </section>
              </section>
            </Adder>
          );
        })}
      </main>
    </section>
  );
};
