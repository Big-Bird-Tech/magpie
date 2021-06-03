import { Column, Table, TEntity, uuid } from '@bbt/bowerbird'

type FeatureUserEntity = FeatureUser & TEntity

@Table('features_users')
export class FeatureUser {
  public static schema: FeatureUserEntity

  constructor(
    @Column('userId')
    public userId: string,
    @Column('featureId')
    public featureId: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public id: string = uuid()
  ) {}
}
