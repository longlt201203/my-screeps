import { runCreep } from "@utils/creep";
import { runSpawn } from "@utils/spawn";

export function loop() {
  console.log(`Game time: ${Game.time}`);
  cleanUp();
  Object.values(Game.spawns).forEach(runSpawn);
  Object.values(Game.creeps).forEach(runCreep);
}

function cleanUp() {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }
}
