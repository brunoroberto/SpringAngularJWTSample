export enum MessageType {
    SUCCESS,
    ERROR
};

export class Message {
    type: MessageType;
    content: string;

    constructor(type: MessageType, content: string) {
        this.type = type;
        this.content = content;
    }
}