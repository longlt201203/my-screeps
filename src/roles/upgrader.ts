export function runUpgrader(creep: Creep) {
  if (creep.memory.upgrading) {
    const controller = creep.room.controller;
    if (!controller) {
      return;
    }
    const actionResult = creep.upgradeController(controller);
    if (actionResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(controller);
    }

    if (creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.upgrading = false;
    }
  } else {
    const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
    if (!spawn) {
      return;
    }
    const actionResult = creep.withdraw(spawn, RESOURCE_ENERGY);
    if (actionResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(spawn);
    } else if (actionResult == OK || creep.store.getFreeCapacity() == 0) {
      creep.memory.upgrading = true;
    }
  }
}
