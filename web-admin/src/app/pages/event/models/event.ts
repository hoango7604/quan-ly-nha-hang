export enum EventState {
	// PENDING = 'PENDING',
	// OPEN = 'OPEN',
	// CLOSED = 'CLOSED',
	INACTIVE = 'Inactive',
	ONPREPARE = 'On Prepare',
	INPROGRESS = 'In Progress',
	FINISHED = 'Finished',
}

export class Event {
	public id: string;
	public name: string;
	public place: string;
	public eventState: EventState;
	public startTime: Date;
	public endTime: Date;
	public required: boolean;
	public useKiosk: boolean;
}
