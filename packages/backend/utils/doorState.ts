let IS_DOOR_OPEN = false;

export function openDoor() {
  IS_DOOR_OPEN = true;
}

export function closeDoor() {
  IS_DOOR_OPEN = false;
}

export function getDoorState() {
  return IS_DOOR_OPEN ? 'OPEN' : 'CLOSED';
}
