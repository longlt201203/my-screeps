export function isSourceSafe(source: Source) {
  const room = source.room;
  const objs = room.lookAtArea(
    source.pos.y - 3,
    source.pos.x - 3,
    source.pos.y + 3,
    source.pos.x + 3,
    true
  );

  for (const obj of objs) {
    if (obj.type === "creep" && !obj.creep?.my) {
      return false;
    }
  }

  return true;
}

export function availableSlots(source: Source) {
  const room = source.room;
  const objs = room.lookAtArea(
    source.pos.y - 2,
    source.pos.x - 2,
    source.pos.y + 2,
    source.pos.x + 2,
    true
  );

  let count = 0;
  for (const obj of objs) {
    if (obj.type === "terrain" && obj.terrain !== "wall") {
      count++;
    }

    if (obj.type === "creep") {
      count++;
    }
  }

  return 25 - count;
}

export function findHarvestableSource(room: Room) {
  const sources = room.find(FIND_SOURCES);
  for (const source of sources) {
    if (isSourceSafe(source) && availableSlots(source) > 0) {
      return source;
    }
  }
  return null;
}
