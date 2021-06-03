import { Column, Table, TEntity, uuid } from '@bbt/bowerbird'

type FeatureEntity = Feature & Omit<TEntity, 'id'>

@Table('features')
export class Feature {
  public static schema: FeatureEntity

  constructor(
    @Column('name')
    public name: string,
    @Column('state')
    public state: boolean,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public id: string = uuid(),
  ) {}
}
