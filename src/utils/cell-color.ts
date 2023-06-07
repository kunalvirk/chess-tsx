/**
 * @param {string} position The position of the cell e.g a1
 * @param {number} index.
 * @returns {boolean} true if a square/cell should be labelled as light
  based on its index
 */
  export const isLightSquare = (position: string, index: number) => {
    const row = position[1];
    const isEven = (x) => !(x % 2);

    if (isEven(row) && !isEven(index + 1)) {
        return true;
    }

    if (isEven(index + 1) && !isEven(row)) {
        return true;
    }
    return false;
};
