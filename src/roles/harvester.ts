import { getAvailableSlots, isSourceSafe } from "@utils/source";

function reset(creep: Creep) {
  creep.memory.transfering = false;
  creep.memory.sourceId = undefined;
}

export function runHarvester(creep: Creep) {
  if (creep.memory.transfering) {
    const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
    if (!spawn) return;
    const actionResult = creep.transfer(spawn, RESOURCE_ENERGY);
    if (actionResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    } else if (actionResult == OK) {
      reset(creep);
    }
  } else {
    let source = creep.memory.sourceId
      ? Game.getObjectById(creep.memory.sourceId)
      : creep.room
          .find(FIND_SOURCES)
          .find(
            (source) => getAvailableSlots(source) > 0 && isSourceSafe(source)
          );
    if (!source) return;
    creep.memory.sourceId = source.id;
    const actionResult = creep.harvest(source);
    if (actionResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    } else if (creep.store.getFreeCapacity() == 0) {
      creep.memory.transfering = true;
    }
  }
}
