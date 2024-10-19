import React, { useEffect, useState } from "react";
import { Select } from "./Select";
import { useEditorMaybe } from "@grapesjs/react";
import { SmallButton } from "./SmallButton";
import { Icons } from "../../Icons/Icons";
import { Choices } from "./Choices";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentElState, selectorState } from "../../../helpers/atoms";

export const SelectClass = () => {
  const editor = useEditorMaybe();
  const setSelector = useSetRecoilState(selectorState);
  const selectedEl = useRecoilValue(currentElState);
  const selector = useRecoilValue(selectorState);
  const [val, setVal] = useState("");
  const [classesKeywrods, setClassesKeywords] = useState(
    editor.getSelected().getClasses()
  );
  const [selectedClassName, setSelectedClassName] = useState({className:"bg-gray-900", index:null});

  useEffect(() => {
    setClassesKeywords(editor.getSelected().getClasses());
    setSelector("");
  }, [selectedEl]);

  const addClass = (classNameKeyword) => {
    const newArr = [...classesKeywrods, classNameKeyword];
    setClassesKeywords(Array.from(new Set(newArr)));
    editor.getSelected().addClass(newArr);
  };

  return (
    <section className="mt-3 flex flex-col gap-3">
      <section className="flex gap-3">
        <Select
          val={val}
          setVal={setVal}
          placeholder="Calss name"
          keywords={editor.getCss().match(/\.\w+/gi) || ["No classes found..!"]}
          onMenuOpen={({ menu, setKeywords, keywords }) => {
            setKeywords(
              editor.getCss().match(/\.\w+/gi) || ["No classes found..!"]
            );
          }}
        />

        <SmallButton
          onClick={(ev) => {
            addClass(val);
          }}
        >
          {Icons.plus("#fff")}
        </SmallButton>
      </section>

      <section>
        <Choices
          keywords={classesKeywrods}
          className="flex-wrap flex-center"
          onItemClick={({ ev, keyword, index }) => {
            setSelectedClassName({
              className:'bg-blue-600',
              index
            })
            setSelector((selector) =>
              selector == `.${keyword}` ? "" : `.${keyword}`
            );
          }}
          itemClassName={selectedClassName}
        />
      </section>
    </section>
  );
};
