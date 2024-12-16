import React, { useEffect, useRef, useState } from "react";
import { AsideControllers } from "./Protos/AsideControllers";
import { vjsCmds } from "../../constants/vjsCmds";
import { Select } from "./Protos/Select";
import { SmallButton } from "./Protos/SmallButton";
import { Icons } from "../Icons/Icons";
import { Adder } from "./Protos/Adder";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cmdsBuildState, currentElState, varsState } from "../../helpers/atoms";
import { ObjectInput } from "./Protos/Commands/ObjectInput";
import { MiniTitle } from "./Protos/MiniTitle";
import { Input } from "./Protos/Input";
import { ArrayInput } from "./Protos/Commands/ArrayInput";

import {
  addClickClass,
  cloneObject,
  copyToClipboard,
  getDifferences,
  insertProperty,
  pushBetween,
  transformToNumInput,
  uniqueID,
} from "../../helpers/cocktail";
import {
  buildScriptFromCmds,
  evalObject,
  objectToString,
  parseCmds,
  transformObjectToScope,
} from "../../helpers/functions";
import { hsCmds } from "../../constants/hsCmds";
import { P } from "../Protos/P";
import { useEditorMaybe } from "@grapesjs/react";
import { cmdType, refType } from "../../helpers/jsDocs";
import { OptionsButton } from "../Protos/OptionsButton";
import { hsZoo } from "../../constants/constants";

export const Commands = () => {
  const editor = useEditorMaybe();
  const selectedEl = useRecoilValue(currentElState);
  const [command, setCommand] = useState("");
  const cmds = useRecoilValue(cmdsBuildState);
  const [cmdKeys, setCmdsKeys] = useState(Object.keys(hsCmds));
  const vars = useRecoilValue(varsState);
  const setVars = useSetRecoilState(varsState);
  const setCmds = useSetRecoilState(cmdsBuildState);
  const adderRef = useRef(refType);
  const [cmdsAdded, setCmdsAdded] = useState(cmdType);
  const oldCmds = useRef(cmdType);

  useEffect(() => {
    if (!selectedEl || !selectedEl.currentEl) {
      setCmds([]);
      return;
    }
    const attrCmds = selectedEl.currentEl.getAttribute("inf-cmds");

    setCmds(attrCmds ? JSON.parse(attrCmds) : []);
  }, [selectedEl]);

  useEffect(() => {
    if (!editor || !editor.getSelected()) return;
    const script = buildScriptFromCmds(cmds);
    const parsedValue = parseCmds(cmds);
    let allParams = [];
    parsedValue.params.forEach(
      (paramArr) => (allParams = [...allParams, ...paramArr])
    );
    const newVars = [
      ...new Set([
        ...parsedValue.vars,
        ...allParams,
        ...parsedValue.objectskeys,
      ]),
    ];
    setVars(newVars);
    console.log(script);

    const clone = structuredClone(cmds);
    clone.forEach((cmd) => {
      // cmd.params =  cmd.params.map(param=>structuredClone(param));
      delete cmd.desc;
      delete cmd.ex;
      cmd.params.forEach((param) => {
        delete param.keywords;
      });
    });

    console.log(evalObject(`${cmds}`), JSON.stringify(clone));

    editor.getSelected().addAttributes({ "inf-cmds": JSON.stringify(cmds) });
  }, [cmds]);

  useEffect(() => {
    scrollToLastElAdded();
    console.log(cmds.length, cmdsAdded.length);
  }, [cmdsAdded]);

  const scrollToLastElAdded = () => {
    const difId = getDifferences(
      oldCmds.current.map((oldCmd) => oldCmd.id),
      cmds.map((cmd) => cmd.id)
    );

    if (!difId || !difId.length) return;
    const newEl = document.querySelector(`#${difId[0]}`);
    newEl &&
      newEl.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
  };

  const copyCmds = () => {
    const cmdsAsObj = {};
    cmds.forEach((cmd) => {
      cmdsAsObj[cmd.name] = cmd;
    });
    
    copyToClipboard(objectToString(cmdsAsObj));
  };

  const pasteCmds = async () => {
    const copidText = await navigator.clipboard.readText();
    const objectFromCopiedText = evalObject(copidText);
    setCmds(Object.values(objectFromCopiedText) || cmds);
  };

  const clearAllCmds = () => {
    setCmds([]);
  };

  const addCmd = (value) => {
    if (!value || !hsCmds[value]) return;
    const cloneObj = structuredClone(hsCmds[value]);
    cloneObj.name = value;
    cloneObj.id = uniqueID();
    setCmds((cmds) => [...cmds, cloneObj]);
    setCmdsKeys(Object.keys(hsCmds));
    const cloneOfCmdsAdded = structuredClone(cmds);
    setCmdsAdded(cloneOfCmdsAdded);
    oldCmds.current = cloneOfCmdsAdded;
    console.log('after');
    setCommand(new String(''));

    // setCommand('')
  };

  const addCmdBetween = (value, i) => {
    if (!value || !hsCmds[value]) return;
    const cloneObj = structuredClone(hsCmds[value]);
    cloneObj.name = value;
    cloneObj.id = uniqueID();
    const cloneBetween = pushBetween({
      arr: cmds,
      oldContet: cmds[i],
      content: cloneObj,
    });

    setCmds(cloneBetween);
    setCmdsKeys(Object.keys(hsCmds));
    const cloneOfCmdsAdded = structuredClone(cmds);
    setCmdsAdded(cloneOfCmdsAdded);
    oldCmds.current = cloneOfCmdsAdded;
    setCommand(new String(''));
    // setCommand('')

  };

  const setOptionValue = (value, i) => {
    const clone = structuredClone(cmds);
    clone[i].optionValue = value;
    setCmds(clone);
  };

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
    clone[i].params[x].value = objectToString({
      ...evalObject(clone[i].params[x].value || {}),
      [propKey]: propVal,
    });

    // JSON.stringify({
    //   ...JSON.parse(clone[i].params[x].value || {}),
    //   [propKey]: propVal,
    // });
    console.log(propKey, propVal, clone[i].params[x].value);
    setCmds(clone);
  };

  const removeKeyAndValueForObject = ({ i, x, propKey }) => {
    const clone = structuredClone(cmds);
    const newObjData = JSON.parse(clone[i].params[x].value);
    delete newObjData[propKey];
    clone[i].params[x].value = JSON.stringify(newObjData);
    console.log(newObjData, propKey);

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
          keywords={cmdKeys}
          value={command}
          placeholder="Type command"
          onInput={(value) => setCommand(value)}
          onItemClicked={(value) => addCmd(value)}
          onEnterPress={(value) => addCmd(value)}
        />

        <OptionsButton
          callbackChildren={({ setShowMenu }) => {
            return (
              <>
                <li
                  onClick={(ev) => {
                    setShowMenu(false)
                    addClickClass(ev.currentTarget, "click");
                    copyCmds();
                  }}
                  className="flex items-center gap-2 cursor-pointer transition-all hover:bg-gray-700 font-semibold p-2 rounded-lg"
                >
                  {Icons.copy({})}
                  <span>Copy</span>
                </li>

                <li
                  onClick={(ev) => {
                    ev.preventDefault()
                    setShowMenu(false)
                    addClickClass(ev.currentTarget, "click");
                    pasteCmds();
                  }}
                  className="flex items-center gap-2 cursor-pointer transition-all hover:bg-gray-700 font-semibold p-2 rounded-lg"
                >
                  {Icons.paste({})}
                  <span>Paste</span>
                </li>

                <li
                  onClick={(ev) => {
                    setShowMenu(false)
                    addClickClass(ev.currentTarget, "click");
                    clearAllCmds();
                  }}
                  className="flex items-center gap-2 cursor-pointer transition-all hover:bg-gray-700 font-semibold p-2 rounded-lg"
                >
                  {Icons.delete({})}
                  <span>Clear All</span>
                </li>
              </>
            );
          }}
        />

        <SmallButton
          className="flex-shrink-0 bg-gray-800"
          onClick={(ev) => {
            addCmd(command);
          }}
        >
          {Icons.plus("white")}
        </SmallButton>
      </section>

      <section className="w-full flex flex-col gap-[40px] ">
        {cmds.map((cmd, i) => {
          return (
            <Adder
              key={i}
              id={cmd.id}
              itemRef={adderRef}
              className="bg-gray-800 relative minion"
              inputClassName="bg-gray-900"
              addClassName="bg-gray-900"
              delClassName="bg-gray-900"
              placeholder="Type command"
              showSelectMenu={true}
              value={command}
              // emptyInputValueAfterClick={true}
              keywords={cmdKeys}
              onInput={(value) => setCommand(value)}
              onEnterPress={(value) => {
                addCmdBetween(value, i);
              }}
              onItemClicked={(value) => {
                addCmdBetween(value, i);
              }}
              onAddClick={(ev, value) => {
                addCmdBetween(value, i);
              }}
              onDeleteClick={(ev) => {
                deleteCmd(i);
              }}
            >
              <section className="flex flex-col gap-3 relative">
                <MiniTitle>{cmd.name}</MiniTitle>

                {cmd.optionsRequired && (
                  <Select
                    value={cmd.optionValue}
                    placeholder="Select Option"
                    className="bg-gray-900"
                    keywords={Object.values(cmd.options)}
                    onAll={(value) => {
                      setOptionValue(value, i);
                    }}
                  />
                )}

                {cmd.params.map((param, x) => {
                  return (
                    <section
                      key={x}
                      className={`w-full flex justify-between  gap-2 ${
                        param.type == "array" || param.type == "object"
                          ? "flex-col"
                          : ""
                      }`}
                    >
                      <p
                        className={` ${
                          param.type == "array" || param.type == "object"
                            ? " p-2 self-center w-[60%] bg-blue-600 text-lg mb-2 border-[2px]"
                            : "max-w-[30%] bg-gray-900 py-1"
                        }  select-none border-l-[3px]  text-nowrap text-[calc(3.5vh/2)] overflow-auto hideScrollBar   flex   items-center justify-center flex-shrink-0 w-[30%]   rounded-lg  border-blue-600   text-slate-200 font-bold `}
                      >
                        {param.name} :{" "}
                      </p>

                      {/* {param.} */}

                      {(param.type == "text" || param.type == "number") && (
                        <Input
                          className="bg-gray-900 w-full py-3"
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
                          keywords={
                            hsCmds[cmd.name].params[x].keywords &&
                            param.accessVars
                              ? [
                                  ...structuredClone(
                                    hsCmds[cmd.name].params[x].keywords
                                  ),
                                  ...vars,
                                ]
                              : param.keywords || []
                          }
                          className="w-full  bg-gray-900"
                          placeholder={param.name}
                          onMenuOpen={({ setKeywords }) => {
                            setKeywords(
                              param.keywords && param.accessVars
                                ? [...param.keywords, ...vars]
                                : param.keywords || []
                            );
                          }}
                          onMenuClose={({ setKeywords }) => {
                            setKeywords(
                              param.keywords && param.accessVars
                                ? [...param.keywords, ...vars]
                                : param.keywords || []
                            );
                          }}
                          value={param.value || ""}
                          onAll={(value) => {
                            addValueForSelect(value, i, x);
                          }}
                        />
                      )}

                      {param.type == "object" && (
                        <ObjectInput
                          className="bg-gray-800"
                          keywords={[...vars , ...hsZoo]}
                          obj={param.value ? evalObject(param.value) || {} : {}}
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
    </section>
  );
};

