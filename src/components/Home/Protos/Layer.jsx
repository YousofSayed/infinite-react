import React, { useEffect, useState } from "react";
import { Icons } from "../../Icons/Icons";
import { useEditorMaybe } from "@grapesjs/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { sharedLayerState } from "../../../helpers/atoms";
import { toast } from "react-toastify";
import { ToastMsgInfo } from "./ToastMsgInfo";

/**
 *
 * @param {{layers:import('grapesjs').Component[] , setLayers:Function ,wrapperId:string ,layer:import('grapesjs').Component , className:string , style : CSSStyleDeclaration}} param0
 * @returns
 */
export const Layer = ({
  layer,
  layers,
  setLayers,
  wrapperId,
  style = {},
  className = "",
}) => {
  const [layersStt, setLayerStt] = useState(layers);
  const [isOpentNested, setOpenNested] = useState(false);
  const [selected, setSelected] = useState(false);
  const sharedLayer = useRecoilValue(sharedLayerState);
  const setSharedLayer = useSetRecoilState(sharedLayerState);
  const editor = useEditorMaybe();

  useEffect(() => {
    setLayerStt(layers);
  }, [layers]);

  const openNested = () => {
    setOpenNested(!isOpentNested);
  };

  /**
   *
   * @param {DragEvent} ev
   */
  const reomveOpacity = (ev) => {
    ev.currentTarget.style.opacity = 0;
  };

  const addOpacity = (ev) => {
    ev.currentTarget.style.opacity = 0.7;
  };

  const getLayerLength = (layer) => {
    return layer
      .components()
      .models.filter((lyr) => lyr.getName().toLowerCase() != "box").length;
  };

  const dropCallback = ({ isAfter = false, ev }) => {
    reomveOpacity(ev);
    if (layer.getId() == sharedLayer) {
      toast.warn(<ToastMsgInfo msg={"Not allowed"} />);
      return;
    }
    const movedCmp = editor.getWrapper().find(`#${sharedLayer.id}`)[0];
    const index = layer.index();
    const parent = layer.parent().components();
    movedCmp.remove();
    parent.add(movedCmp, { at: isAfter ? index + 1 : index });

    !layer.components().models.length && setOpenNested(false);
    // layer.replaceWith(movedCmp);
    setLayers(
      editor
        .getWrapper()
        .components()
        .models.filter((lyr) => lyr.getName().toLowerCase() != "box")
    );
  };

  return (
    <section
      id={layer.getId()}
      className={`flex flex-col  gap-2  items-center justify-between mb-1 rounded-lg   border-transparent transition-all  `}
    >
      <section
        draggable={true}
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
        onDrag={(ev) => {
          setSharedLayer({ id: layer.getId(), setState: setOpenNested });
        }}
        onMouseOver={(ev) => {
          ev.stopPropagation();
          layer.getView().el.style.outline = "2px solid blue";
        }}
        onMouseLeave={(ev) => {
          ev.stopPropagation();
          layer.getView().el.style.outline = "";
        }}
        onClick={(ev) => {
          const el = ev.currentTarget;
          el.style.background = "#2563eb";
          setSelected(!selected);
          !selected ? editor.select(layer) : editor.selectRemove(layer);

          const desCb = () => {
            el.style.background = "";
            editor.off("component:deselected", desCb);
            setSelected(false);
          };
          editor.on("component:deselected", desCb);
        }}
        style={style}
        className={`relative flex items-center justify-between w-full  p-2 rounded-lg ${
         isOpentNested && getLayerLength(layer)
            ? "bg-gray-800"
            : "bg-gray-950"
        } ${className ? className : "bg-gray-800"}`}
      >
        <div
          id="top"
          onDragOver={(ev) => {
            addOpacity(ev);
          }}
          onDragLeave={(ev) => {
            reomveOpacity(ev);
          }}
          onDragEnd={(ev) => {
            reomveOpacity(ev);
          }}
          onDrop={(ev) => {
            dropCallback({ ev });
          }}
          className="absolute left-0 top-0 w-full h-[15px] rounded-tl-lg rounded-tr-lg bg-blue-600 opacity-[0] transition-all"
        ></div>

        <div
          id="bottom"
          onDragOver={(ev) => {
            addOpacity(ev);
          }}
          onDragLeave={(ev) => {
            reomveOpacity(ev);
          }}
          onDragEnd={(ev) => {
            reomveOpacity(ev);
          }}
          onDrop={(ev) => {
            dropCallback({ ev, isAfter: true });
          }}
          className="absolute left-0 bottom-[0] w-full h-[15px] rounded-bl-lg rounded-br-lg bg-blue-600 z-[1] opacity-[0] transition-all"
        ></div>

        <div
          id="inside"
          onDragOver={(ev) => {
            addOpacity(ev);
          }}
          onDragLeave={(ev) => {
            reomveOpacity(ev);
          }}
          onDragEnd={(ev) => {
            console.log(ev.currentTarget);

            reomveOpacity(ev);
          }}
          onDragExit={(ev) => {
            console.log(ev.currentTarget);
          }}
          onDrop={(ev) => {
            reomveOpacity(ev);
            if (layer.getId() == sharedLayer) {
              toast.warn(<ToastMsgInfo msg={"Not allowed"} />);
              return;
            }
            const movedCmp = editor.getWrapper().find(`#${sharedLayer.id}`)[0];
            const parent = layer.components();
            const movedCmpParent = movedCmp.parent();
            movedCmp.remove();
            parent.add(movedCmp, { at: 0 });
            console.log(
              "length : ",
              !movedCmpParent.components().models.length
            );

            !movedCmpParent.components().models.length
              ? sharedLayer.setState(false)
              : null;

            // dropCallback({ ev, isAfter: true });
          }}
          className="absolute right-0 bottom-[0] w-[85%] h-[15px] rounded-bl-lg rounded-br-lg bg-blue-500 z-[2] opacity-[0]  transition-all"
        ></div>

        <section className="flex gap-2 items-center">
          {layer.getIcon() ? <i>{layer.getIcon()}</i> : null}

          <p className={` select-none  text-slate-200 mb-2 capitalize`}>
            {layer.getName()}
          </p>
        </section>

        <section className={`flex gap-2 items-center `}>
          {layer
            .components()
            .models.filter((lyr) => lyr.getName().toLowerCase() != "box")
            .length ? (
            <button
              className={`${isOpentNested && "rotate-180"} transition-all`}
              onClick={(ev) => {
                ev.stopPropagation();
                openNested();
              }}
            >
              {Icons.arrow(selected ? "white" : "")}
            </button>
          ) : null}
          <button className="cursor-grab">
            {Icons.drag({ fill: selected ? "white" : undefined })}
          </button>
        </section>
      </section>

      {layer.components().models.length && isOpentNested ? (
        <section
          style={{
            width: layer.parents().length
              ? `calc(100% -  ${layer.components().models.length}px)`
              : `100%`,
          }}
          className={`child flex ${
            isOpentNested &&
            "border-l-2 border-l-slate-600 hover:border-l-blue-600 rounded-bl-lg  pl-[8px]"
          } flex-col self-end justify-end  transition-all overflow-auto`}
        >
          {layer
            .components()
            .models.filter((lyr) => lyr.getName().toLowerCase() != "box")
            .map((lyr, i) => {
              return (
                <Layer
                  className={`w-full self-end ml-5`}
                  // style={{
                  //   // marginLeft:lyr.parents().length? `${lyr.parents().length + 85}px`:`0`,
                  //   width: lyr.parents().length
                  //     ? `calc(100% -  ${lyr.parents().length * 10}px)`
                  //     : `100%`,
                  // }}
                  layer={lyr}
                  key={lyr.getId()}
                  layers={layers}
                  setLayers={setLayers}
                />
              );
            })}
        </section>
      ) : null}
    </section>
  );
};
