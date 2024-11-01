import React from "react";
import { Property } from "./Property";
import { SmallButton } from "./SmallButton";
import { Icons } from "../../Icons/Icons";

export const LinearGradient = () => {
  return (
    <section className="flex flex-col gap-2 p-1 rounded-lg bg-gray-700">
      <section className="w-full justify-between flex gap-2">
        <Property
          sectionClassName="p-[unset] px-[unset] w-full"
          inputClassName="w-full"
          placeholder="Direction"
        />

        <SmallButton >
            {Icons.plus('white')}
        </SmallButton>
      </section>
    </section>
  );
};
