import { MY_VISUALIZE_PATH_STYLE } from "@utils/constants";
import { isSourceSafe } from "@utils/source";
import { runBuilder } from "./builder";

export function runHarvester(creep: Creep) {
  let structures = creep.room.find(FIND_MY_STRUCTURES);
  const target = structures.find(
    (s) =>
      (s.structureType == "extension" || s.structureType == "spawn") &&
      s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  );

  if (!target) {
    runBuilder(creep);
    return;
  }

  if (creep.store.getFreeCapacity() == 0) {
    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {
        visualizePathStyle: MY_VISUALIZE_PATH_STYLE,
      });
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
    }
  }
}
