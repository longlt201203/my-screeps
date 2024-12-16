import { deploy, api } from "./deploy.js";

async function watch() {
  await deploy();

  api.socket.on("connected", () => {
    console.log("Socket connected!");
  });

  api.socket.subscribe("console", (e) => {
    console.log("console data:");
    console.log(JSON.stringify(e.data));
  });

  api.socket.subscribe("cpu", (event) => console.log("cpu", event.data));

  await api.socket.connect();
}

watch();
