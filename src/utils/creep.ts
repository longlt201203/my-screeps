import { runHarvester } from "@roles/harvester";
import { ROLE_HARVESTER } from "./constants";
import { runUpgrader } from "@roles/upgrader";
import { runBuilder } from "@roles/builder";

const runMap = [runHarvester, runUpgrader, runBuilder];

export function runCreep(creep: Creep) {
  const role = creep.memory.role || ROLE_HARVESTER;
  runMap[role](creep);
}
