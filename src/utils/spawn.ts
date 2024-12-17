import {
  getWorkerBody,
  ROLE_BUILDER,
  ROLE_HARVESTER,
  ROLE_UPGRADER,
} from "./constants";

export function runSpawn(spawn: StructureSpawn) {
  initSpawnStatus(spawn);
  activeSafeMode(spawn);
  createRoads(spawn);
  buildExtensions(spawn);
  spawnCreep(spawn);
}

function initSpawnStatus(spawn: StructureSpawn) {
  if (!spawn.memory.closestSourceId) {
    const source = spawn.pos.findClosestByPath(FIND_SOURCES);
    if (!source) return;
    spawn.memory.closestSourceId = source.id;
  }

  const countCreepData = [0, 0, 0];

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.spawnName === spawn.name) {
      countCreepData[creep.memory.role]++;
    }
  }

  spawn.memory.countHarvesters = countCreepData[ROLE_HARVESTER];
  spawn.memory.countUpgraders = countCreepData[ROLE_UPGRADER];
  spawn.memory.countBuilders = countCreepData[ROLE_BUILDER];
}

function buildExtensions(spawn: StructureSpawn) {
  const controller = spawn.room.controller;
  if (spawn.memory.extensionsBuilt || !controller || controller.level < 2)
    return;

  let x = [-2, 0, 2];
  let y = [-2, 0, 2];

  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < y.length; j++) {
      spawn.room
        .lookAt(spawn.pos.x + x[i], spawn.pos.y + y[j])
        .forEach((obj) => {
          if (obj.type === "constructionSite") {
            obj.constructionSite?.remove();
          } else if (obj.type === "structure") {
            obj.structure?.destroy();
          }
        });
      spawn.room.createConstructionSite(
        spawn.pos.x + x[i],
        spawn.pos.y + y[j],
        STRUCTURE_EXTENSION
      );
    }
  }

  spawn.memory.extensionsBuilt = true;
}

function activeSafeMode(spawn: StructureSpawn) {
  const controller = spawn.room.controller;
  if (!controller) return;
  if (controller.safeModeAvailable && !controller.safeMode) {
    controller.activateSafeMode();
  }
}

function createRoads(spawn: StructureSpawn) {
  if (!spawn.memory.pathToClosestSource && spawn.memory.closestSourceId) {
    const source = Game.getObjectById(spawn.memory.closestSourceId);
    const path = spawn.pos.findPathTo(source!);
    for (let i = 0; i < path.length - 1; i++) {
      const coordinate = path[i];
      spawn.room.createConstructionSite(
        coordinate.x,
        coordinate.y,
        STRUCTURE_ROAD
      );
    }
    spawn.memory.pathToClosestSource = true;
  }

  if (!spawn.memory.pathToController) {
    if (!spawn.room.controller) return;
    const path = spawn.pos.findPathTo(spawn.room.controller);
    for (let i = 0; i < path.length - 1; i++) {
      const coordinate = path[i];
      spawn.room.createConstructionSite(
        coordinate.x,
        coordinate.y,
        STRUCTURE_ROAD
      );
    }
    spawn.memory.pathToController = true;
  }
}

function spawnCreep(spawn: StructureSpawn) {
  const { countHarvesters, countUpgraders, closestSourceId } = spawn.memory;
  if (!closestSourceId) return;

  if (countHarvesters != undefined && countHarvesters < 2) {
    spawn.spawnCreep(getWorkerBody(spawn.room), `harvester-${Game.time}`, {
      memory: {
        role: ROLE_HARVESTER,
        spawnName: spawn.name,
        sourceId: closestSourceId,
      },
    });
    return;
  }

  if (countUpgraders != undefined && countUpgraders == 0) {
    spawn.spawnCreep(getWorkerBody(spawn.room), `upgrader-${Game.time}`, {
      memory: {
        role: ROLE_UPGRADER,
        spawnName: spawn.name,
        sourceId: closestSourceId,
      },
    });
    return;
  }

  if (
    spawn.memory.countBuilders != undefined &&
    spawn.memory.countBuilders < 2
  ) {
    spawn.spawnCreep(getWorkerBody(spawn.room), `builder-${Game.time}`, {
      memory: {
        role: ROLE_BUILDER,
        spawnName: spawn.name,
        sourceId: closestSourceId,
      },
    });
  }
}
