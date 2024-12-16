import { ScreepsAPI } from "screeps-api";
import { config } from "dotenv";
import fs from "fs";

config();

export const api = new ScreepsAPI({
  token: process.env.AUTH_TOKEN,
  protocol: "https",
  hostname: "screeps.com",
  port: 443,
  path: "/",
});

export async function deploy() {
  const user = await api.me();
  console.log(`Auth successfully as ${user.username}`);
  const buffer = fs.readFileSync("dist/main.js");
  await api.code.set("default", {
    main: buffer.toString(),
  });
  console.log("Deploy successfully!");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  deploy();
}
