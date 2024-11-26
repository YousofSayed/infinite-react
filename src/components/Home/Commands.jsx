import React, { useEffect, useState } from "react";
import { AsideControllers } from "./Protos/AsideControllers";
import { vjsCmds } from "../../constants/vjsCmds";
import { Select } from "./Protos/Select";
import { SmallButton } from "./Protos/SmallButton";
import { Icons } from "../Icons/Icons";
import { Adder } from "./Protos/Adder";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cmdsBuildState, currentElState } from "../../helpers/atoms";
import { ObjectInput } from "./Protos/Commands/ObjectInput";
import { MiniTitle } from "./Protos/MiniTitle";
import { Input } from "./Protos/Input";
import { ArrayInput } from "./Protos/Commands/ArrayInput";

import {
  cloneObject,
  insertProperty,
  pushBetween,
  transformToNumInput,
  uniqueID,
} from "../../helpers/cocktail";
import { buildScriptFromCmds } from "../../helpers/functions";
import { hsCmds } from "../../constants/hsCmds";
import { P } from "../Protos/P";
import { useEditorMaybe } from "@grapesjs/react";

export const Commands = () => {
  const editor = useEditorMaybe();
  const selectedEl = useRecoilValue(currentElState);
  const [command, setCommand] = useState("");
  const cmds = useRecoilValue(cmdsBuildState);
  const [cmdKeys, setCmdsKeys] = useState(Object.keys(hsCmds));
  const setCmds = useSetRecoilState(cmdsBuildState);

  useEffect(() => {
    if (!selectedEl || !selectedEl.currentEl) {setCmds([]); return};
    const attrCmds = selectedEl.currentEl.getAttribute("inf-cmds");

    setCmds(attrCmds ? JSON.parse(attrCmds) : []);
  }, [selectedEl]);

  useEffect(() => {
    if (!editor) return;
    editor.getSelected().addAttributes({ "inf-cmds": JSON.stringify(cmds) });
    console.log(cmds);
    console.log(buildScriptFromCmds(cmds));
  }, [cmds]);

  //For Text Input and Select Input
  const addValueForSelect = (value, i, x) => {
    const clone = structuredClone(cmds);
    console.log(i, x);
    console.log(clone[i].params[x]);

    clone[i].params[x].value = value;
    setCmds(clone);
  };

  //For ObjectInput
  const addKeyAndValueForObject = ({ i, x, propKey, propVal }) => {
    const clone = structuredClone(cmds);
    clone[i].params[x].value = {
      ...clone[cmdKey].params[x].value,
      [propKey]: propVal,
    };
    console.log(propKey, propVal, clone[cmdKey].params[x].value);

    setCmds(clone);
  };

  const removeKeyAndValueForObject = ({ i, x, propKey }) => {
    const clone = structuredClone(cmds);
    delete clone[i].params[x].value[propKey];
    setCmds(clone);
  };

  //For ArrayInput
  const addKeywordToArrayInput = (keyword = "", i, x) => {
    const clone = structuredClone(cmds);
    clone[i].params[x].value = [
      ...new Set([...(clone[i].params[x].value || []), keyword]),
    ];
    setCmds(clone);
  };

  const removeKeywordToArrayInput = (unwantedKeyword = "", i, x) => {
    const clone = structuredClone(cmds);
    clone[i].params[x].value = clone[i].params[x].value.filter(
      (keyword) => keyword != unwantedKeyword
    );

    setCmds(clone);
  };

  //For Adder
  const deleteCmd = (index) => {
    const clone = structuredClone(cmds).filter((cmd, i) => i != index);
    setCmds(clone);
  };

  return (
    <section className="flex flex-col gap-2">
      <AsideControllers />
      <section className="flex gap-2">
        <Select
          keywords={Object.keys(hsCmds)}
          value={command}
          placeholder="Type command"
          onInput={(val) => {
            setCommand(val);
          }}
          onEnterPress={(val) => {
            setCommand(val);
          }}
          onItemClicked={(val) => {
            setCommand(val);
          }}
        />

        <SmallButton
          className="flex-shrink-0 bg-gray-800"
          onClick={(ev) => {
            if (!command) return;
            const cloneObj = structuredClone(hsCmds[command]);
            cloneObj.name = command;
            cloneObj.id = uniqueID();
            setCmds((cmds) => [...cmds, cloneObj]);
            setCommand("");
            setCmdsKeys(Object.keys(hsCmds));
          }}
        >
          {Icons.plus("white")}
        </SmallButton>
      </section>

      {cmds.map((key, i) => {
        return (
          <Adder
            key={i}
            className="bg-gray-800"
            addClassName="bg-gray-900"
            delClassName="bg-gray-900"
            placeholder="Type command"
            showSelectMenu={true}
            value={command}
            keywords={cmdKeys}
            onInput={(value) => {
              setCommand(value);
            }}
            onAddClick={(ev) => {
              if (!command) return;
              const cloneObj = structuredClone(hsCmds[command]);
              cloneObj.name = command;
              cloneObj.id = uniqueID();
              const cloneBetween = pushBetween({
                arr: cmds,
                oldContet: cmds[i],
                content: cloneObj,
              });

              setCmds(cloneBetween);
              setCommand("");
              setCmdsKeys(Object.keys(hsCmds));
            }}
            onDeleteClick={(ev) => {
              deleteCmd(i);
            }}
          >
            <section className="flex flex-col gap-3">
              <MiniTitle>{cmds[i].name}</MiniTitle>

              {cmds[i].params.map((param, x) => {
                return (
                  <section
                    key={x}
                    className="w-full flex justify-between gap-2 "
                  >
                    <p
                      className={` ${
                        param.type == "array" || param.type == "object"
                          ? "self-baseline"
                          : ""
                      } select-none border-l-[3px]  text-nowrap text-[calc(3.5vh/2)] overflow-auto hideScrollBar max-w-[30%]  flex justify-center items-center flex-shrink-0 w-[30%]   rounded-lg bg-gray-900 border-blue-600 py-1  text-slate-200 font-bold `}
                    >
                      {param.name} :{" "}
                    </p>
                    {(param.type == "text" || param.type == "number") && (
                      <Input
                        className="bg-gray-900 w-full"
                        placeholder={param.name}
                        value={param.value || ""}
                        onInput={(ev) => {
                          param.type == "number" &&
                            transformToNumInput(ev.target);
                          addValueForSelect(ev.target.value, i, x);
                        }}
                      />
                    )}

                    {param.type == "select" && (
                      <Select
                        keywords={param.keywords ? param.keywords : []}
                        className="w-full  px-[unset] p-[unset]"
                        placeholder={param.name}
                        value={param.value || ""}
                        onInput={(value) => {
                          addValueForSelect(value, i, x);
                        }}
                        onEnterPress={(value) => {
                          addValueForSelect(value, i, x);
                        }}
                        onItemClicked={(value) => {
                          addValueForSelect(value, i, x);
                        }}
                      />
                    )}
                    {param.type == "object" && (
                      <ObjectInput
                        className="bg-gray-800"
                        obj={param.value || {}}
                        onAddClick={(ev, propKey, propVal) => {
                          addKeyAndValueForObject({
                            i,
                            propKey,
                            propVal,
                            x,
                          });
                        }}
                        onDelete={(ev, propKey, propVal) => {
                          removeKeyAndValueForObject({
                            i,
                            propKey,
                            propVal,
                            x,
                          });
                        }}
                      />
                    )}
                    {param.type == "array" && (
                      <ArrayInput
                        className="bg-gray-800"
                        array={param.value || []}
                        placeholder={param.name}
                        onAddClick={(ev, value) => {
                          addKeywordToArrayInput(value, i, x);
                        }}
                        onCloseClick={(ev, keyword, index) => {
                          removeKeywordToArrayInput(keyword, i, x);
                        }}
                      />
                    )}
                  </section>
                );
              })}
            </section>
          </Adder>
        );
      })}
    </section>
  );
};
