import { Worker } from "bullmq";

console.log("Worker running...");

new Worker("unimportant work", async ({ data }) => {
  let sum = 0;
  for(let i  = 0; i < data.num * 100000000; i++) {
    sum += i;
  }
  console.log(sum);
}, {
  connection: {
    port: 6379,
    host: "localhost"
  }
});

