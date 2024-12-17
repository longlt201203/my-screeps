declare interface CreepMemory {
  role: number;
  upgrading?: boolean;
  building?: boolean;
  sourceId?: Id<Source>;
  spawnName: string;
}

declare interface SpawnMemory {
  totalCreeps?: number;
  countHarvesters?: number;
  countUpgraders?: number;
  countBuilders?: number;
  closestSourceId?: Id<Source>;
  pathToClosestSource?: boolean;
  pathToController?: boolean;
  extensionsBuilt?: boolean;
}
