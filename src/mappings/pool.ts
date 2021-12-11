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

  let participantEntity = PoolParticipant.load(evtPoolInfo.transaction.hash.toHex())

  if (!participantEntity) {
    participantEntity = new PoolParticipant(evtPoolInfo.transaction.hash.toHex())
  }

  participantEntity.balance = evtPoolInfo.params.value;
  // participantEntity.balance = participantEntity.balance.plus(evtPoolInfo.params.value);
  participantEntity.user = evtPoolInfo.params.initiator;
  
  entity.participant?.push(participantEntity.id)
  participantEntity.save()
  
  entity.save()
}

// export function handlePoolCreation(event: PoolCreation): void {}