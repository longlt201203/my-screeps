import { WORKER_BODY } from "./constants";
import { getTopPriorityJob } from "./room";

export function runSpawn(spawn: StructureSpawn) {
  spawnCreep(spawn);
}

function spawnCreep(spawn: StructureSpawn) {
  spawn.spawnCreep(WORKER_BODY, `worker_${Game.time}`, {
    memory: {
      role: getTopPriorityJob(spawn.room),
    },
  });
}
