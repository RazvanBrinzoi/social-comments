export function fakeFetch<T>(
  data: T,
  delay = 1000,
  shouldFail = false
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject("Simulated fetch error 🚨");
      } else {
        resolve(data);
      }
    }, delay);
  });
}
