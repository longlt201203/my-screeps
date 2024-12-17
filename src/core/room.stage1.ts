import { runSpawn } from "@utils/spawn";

export function runRoomStageInit(room: Room) {
  const spawns = room.find(FIND_MY_SPAWNS);
  spawns.forEach(runSpawn);
}
