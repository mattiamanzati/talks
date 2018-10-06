
export interface IUser{
    name: string
    age: number
  }

export interface ApiRoutes2{
    "/users": { params: [], response: IUser[]}
    "/user/:id": { params: [number], response: IUser}
}