import { findHarvestableSource } from "./source";

export function harvestEnergy(creep: Creep) {
  let source: Source | null = null;
  if (creep.memory.sourceId) source = Game.getObjectById(creep.memory.sourceId);
  if (!source) {
    source = findHarvestableSource(creep.room);
    if (source) {
      creep.memory.sourceId = source.id;
    }
  }
  if (!source) {
    return true;
  }
}
