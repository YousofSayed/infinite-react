import React from "react";
import { Choices } from "./Choices";
import { SmallButton } from "./SmallButton";
import { Icons } from "../../Icons/Icons";
import { useRecoilValue } from "recoil";
import { ruleState } from "../../../helpers/atoms";

/**
 *
 * @param {{keywords : string[] , keywordsIndex : number , currentStateIndex:number , onCloseClick : (ev : MouseEvent , keyword : string , index:number , keywordsIndex:number) => void , onDelete:(ev:MouseEvent , index:number)=>void , onSelect:(ev:MouseEvent , keywordsIndex:number)=>void}} param0
 * @returns
 */
export const ChoicesForStates = ({
  keywords,
  keywordsIndex,
  currentStateIndex,
  onCloseClick = (_, _1) => {},
  onDelete = (ev, index) => {},
  onSelect = (ev, index) => {},
}) => {
  const rule = useRecoilValue(ruleState);

  return (
    <section
      className={`flex gap-2 transition-all rounded-lg ${
        currentStateIndex == keywordsIndex &&
        rule.is &&
        "p-2 border-2 border-blue-600 "
      }`}
    >
      <Choices
        keywords={keywords}
        onCloseClick={(ev, keyword, index) => {
          onCloseClick(ev, keyword, index, keywordsIndex);
        }}
      />

      <SmallButton
        className="flex-shrink-0 bg-gray-900"
        onClick={(ev) => {
          onSelect(ev, keywordsIndex);
        }}
      >
        {Icons.select("#fff")}
      </SmallButton>

      <SmallButton
        className={`${
          keywordsIndex == 0 && "pointer-events-none cursor-not-allowed"
        } flex-shrink-0 bg-gray-900`}
        onClick={(ev) => {
          onDelete(ev, keywordsIndex);
        }}
      >
        {Icons.trash("#fff")}
      </SmallButton>
    </section>
  );
};
