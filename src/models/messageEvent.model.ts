export interface MessageEventData {
  value: string
  Kds: string
  userId: string
  crudId: string
  type: TypeData
}

export enum TypeData {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
