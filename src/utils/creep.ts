import { runHarvester } from "@roles/harvester";
import { ROLE_HARVESTER } from "./constants";

export function runCreep(creep: Creep) {
  switch (creep.memory.role) {
    case ROLE_HARVESTER:
      runHarvester(creep);
      break;
  }
}
