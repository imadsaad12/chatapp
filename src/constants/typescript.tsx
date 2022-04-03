export type LeftSection={
    status:"available" | "busy",
    image:string,
    name:string,
    contacts:Contact[]
}
export type Login={
    username:string,
    password:string
}
export type User={
    username:string,
    password:string,
    image:string,
    _id:any,
    contacts:any
}
export type Contact={
    username:string,
    roomId?:string,
    _id?:any,
    image?:string
}