import { MY_VISUALIZE_PATH_STYLE } from "@utils/constants";
import { isSourceSafe } from "@utils/source";

export function runUpgrader(creep: Creep) {
  if (creep.memory.upgrading) {
    const controller = creep.room.controller;
    if (!controller) {
      return;
    }
    const actionResult = creep.upgradeController(controller);
    if (actionResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(controller, {
        visualizePathStyle: MY_VISUALIZE_PATH_STYLE,
      });
    }

    if (creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.upgrading = false;
    }
  } else {
    if (!creep.memory.sourceId) return;
    const source = Game.getObjectById(creep.memory.sourceId);
    if (!source) {
      return;
    }
    if (!isSourceSafe(source)) {
      return;
    }
    const actionResult = creep.harvest(source);
    if (actionResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(source, {
        visualizePathStyle: MY_VISUALIZE_PATH_STYLE,
      });
    } else if (actionResult == OK) {
      creep.say(
        `${Math.round(
          (creep.store[RESOURCE_ENERGY] /
            creep.store.getCapacity(RESOURCE_ENERGY)) *
            100
        )}%`
      );

      if (creep.store.getFreeCapacity() == 0) {
        creep.memory.upgrading = true;
      }
    }
  }
}
