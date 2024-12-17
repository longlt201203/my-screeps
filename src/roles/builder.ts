import { MY_VISUALIZE_PATH_STYLE } from "@utils/constants";
import { isSourceSafe } from "@utils/source";
import { runUpgrader } from "./upgrader";

export function runBuilder(creep: Creep) {
  if (creep.memory.building) {
    let constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
    if (constructionSites.length == 0) {
      creep.memory.building = false;
      runUpgrader(creep);
      return;
    }
    let target =
      constructionSites.find((item) => item.structureType == "extension") ||
      constructionSites[0];
    if (creep.build(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {
        visualizePathStyle: MY_VISUALIZE_PATH_STYLE,
      });
    }

    if (creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
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
        creep.memory.building = true;
      }
    }
  }
}
