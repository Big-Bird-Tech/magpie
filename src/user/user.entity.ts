import { Column, Table, TEntity, uuid } from '@bbt/bowerbird'

type UserEntity = User & TEntity

@Table('users')
export class User {
  public static schema: UserEntity

  constructor(
    @Column('externalId')
    public externalId: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public id: string = uuid()
  ) {}
}
