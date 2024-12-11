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
  const [classesKeywrods, setClassesKeywords] = useState([]);
  const [selectedClassName, setSelectedClassName] = useState({
    className: "bg-gray-900",
    index: null,
  });

  useEffect(() => {
    if (!selectedEl || !selectedEl.currentEl) {
      setClassesKeywords(getELClasses());
      setSelector("");
      return;
    }
    setClassesKeywords(getELClasses());
    setSelector("");
  }, [selectedEl]);

  useEffect(() => {
    if (!editor) return;
    setClassesKeywords(getELClasses());
  }, [editor]);

  const addClass = (classNameKeyword) => {
    const newArr = [...classesKeywrods, classNameKeyword];
    setClassesKeywords(Array.from(new Set(newArr)));
    editor.getSelected().addClass(newArr);
    setVal(new String(""));
  };

  const removeClass = (classNameKeyword = "") => {
    editor.getSelected().removeClass(classNameKeyword);
    setClassesKeywords(getELClasses());
  };

  const getELClasses = () => {
    return (
      editor
        .getSelected()
        ?.getClasses()
        ?.filter((calss) => !calss.startsWith("gjs")) || []
    );
  };

  return (
    <section className="mt-3 flex flex-col gap-3">
      <section className="flex gap-3">
        <Select
          value={val}
          onInput={(value) => {
            setVal(value);
          }}
          onEnterPress={(value) => {
            setVal(value);
          }}
          onItemClicked={(value) => {
            setVal(value);
          }}
          placeholder="Calss name"
          keywords={classesKeywrods}
          onMenuOpen={({ menu, setKeywords, keywords }) => {
            setKeywords(
              editor.getCss().match(/\.\w+/gi) || ["No classes found..!"]
            );
          }}
        />

        <SmallButton
          className="flex-shrink-0 bg-gray-800"
          onClick={(ev) => {
            addClass(val);
          }}
        >
          {Icons.plus("#fff")}
        </SmallButton>
      </section>

      {classesKeywrods[0] ? (
        <section>
          <Choices
            keywords={classesKeywrods}
            className="flex-wrap flex-center bg-gray-800"
            onCloseClick={(ev, keyword) => {
              removeClass(keyword);
            }}
            onActive={({ keyword, index }) => {
              setSelector(`.${keyword}`);
            }}
            onUnActive={({ keyword, index }) => {
              setSelector("");
            }}
            // onItemClick={({ ev, keyword, index }) => {
            //   setSelectedClassName(`${ selector == `.${keyword}` && `);
            // setSelector((selector) =>
            //   selector == `.${keyword}` ? "" : `.${keyword}`
            // );
            // }}
            enableSelecting={true}
          />
        </section>
      ) : null}
    </section>
  );
};
