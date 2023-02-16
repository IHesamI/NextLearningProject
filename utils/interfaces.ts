
export interface prop {
    projectid: number,
    id: number,
    title: string,
    freelancerid: number,
    freelancer: { username: string },
}

export interface chatmessage {
    content: string,
    user:string,

}

export interface project {
    id: number;
    title: string;
    propose: prop[];
    chatmessages?: chatmessage[];
    choosenproposeid?: number;
};
