import { JsonSerializer } from "typescript-json-serializer";

export class DefaultSerializer {

  private static jsonSerializer = new JsonSerializer();
  
  public static serializeObject<T>(object: T): any {
    return this.jsonSerializer.serializeObject(object as object);
  }

  public static deserializeObject<T extends object>(object: T, type: new () => T): object {
    return this.jsonSerializer.deserializeObject(object, type);
  }

  public static serializeObjectArray<T>(array: T[]): any[] {
    return this.jsonSerializer.serializeObjectArray(array as object[]);
  }

  public static deserializeObjectArray<T extends object>(array: T[], type: new () => T): T[] {
    return this.jsonSerializer.deserializeObjectArray<T>(array, type);
  }
}