console.log("I am in the worker!", self);

function fibSequence(n) {
  if (typeof n !== "number") return 0;
  if (Number.isNaN(n)) return 0;
  if (n <= 1) return 1;
  if (n == 2) return 2;
  return fibSequence(n-1) + fibSequence(n-2);
}

self.onmessage = ({data}) => {
  if (data.type === "computeFib") {
    const num = fibSequence(data.payload);
    self.postMessage({
      type: "computeFib-done",
      payload: num,
    })
  }
}
