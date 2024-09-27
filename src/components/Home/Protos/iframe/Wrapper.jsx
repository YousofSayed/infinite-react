import React, { useCallback, useEffect, useRef } from "react";
import { getPropVal } from "../../../../helpers/functions";
import { useRecoilValue } from "recoil";
import { currentElState, refsStt } from "../../../../helpers/atoms";
// import { $ } from "../../../../helpers/cocktail";

/**
 *
 * @param {{iframeWindow:Window}} param0
 * @returns
 */
export const Wrapper = ({ iframeWindow, iframeDocument, id }) => {
  const currentElObj = useRecoilValue(currentElState);
  /**
   * @type {{current:HTMLElement}}
   */
  const selectedWrapperRef = useRef();
  /**
   * @type {{current:HTMLElement}}
   */
  const wrapperRef = useRef();

  const $ = (root) => {
    //   if (iframe) {
    // console.log(iframe);

    return iframeDocument.body.querySelector(root);
    //   }
    //   return null;
  };

  /**
   *
   * @param {{el:HTMLElement , targtedEl:HTMLElement,  isZero:boolean}} param0
   */
  const setStyleForWrapper = ({ el, targtedEl, isZero }) => {
    el.style.width = isZero ? 0 : targtedEl.offsetWidth + 'px';
    el.style.height = isZero ? 0 : targtedEl.offsetHeight + 'px';
    el.style.left = isZero ? 0 : targtedEl.getBoundingClientRect().left + "px";
    el.style.top = isZero ? 0 : targtedEl.getBoundingClientRect().top + "px";
    el.style.display = isZero ? "none" : "block";
    // document.body.offsetWidth
  };

  /**
   *
   * @param {{el:HTMLElement }} param0
   */
  const setClickEventOnTarget = ({ el }) => {
    /**
     *
     * @param {MouseEvent} ev
     */
    const clickCallback = (ev) => {
      ev.stopPropagation();
      setStyleForWrapper({
        el: $(`#selected-wrapper`),
        targtedEl: el,
      });
      setStyleForWrapper({
        el: $(`#main-wrapper`),
        isZero: true,
      });

    //   console.log(el, "elll");

      window.currentEl = undefined;
      window.currentEl = el;
      window.dispatchEvent(
        new CustomEvent("currentel", {
          detail: {
            currentEl: el,
          },
        })
      );
    };
    /**
     *
     * @param {MouseEvent} ev
     */
    // const mouseEnterCallback = (ev) => {
    //   el.addEventListener("click", clickCallback);
    // };
    /**
     *
     * @param {MouseEvent} ev
     */
    const mouseLeaveCallback = (ev) => {
      el.removeEventListener("click", clickCallback);
    //   el.removeEventListener("mouseenter", mouseEnterCallback);
      el.removeEventListener("mouseleave", mouseLeaveCallback);
    };

    el.addEventListener("click", clickCallback);
    // el.addEventListener("mouseenter", mouseEnterCallback);
    el.addEventListener("mouseleave", mouseLeaveCallback);
  };

  /**
   *
   * @param {MouseEvent | { target:HTMLElement}} ev
   */
  const onMouseOver = (ev) => {
    // console.log(ev, " over", wrapperRef.current);

    if (ev.target.tagName.toLowerCase() == "body") {
      $(`#main-wrapper`) &&
        setStyleForWrapper({
          el: $(`#main-wrapper`),
          isZero: true,
          targtedEl: ev.target,
        });
      return;
    }

    if (ev.target.classList.contains("wrapper")) return;

    if (ev.target.className.includes("seperator")) {
        // console.log('sepr' , ev.target.parentNode);
        
      setStyleForWrapper({
        el: $(`#main-wrapper`),
        targtedEl: ev.target.parentNode,
      });
      setClickEventOnTarget({ el: ev.target.parentNode });
      return;
    }

    setStyleForWrapper({
      el: $(`#main-wrapper`),
      targtedEl: ev.target,
    });
    setClickEventOnTarget({ el: ev.target });
  };

  /**
   *
   * @param {CustomEvent} ev
   */
  const onUpdateSelectedWrapper = (ev) => {
    setStyleForWrapper({
      el: $(`#selected-wrapper`),
      targtedEl: ev.detail.selectedEl,
    });
  };

  useEffect(() => {
    iframeWindow.addEventListener("mouseover", onMouseOver);
    window.addEventListener("updateSelectedWrapper", onUpdateSelectedWrapper);
    return () => {
      iframeWindow.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener(
        "updateSelectedWrapper",
        onUpdateSelectedWrapper
      );
    };
  });

  //   useEffect(() => {
  //     if (selectedWrapperRef.current && currentElObj.currentEl) {
  //     }
  //   }, [selectedWrapperRef, currentElObj]);

  return (
    <>
      <section
        id="main-wrapper"
        className="wrapper"
        ref={wrapperRef}
        r-once="true"
      ></section>
      <section
        id="selected-wrapper"
        className="wrapper"
        ref={selectedWrapperRef}
        r-once="true"
      ></section>
    </>
  );
};
