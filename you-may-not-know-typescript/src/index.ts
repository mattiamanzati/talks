/**
                   YOU MAY NOT KNOW
  _____                 ____            _       _   
 |_   _|   _ _ __   ___/ ___|  ___ _ __(_)_ __ | |_ 
   | || | | | '_ \ / _ \___ \ / __| '__| | '_ \| __|
   | || |_| | |_) |  __/___) | (__| |  | | |_) | |_ 
   |_| \__, | .__/ \___|____/ \___|_|  |_| .__/ \__|
       |___/|_|                          |_|     
             ( OR WEIRD THINGS TS CAN DO )
 */

// = Property Accessing =
type A1 = {
    a: 1,
    b: 2,
    c: 3
  }
  type T1 = A1["a"]
  
  // = Real use case =
  import {IUser} from "./routes" 
  
  export interface ApiRoutes{
    "/users": { params: [], response: IUser[]}
    "/user/:id": { params: [number], response: IUser}
  }
  
  declare function fetch<U extends keyof ApiRoutes>(url: U, ...args: ApiRoutes[U]["params"]): ApiRoutes[U]["response"]
  
  const data = fetch("/users")
  
  // - Declaration Merging -
  import {ApiRoutes2} from "./routes"
  
  declare module "./routes"{
    export interface ApiRoutes2{
      "/version": { params: [], response: number}
    }
  }
  
  declare function fetch2<U extends keyof ApiRoutes2>(url: U, ...args: ApiRoutes2[U]["params"]): ApiRoutes2[U]["response"]
  
  const data2 = fetch2("/version")
  
  // = No intersection =
  
  type NoIntersection<A, B> = A & {[K in Exclude<keyof A, keyof B>]: never}
  
  declare function merge<A extends {[K: string]: any}, B extends {[K: string]: any} & {[K in keyof A]?: never}>(a: A, b: B): A & B
  
  const a = merge({
    a: 1,
    b: 2
  }, {
    c: 4
  })
  
  // = TypeLevel If = 
  
  type If<B extends "true" | "false", T1, T2> = {
    true: T1,
    false: T2
  }[B]
  
  type Test = If<"true", 1, 2>
  type Test2 = If<"false", 1, 2>
  
  // = Madness =
  
  type ZeroTuple = [];
  type PrependTuple<A, T> = T extends Array<any>
    ? (((a: A, ...b: T) => void) extends (...a: infer I) => void ? I : [])
    : [];
  type TupleLength<T extends Array<any>> = T["length"];
  
  type NumberToTuple<N extends number, L extends Array<any> = ZeroTuple> = {
    true: L;
    false: NumberToTuple<N, PrependTuple<1, L>>;
  }[TupleLength<L> extends N ? "true" : "false"];
  
  type Increment<N extends number> = TupleLength<PrependTuple<1, NumberToTuple<N>>>;
  
  
  type T = Increment<42>