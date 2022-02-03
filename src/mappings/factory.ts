import {
  PoolCreation
} from "../../generated/PoolFactory/PoolFactory"
import { Pool } from "../../generated/schema"
import { MetaversepadTemplate } from "../../generated/templates"
import { BigInt } from "@graphprotocol/graph-ts";

export function handlePoolCreation(event: PoolCreation): void {
  let poolEntity = Pool.load(event.params.poolAddress.toHex())

  if (!poolEntity) {
    poolEntity = new Pool(event.params.poolAddress.toHex())
  }

  poolEntity.createdAt = event.params.timestamp
  poolEntity.startedAt = event.params.saleStartTime
  poolEntity.endedAt = event.params.saleEndTime
  poolEntity.participants = event.params.totalParticipants
  poolEntity.totalRaised = BigInt.fromI32(0)

  MetaversepadTemplate.create(event.params.poolAddress)

  poolEntity.save()
}