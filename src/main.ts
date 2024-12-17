import { runCreep } from "@utils/creep";
import { runRoom } from "@utils/room";

export function loop() {
  console.log(`Game time: ${Game.time}`);
  Object.values(Game.rooms).forEach(runRoom);
  Object.values(Game.creeps).forEach(runCreep);
}
