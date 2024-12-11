import { useEditorMaybe } from "@grapesjs/react";
import React, { useEffect, useState } from "react";
import { Input } from "../Protos/Input";
import { Button } from "../../Protos/Button";
import { pagesType } from "../../../helpers/jsDocs";
import { Icons } from "../../Icons/Icons";

export const PagesManager = () => {
  const editor = useEditorMaybe();
  const [pages, setPages] = useState(pagesType);
  const [pageName, setPageName] = useState(new String(""));
  const createPage = (pageName = new String("")) => {
    if (!pageName.toString()) return;

    editor.Pages.add({
      id: pageName,
      name: pageName,
    });
    setPageName(new String(""));
    setPages(editor.Pages.getAll());
  };

  const deletePage = (pageId) => {
    const page = editor.Pages.get(pageId);
    editor.Pages.remove(page);
    setPages(editor.Pages.getAll());
  };

  useEffect(() => {
    if (!editor) return;
    setPages(editor.Pages.getAll());
  }, [editor]);

  return (
    <section className="flex flex-col gap-3">
      <header className="w-full p-2 bg-gray-800 rounded-lg flex justify-between gap-2 ">
        <Input
          className="bg-gray-900 w-full"
          placeholder="Page Name"
          value={pageName}
          onInput={(ev) => {
            setPageName(new String(ev.target.value));
          }}
          onKeyUp={(ev) => {
            ev.key.toLocaleLowerCase() == "enter" && createPage(pageName);
          }}
        />
        <Button
          onClick={(ev) => {
            createPage(pageName);
          }}
        >
          Create
        </Button>
      </header>
      <main className="flex flex-col gap-2">
        {pages.map((page, i) => {
          return (
            <article
              key={i}
              className={`flex items-center justify-between p-2 bg-gray-800 rounded-lg  `}
            >
              <section className="flex items-center gap-2">
                {Icons.stNote()}
                <p className="capitalize font-bold text-slate-200">{page.id}</p>
              </section>

              <section>
                <Button
                  title={
                    (page.id == "index" && "Not Allowed To Delete Index Page") || `Delete ${page.id}`
                  }
                  className={`group bg-transparent transition-all p-2 hover:bg-blue-600 ${page.id == 'index' && 'cursor-not-allowed'}`}
                  onClick={(ev) => {
                    if (page.id == "index") return;
                    deletePage(page.id);
                  }}
                >
                  {Icons.trash()}
                </Button>
              </section>
            </article>
          );
        })}
      </main>
    </section>
  );
};
