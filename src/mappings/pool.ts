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

  // let participantEntity = PoolParticipant.load(evtPoolInfo.transaction.hash.toHex())

  // if (!participantEntity) {
  //   participantEntity = new PoolParticipant(evtPoolInfo.transaction.hash.toHex())
  // }

  // participantEntity.user = evtPoolInfo.params.initiator;
  // participantEntity.balance = evtPoolInfo.params.value;
  // entity.participant = participantEntity.id;
  // // entity.participant = [participantEntity.id];
  // participantEntity.save()
  entity.save()
}

// export function handlePoolCreation(event: PoolCreation): void {}
