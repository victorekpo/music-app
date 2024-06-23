/**
 * Debounce function to delay the execution of a callback.
 * @param {function} callback - The function to be debounced.
 * @param {number} delay - The delay in milliseconds.
 * @param {boolean} immediate - If true, trigger the callback at the leading edge.
 * @returns {function} - The debounced function.
 */
export const debounce = (callback, delay, immediate = false) => {
  let timeoutId;

  return (...args) => {
    const later = () => {
      timeoutId = null;
      if (!immediate) {
        callback(...args);
      }
    };

    const callNow = immediate && !timeoutId;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, delay);

    if (callNow) {
      callback(...args);
    }
  };
};
//
// // Example usage:
// const debouncedFunction = debounce(() => {
//   console.log("Debounced function executed");
// }, 300);
//
// // Call the debounced function
// setTimeout(() => debouncedFunction(), 0); // 0 - 301
// setTimeout(() => debouncedFunction(), 302); // 302 - 731
// setTimeout(() => debouncedFunction(), 732); // 732 - 1043
// setTimeout(() => debouncedFunction(), 1044);