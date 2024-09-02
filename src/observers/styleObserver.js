/**
 *
 * @param {{current:string[]}} characterDataStack
 * @param {{current:number}} characterDataIndex
 * @returns
 */
export const styleObserver = (characterDataStack, characterDataIndex) => {
  return new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // if(mutation.type != 'characterData')return;
      characterDataStack.current.push(
        mutation.oldValue,
        mutation.target.textContent
      );
      characterDataStack.current = Array.from(
        new Set(characterDataStack.current)
      );
      characterDataStack.current =
        characterDataStack.current.length > 100
          ? characterDataStack.current.slice(1)
          : characterDataStack.current;
      characterDataIndex.current = characterDataStack.current.length - 1;
      console.log(characterDataStack.current, characterDataIndex.current);
    });
  });
};
