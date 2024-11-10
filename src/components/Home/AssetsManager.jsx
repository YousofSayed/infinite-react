import React, { useEffect, useRef, useState } from "react";
import { Button } from "../Protos/Button";
import { addClickClass, uniqueID } from "../../helpers/cocktail";
import { Icons } from "../Icons/Icons";
import { P } from "../Protos/P";
import { useRecoilValue } from "recoil";
import { cssPropForAssetsManagerState } from "../../helpers/atoms";
import { useSetClassForCurrentEl } from "../../hooks/useSetclassForCurrentEl";

/**
 *
 * @param {{editor: import('grapesjs').Editor}} param0
 * @returns
 */
export const AssetsManager = ({ editor }) => {
  /**
   * @type {{src:string , type: 'video' | 'audio' | 'image' , name:string}[]}
   */
  const filesType = [];
  const [warn, setWarn] = useState("");
  const [files, setFiles] = useState(filesType);
  const cssPropForAM = useRecoilValue(cssPropForAssetsManagerState);
  const setClass = useSetClassForCurrentEl();

  // const editor = useEditorMaybe();
  /**
   * @type {{current : HTMLInputElement}}
   */
  const inputRef = useRef();
  // const selec = editor.getSelected();

  useEffect(() => {
    if (!inputRef.current) return;
  });

  useEffect(() => {
    getAssetsFromAM();
  }, []);

  const getAssetsFromAM = () => {
    const assets = editor.Assets.getAll().models.map(
      (asset) => asset.attributes
    );
    console.log(assets);
    setFiles(assets);
  };

  const openUploader = () => {
    setWarn("");
    inputRef.current.click();
  };

  /**
   *
   * @param {InputEvent} ev
   */
  const onUploaderLoad = (ev) => {
    /**
     * @type {File[]}
     */
    const inputFiles = Array.from(ev.target.files);
    const newFiles = [];

    inputFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const fileSize = +(file.size / (1024 * 1024)).toFixed(2);

      if (fileSize > 30) {
        setWarn("⚠ Maximum file size in 30MB");

        setTimeout(() => {
          setWarn("");
        }, 1500);
        return;
      }

      const upload = (ev) => {
        newFiles.push({
          src: ev.target.result,
          type: file.type.split("/")[0],
          name: file.name,
        });
        console.log(newFiles);
        setFiles([...files, ...newFiles]);
        editor.Assets.add({
          type: file.type.split("/")[0],
          src: ev.target.result,
          name: file.name,
        });
        reader.removeEventListener("load", upload);
      };

      reader.addEventListener("load", upload);
    });
  };

  /**
   *
   * @param {MouseEvent} ev
   * @param {File} file
   */
  const onItemClicked = (ev, file) => {
    ev.stopPropagation();
    ev.preventDefault();
    addClickClass(ev.target, "click");
    const selectedEl = editor.getSelected();
    console.log(cssPropForAM);

    cssPropForAM
      ? setClass({
          cssProp: cssPropForAM,
          value: `url("${file.src}")`,
        })
      : selectedEl.addAttributes({ src: file.src });
  };

  const deleteAsset = (src) => {
    const newAssets = files.filter((asset) => asset.src != src);
    editor.Assets.clear();
    editor.Assets.add(newAssets);
    setFiles(newAssets);
  };

  return (
    <main className="w-full h-[500px]">
      <section className="container h-full m-auto  rounded-lg flex flex-col gap-2">
        <header className="flex justify-between items-center p-2 rounded-lg rounded-tl-full rounded-tr-2xl rounded-br-2xl rounded-bl-full bg-gray-950 ">
          {Icons.logo()}
          {warn && (
            <p className="font-semibold text-xl bg-red-700 p-2 rounded-lg">
              {warn}
            </p>
          )}
          <Button
            onClick={openUploader}
            className="py-[7.5px] px-[30px]  font-bold text-lg"
          >
            Upload
          </Button>
        </header> 

        <section
          className={`w-full h-full  bg-gray-950 rounded-lg p-2 overflow-auto grid grid-cols-[repeat(auto-fill,minmax(25%,1fr))] grid-rows-[repeat(auto-fill,minmax(200px,200px))] justify-start gap-[15px] `}
        >
          {files.map((file, i) => (
            <article
              key={i}
              className={`group relative rounded-lg bg-gray-900  flex flex-col justify-center items-center gap-2`}
            >
              <button
                onClick={(ev) => {
                  deleteAsset(file.src);
                }}
                className="absolute group-hover:flex z-20 right-[-5px] top-[-5px] bg-blue-600 fill-white cursor-pointer hidden justify-center items-center rounded-full w-[20px] h-[20px]"
              >
                <Icons.close />
              </button>

              <figure
                onClick={(ev) => {
                  ev.stopPropagation();
                  onItemClicked(ev, file);
                }}
                className=" p-2 h-[150px]  cursor-pointer rounded-lg  "
              >
                {(file.type == "video" && (
                  <>
                    <video
                      onClick={(ev) => onItemClicked(ev, file)}
                      // className="w-full h-full"
                      src={file.src}
                      // controls={true}
                    ></video>
                    <p className="mt-5 p-1 bg-blue-600 w-fit font-bold rounded-lg">
                      video
                    </p>
                  </>
                )) ||
                  (file.type == "audio" && (
                    <audio
                      onClick={(ev) => onItemClicked(ev, file)}
                      className="w-full h-full"
                      src={file.src}
                      controls={true}
                    ></audio>
                  )) ||
                  (file.type == "image" && (
                    <img
                      onClick={(ev) => onItemClicked(ev, file)}
                      className="w-full h-full object-fill"
                      src={file.src}
                      controls={true}
                    ></img>
                  ))}
              </figure>
              <p className="text-slate-400 text-ellipsis max-w-[90%]   text-nowrap overflow-hidden ">
                {file.name}
              </p>
            </article>
          ))}
        </section>

        <input
          onChange={onUploaderLoad}
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={true}
        />
      </section>
    </main>
  );
};
