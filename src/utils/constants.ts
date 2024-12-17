export const WORKER_0_BODY = [WORK, MOVE, MOVE, CARRY];
export const WORKER_1_BODY = [WORK, MOVE, MOVE, CARRY, WORK];
export const WORKER_2_BODY = [WORK, MOVE, MOVE, CARRY, WORK, CARRY, MOVE];

export function calculateBodyParts(body: BodyPartConstant[]) {
  let cost = 0;
  for (const part of body) {
    cost += BODYPART_COST[part];
  }
  return cost;
}

export function getWorkerBody(room: Room) {
  const e = room.energyCapacityAvailable;
  if (e >= calculateBodyParts(WORKER_2_BODY)) {
    return WORKER_2_BODY;
  } else if (e >= calculateBodyParts(WORKER_1_BODY)) {
    return WORKER_1_BODY;
  } else {
    return WORKER_0_BODY;
  }
}

export const ROLE_HARVESTER = 0;
export const ROLE_UPGRADER = 1;
export const ROLE_BUILDER = 2;

export const MY_VISUALIZE_PATH_STYLE: MoveToOpts["visualizePathStyle"] = {
  stroke: "#ffaa00",
  lineStyle: "dashed",
  opacity: 0.5,
};
