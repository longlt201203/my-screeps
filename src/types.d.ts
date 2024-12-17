declare interface CreepMemory {
  role?: number;
  transfering?: boolean;
  sourceId?: Id<Source>;
  upgrading?: boolean;
}

declare interface RoomMemory {
  stage?: number;
  totalCreeps?: number;
  countHarvesters?: number;
  maxHarvesters?: number;
  countUpgraders?: number;
}
