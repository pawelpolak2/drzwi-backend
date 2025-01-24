const DoorState = {
  CLOSED: 'CLOSED',
  OPEN_PENDING: 'OPEN_PENDING',
} as const;
type DoorState = typeof DoorState[keyof typeof DoorState];

let DOOR_STATE: DoorState = DoorState.CLOSED;

export function openDoor() {
  DOOR_STATE = DoorState.OPEN_PENDING;
}

export function reportDoorOpened() {
  DOOR_STATE = DoorState.CLOSED;
}

export function getDoorState() {
  return DOOR_STATE;
}
