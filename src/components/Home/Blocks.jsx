import React from "react";
import { useRecoilValue } from "recoil";
import { blocksStt } from "../../helpers/atoms";
import { DetailsForBlocks } from "./Protos/DetailsForBlocks";

export const Blocks = () => {
  const blocksAtom = useRecoilValue(blocksStt);

  return (
    <>
      {Object.keys(blocksAtom).map((ctg, i) => {
        return (
          <DetailsForBlocks
            key={i}
            label={ctg}
            HTMLChildren={blocksAtom[ctg]}
          />
        );
      })}
    </>
  );
};
