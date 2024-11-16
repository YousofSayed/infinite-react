import React, { useEffect, useRef, useState } from "react";
import { Input } from "./Protos/Input";
import { useEditorMaybe } from "@grapesjs/react";
import { Aside } from "./Protos/Aside";
import {
  evalBasedOnObjectScope,
  evalObject,
  isValidVFor,
} from "../../helpers/functions";
import { parseToHTML, random } from "../../helpers/cocktail";
import { dispatchVMount } from "../../helpers/customEvents";
import { Button } from "../Protos/Button";
import { AsideControllers } from "./Protos/AsideControllers";
import { traitsType } from "../../helpers/jsDocs";
import { useRecoilValue } from "recoil";
import { currentElState } from "../../helpers/atoms";
import { SmallButton } from "./Protos/SmallButton";
import { Icons } from "../Icons/Icons";
import { Select } from "./Protos/Select";

export const TraitsAside = () => {
  const editor = useEditorMaybe();
  const [newTraitName, setNewTraitName] = useState("");
  const [traits, setTraits] = useState(traitsType);
  const selectedEl = useRecoilValue(currentElState);

  useEffect(() => {
    if (!editor || !editor.getSelected()) return;
    const sle = editor.getSelected();
    console.log(editor.getSelected().getTraits());

    setTraits(sle.getTraits());
  }, [selectedEl]);

  const updateAttributesCmp = ({ name = "", value = "" }) => {
    const sle = editor.getSelected();
    sle.addAttributes({ [name]: value });
  };

  const addTrait = (name) => {
    const sle = editor.getSelected();
    sle.addTrait([name]);
    setNewTraitName('');
    setTraits(sle.getTraits());
  };

  const removeTrait = (name) => {
    const sle = editor.getSelected();
    sle.removeTrait([name]);
    setTraits(sle.getTraits());
  };

  return (
    <>
      <AsideControllers />
      <menu className="flex flex-col gap-4" title="traits menu">
        {traits.length
          ? traits.map((trait, i) => {
              return (
                <li key={i} className="flex  gap-2">
                  <h1 className="border-l-[3px] w-[25%] text-sm bg-gray-800 rounded-lg border-l-blue-600 p-2 capitalize font-bold text-slate-200 flex-shrink-0">
                    {trait.attributes.name}
                  </h1>

                  <section className="w-[75%] flex gap-2">
                    {trait.attributes.type == "text" ? (
                      <Input
                        value={selectedEl.currentEl.getAttribute(
                          trait.attributes.name
                        ) || ''}
                        className="w-full  bg-gray-800"
                        placeholder={trait.attributes.name}
                        onInput={(ev) => {
                          updateAttributesCmp({
                            name: trait.attributes.name,
                            value: ev.target.value,
                          });
                        }}
                      />
                    ) : (
                      <Select
                        value={selectedEl.currentEl.getAttribute(
                          trait.attributes.name
                        ) || ''}
                        className="px-[unset] py-[unset] w-full flex-grow"
                        inputClassName="bg-gray-800 w-full"
                        keywords={trait.attributes.options.map(
                          (option) => option.id
                        )}
                        placeholder={trait.attributes.name}
                        onInput={(value) => {
                          updateAttributesCmp({
                            name: trait.attributes.name,
                            value,
                          });
                        }}
                        onEnterPress={(value) => {
                          updateAttributesCmp({
                            name: trait.attributes.name,
                            value,
                          });
                        }}
                        onItemClicked={(value) => {
                          updateAttributesCmp({
                            name: trait.attributes.name,
                            value,
                          });
                        }}
                      />
                    )}
                    <SmallButton
                      className="flex-shrink-0 bg-gray-800"
                      onClick={(ev) => {
                        removeTrait(trait.attributes.name);
                      }}
                    >
                      {Icons.delete("white")}
                    </SmallButton>
                  </section>
                </li>
              );
            })
          : null}

        <li className="flex flex-col gap-2 items-center">
          <Input
          value={newTraitName}
            className="w-full text-center bg-gray-800"
            placeholder="Add Attribute"
            onInput={(ev) => {
              setNewTraitName(ev.target.value);
            }}
          />
          <Button
            onClick={(ev) => {
              addTrait(newTraitName);
            }}
          >
            Add
          </Button>
        </li>
      </menu>
    </>
  );
};
