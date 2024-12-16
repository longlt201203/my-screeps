import { ROLE_HARVESTER } from "./constants";

export function runSpawn(spawn: StructureSpawn) {
  spawnCreep(spawn);
}

function spawnCreep(spawn: StructureSpawn) {
  spawn.spawnCreep([WORK, MOVE, CARRY], `worker_${Game.time}`, {
    memory: {
      role: ROLE_HARVESTER,
    },
  });
}
