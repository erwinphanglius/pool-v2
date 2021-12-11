import {
    PoolCreation
  } from "../../generated/PoolFactory/PoolFactory"
import {
  FundPool
} from "../../generated/templates/MetaversepadTemplate/Metaversepad"
import { Factory, Pool, PoolParticipant } from "../../generated/schema"

export function handleFundPool(evtPoolInfo: FundPool): void {
  let entity = Pool.load(evtPoolInfo.address.toHexString())
  
  if (!entity) {
    entity = new Pool(evtPoolInfo.address.toHexString())
  }

  let participantEntity = PoolParticipant.load(evtPoolInfo.params.initiator.toHexString())

  if (!participantEntity) {
    participantEntity = new PoolParticipant(evtPoolInfo.params.initiator.toHexString())
  }

  participantEntity.balance = evtPoolInfo.params.value;
  // participantEntity.pool = entity.id;

  entity.save()
  participantEntity.save()
}

// export function handlePoolCreation(event: PoolCreation): void {}
