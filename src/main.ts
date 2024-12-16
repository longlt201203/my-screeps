import { runCreep } from "@utils/creep";
import { runRoom } from "@utils/room";
import { runSpawn } from "@utils/spawn";

export function loop() {
  console.log(`Game time: ${Game.time}`);
  Object.values(Game.rooms).forEach(runRoom);
  Object.values(Game.spawns).forEach(runSpawn);
  Object.values(Game.creeps).forEach(runCreep);
}
