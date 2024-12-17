export function getAvailableSlots(source: Source) {
  const room = source.room;
  const objs = room.lookAtArea(
    source.pos.y - 1,
    source.pos.x - 1,
    source.pos.y + 1,
    source.pos.x + 1,
    true
  );
  let count = 0;
  objs.forEach((obj) => {
    if (obj.type === "terrain" && obj.terrain === "wall") {
      count++;
    }
    if (obj.type === "creep") {
      count++;
    }
  });
  return 9 - count;
}

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
