import {
  PoolCreation
} from "../../generated/PoolFactory/PoolFactory"
import {
  FundPool
} from "../../generated/templates/MetaversepadTemplate/Metaversepad"
import { Factory, User, PoolByUser } from "../../generated/schema"

export function handleFundPool(evtPoolInfo: FundPool): void {
  let entity = PoolByUser.load(evtPoolInfo.address.toHexString())

  if (!entity) {
    entity = new PoolByUser(evtPoolInfo.address.toHexString())
  }

  entity.poolAddress = evtPoolInfo.address
  entity.user = evtPoolInfo.params.initiator;
  entity.value = evtPoolInfo.params.value;

  // let participantEntity = PoolParticipant.load(evtPoolInfo.params.initiator.toHexString())

  // if (!participantEntity) {
  //   participantEntity = new PoolParticipant(evtPoolInfo.params.initiator.toHexString())
  // }

  // participantEntity.balance = evtPoolInfo.params.value;
  // participantEntity.balance = participantEntity.balance.plus(evtPoolInfo.params.value);
  // participantEntity.user = evtPoolInfo.params.initiator;

  // entity.participant.push(participantEntity.id)

  // participantEntity.save()  
  entity.save()
}

// export function handlePoolCreation(event: PoolCreation): void {}