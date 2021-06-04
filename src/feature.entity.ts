import { Column, Entity, Table, TEntity } from "@bbt/bowerbird";
import { v4 as uuid } from "uuid";

type FeaturesEntitiy = TEntity & Features;

@Table("features")
export class Features extends Entity {
  public static schema: FeaturesEntitiy;

  constructor(
    @Column("name")
    public name: string,
    @Column("state")
    public state: boolean,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public id: string = uuid()
  ) {
    super(createdAt, updatedAt, id);
  }
}
