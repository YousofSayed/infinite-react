import { useEditorMaybe } from "@grapesjs/react";
import React, { useEffect, useRef, useState } from "react";
import { statesKeys } from "../../../constants/constants";
import { Select } from "./Select";
import { refType, stateType } from "../../../helpers/jsDocs";
import { Icons } from "../../Icons/Icons";
import { Choices } from "./Choices";
import { addClickClass, cloneObject } from "../../../helpers/cocktail";
import { SmallButton } from "./SmallButton";
import { ChoicesForStates } from "./ChoicesForStates";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentElState,
  ruleState,
  selectorState,
} from "../../../helpers/atoms";
import { extractRulesById } from "../../../helpers/functions";

// console.log({0:[],1:[]});

export const SelectState = ({ placeholder }) => {
  const editor = useEditorMaybe();
  const setRule = useSetRecoilState(ruleState);
  const rule = useRecoilValue(ruleState);
  const selector = useRecoilValue(selectorState);
  const selectedEl = useRecoilValue(currentElState);
  const [states, setStates] = useState(stateType);
  const [state, setState] = useState("");
  const [currentStateIndex, setCurrentStateIndex] = useState(
    getLastIndex(states)
  );
  const chicesRefEl = useRef(refType);

  useEffect(() => {
    if (!selectedEl.currentEl || selectedEl.currentEl.tagName == "body") return;
    console.log(selectedEl.currentEl);
    extractRules();
  }, [selectedEl, selector]);

  function extractRules() {
    const rules = { 0: [] };
    const rgx = /\:(\:)?\w+/gi;
    const currentSelector = selector ? selector : `#${selectedEl.currentEl.id}`;
    const selectorRules = extractRulesById(editor.getCss(), currentSelector);
    const myRrules = selectorRules.filter((rule) => {
      return rule
        .split(/\{.+\}/gi)
        .join("")
        .match(rgx);
    });

    myRrules.forEach((rule, i) => {
      const ruleArr = rule
        .split(/\{.+\}/gi)
        .join("")
        .match(rgx);
      rules[i] = ruleArr || [];
    });

    setStates({ ...rules });
  }

  function getLastIndex(obj = {}) {
    return Object.keys(obj).length - 1;
  }

  function addNewStateContainer() {
    const lsi = getLastIndex(states);
    setStates({ ...states, [lsi + 1]: [] });
    setCurrentStateIndex(lsi + 1);
  }

  function addState(state = "") {
    const newArr = structuredClone(states[currentStateIndex]);
    const newObj = {
      ...states,
      [currentStateIndex]: [...new Set([...newArr.concat(state)])],
    };
    // editor.getSelected().getstates().set()
    setStates({ ...newObj });
    console.log(newObj[currentStateIndex].join(""));

    setRule({
      is: true,
      ruleString: `${newObj[currentStateIndex].join("")}`,
    });
    setState(new String(''));
  }

  function removeState(keyword, keywordsIndex) {
    const currentSelector = selector ? selector : `#${selectedEl.currentEl.id}`;
    const ruleString = `${currentSelector}${states[keywordsIndex].join("")}`;

    const rule = editor.Css.getRule(ruleString);
    console.log("rule : ", rule);
    const oldRuleStyle = rule.toJSON().style;

    console.log(rule, "s rule", rule.toJSON().style);

    editor.Css.remove(rule);

    const newArr = states[keywordsIndex].filter(
      (keywordArr) => keywordArr != keyword
    );
    setStates({ ...states, [keywordsIndex]: newArr });
    states[keywordsIndex].length > 1 &&
      editor.Css.setRule(`${currentSelector}${newArr.join("")}`, oldRuleStyle);
    setRule({
      is: true,
      ruleString: `${newArr.join("")}`,
    });
  }

  function removeStateContainer(index) {
    const rule = `#${editor.getSelected().getEl().id}${states[index].join("")}`;

    editor.Css.remove(editor.Css.getRule(rule));
    setRule({
      is: false,
      ruleString: "",
    });
    console.log(rule, " my rule", editor.getCss());

    const newObj = cloneObject(states);
    delete newObj[index];
    setStates(newObj);
    currentStateIndex == getLastIndex(states)
      ? setCurrentStateIndex(getLastIndex(newObj))
      : null;
    return newObj;
  }

  function selectContainer(keywordsIndex) {
    setCurrentStateIndex(keywordsIndex);

    setRule((old) => ({
      is: currentStateIndex == keywordsIndex ? !old.is : true,
      ruleString:
        currentStateIndex == keywordsIndex && old.ruleString
          ? ""
          : `${states[keywordsIndex].join("")}`,
    }));
  }

  return (
    <section className="py-3 flex flex-col gap-4">
      <section className="flex gap-[10px] ">
        <Select
          placeholder="state"
          respectParenthesis={true}
          keywords={statesKeys}
          singleValInInput={false}
          value={state}
          // setVal={setVal}
          onInput={(value) => {
            setState(value);
          }}
          onEnterPress={(keyword) => {
            // setState(keyword);
            addState(keyword);
          }}
          onItemClicked={(keyword, i) => {
            // console.log(keyword, " clicked");

            // setState(keyword);
            addState(keyword)
          }}
        />

        <SmallButton
          className="flex-shrink-0 bg-gray-800"
          onClick={(ev) => {
            addState(state);
          }}
          clas
        >
          {Icons.plus("#fff")}
        </SmallButton>

        <SmallButton
          className=" flex-shrink-0 bg-gray-800"
          onClick={(ev) => {
            addNewStateContainer();
          }}
        >
          {Icons.newLine("#fff")}
        </SmallButton>
      </section>

      {/* {getLastIndex(states) >= 0  && states[getLastIndex(states)][0] ? ( */}
      <section ref={chicesRefEl} className="flex flex-col gap-3">
        {Object.keys(states).map((key, i) => {
          return (
            <ChoicesForStates
              key={i}
              keywordsIndex={i}
              currentStateIndex={currentStateIndex}
              keywords={states[key]}
              onDelete={(ev, index) => {
                removeStateContainer(index);
              }}
              onSelect={(ev, keywordsIndex) => {
                selectContainer(keywordsIndex);
              }}
              onCloseClick={(ev, keyword, index, keywordsIndex) => {
                setCurrentStateIndex(keywordsIndex);
                removeState(keyword, keywordsIndex);
              }}
            />
          );
        })}
      </section>
      {/* ) : null} */}
    </section>
  );
};
