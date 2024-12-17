import { runHarvester } from "@roles/harvester";
import { ROLE_HARVESTER } from "./constants";
import { runUpgrader } from "@roles/upgrader";

const runMap = [runHarvester, runUpgrader];

export function runCreep(creep: Creep) {
  const role = creep.memory.role || ROLE_HARVESTER;
  runMap[role](creep);
}
