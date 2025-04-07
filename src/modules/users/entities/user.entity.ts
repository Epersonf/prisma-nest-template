import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { User } from '@prisma/client';
import { CommonEntity } from "src/core/base/interfaces/common-entity.int";

@JsonObject()
export class UserEntity implements User, CommonEntity {
  @JsonProperty()
  public id: string;
  getId(): string {
    return this.id;
  }

  @JsonProperty()
  public name: string;
  public setName(name: string) {
    this.name = name;
  }

  @JsonProperty()
  public email: string;
  public setEmail(email: string) {
    this.email = email;
  }

  @JsonProperty()
  public password: string;

  @JsonProperty()
  public enterpriseId: string;

  @JsonProperty({
    beforeDeserialize: (value) => value.toISOString(),
    beforeSerialize: (value) => value?.toISOString(),
  })
  public createdAt: Date;

  @JsonProperty({
    beforeDeserialize: (value) => value.toISOString(),
    beforeSerialize: (value) => value?.toISOString(),
  })
  public updatedAt: Date;

  constructor(params?: {
    id?: string,
    name: string,
    email: string,
    password?: string,
    empresaId: string,
    createdAt?: Date,
    updatedAt?: Date
  }) {
    if (!params) return;
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.enterpriseId = params.empresaId
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
