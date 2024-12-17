import { runRoomStageInit } from "@core/room.stage1";
import {
  MIN_HARVESTER,
  MIN_UPGRADER,
  ROLE_HARVESTER,
  ROLE_UPGRADER,
  ROOM_STAGE_INIT,
} from "./constants";
import { getAvailableSlots } from "./source";

const runMap = [runRoomStageInit];

export function runRoom(room: Room) {
  initRoomStatus(room);
  const stage = room.memory.stage || ROOM_STAGE_INIT;
  runMap[stage](room);
}

function calculateMaxHarvesters(room: Room) {
  const sources = room.find(FIND_SOURCES);
  let total = 0;
  for (const source of sources) {
    total += getAvailableSlots(source);
  }
  return total;
}

function initRoomStatus(room: Room) {
  if (room.memory.maxHarvesters === undefined) {
    room.memory.maxHarvesters = calculateMaxHarvesters(room);
  }
  let totalCreeps = 0;
  let countHarvesters = 0;
  let countUpgraders = 0;

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.room.name === room.name) {
      totalCreeps++;
      switch (creep.memory.role) {
        case ROLE_UPGRADER:
          countUpgraders++;
          break;
        case ROLE_HARVESTER:
          countHarvesters++;
          break;
      }
    }
  }

  room.memory.totalCreeps = totalCreeps;
  room.memory.countHarvesters = countHarvesters;
  room.memory.countUpgraders = countUpgraders;
}

export function getTopPriorityJob(room: Room) {
  const { totalCreeps, countHarvesters, countUpgraders, maxHarvesters } =
    room.memory;

  if (
    totalCreeps != undefined &&
    countHarvesters != undefined &&
    countUpgraders != undefined &&
    maxHarvesters != undefined
  ) {
    if (countHarvesters < MIN_HARVESTER) return ROLE_HARVESTER;

    if (countUpgraders < MIN_UPGRADER) return ROLE_UPGRADER;

    if (countHarvesters < maxHarvesters) return ROLE_HARVESTER;
  }

  return undefined;
}
