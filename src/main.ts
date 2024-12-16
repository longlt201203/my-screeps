export function loop() {
  Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], `Test_${Game.time}`);
}
