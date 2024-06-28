/**

 * Throttle function to limit the execution of a callback.
 * @param {function} callback - The function to be throttled.
 * @param {number} limit - The time limit in milliseconds.
 * @returns {function} - The throttled function.
 */
export const throttle = (callback, limit) => {
  let inThrottle = false;

  return (...args) => {
    if (!inThrottle) {
      callback(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// // Example usage:
// const throttledFunction = throttle(() => {
//   console.log("Throttled function executed");
// }, 200);
//
// // Call the throttled function
// throttledFunction();
//
// setTimeout(() => throttledFunction(), 200);
// setTimeout(() => throttledFunction(), 500);
// setTimeout(() => throttledFunction(), 800);
// setTimeout(() => throttledFunction(), 1100);
