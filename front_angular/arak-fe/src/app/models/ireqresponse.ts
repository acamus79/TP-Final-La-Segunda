export interface IReqResponse {
    status:     number;
    content:    Content[];
    totalPages: number;
    page:       number;
}

export interface Content {
    id:        number;
    brand:     string;
    model:     string;
    year:      number;
    rto:       null;
    gnc:       null;
    insurance: string;
    service:   Date;
    createdAt: Date;
    updatedAt: Date;
    typeId:    null;
    userId:    null;
}