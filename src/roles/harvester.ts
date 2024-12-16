export function runHarvester(creep: Creep) {
  const sources = creep.room.find(FIND_SOURCES);
  const source = sources[0];

  if (creep.store.getFreeCapacity() == 0) {
    const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
    if (!spawn) return;
    if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    }
  } else {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }
}
