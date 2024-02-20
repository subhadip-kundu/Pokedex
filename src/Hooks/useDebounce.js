// USE THIS FOR SENDING NETWORK REQUEST FOR SEARCH (MAKE SOME DELAY FOR THE LIMITED TIMES REQUEST TO THE NETWORK)

// Define a higher-order function named useDebounce
function useDebounce(cb, delay = 500) {
  let timerId; // Variable to hold the ID of the setTimeout timer

  // Return an anonymous function that will be used as the debounced function
  return (...args) => {
    // Clear any existing timeout to prevent multiple executions
    clearTimeout(timerId);

    // Set a new timeout for executing the callback function
    timerId = setTimeout(() => {
      cb(...args); // Execute the callback function with provided arguments
    }, delay); // Delay specifies the time after which the callback will be invoked
  };
}

// Export the useDebounce function as the default export
export default useDebounce;


