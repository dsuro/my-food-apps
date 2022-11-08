export enum RemoteEventTypes{
    NAVIGATION=1,
    OPEN_TAB=2,
    DATA_SEND=3
}

export class RemoteMfeEvent {
    type:RemoteEventTypes;
    data?:any;
    source?:string;
    destination?:string;
}
