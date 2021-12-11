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

  let participantEntity = PoolParticipant.load(entity.id)

  if (!participantEntity) {
    participantEntity = new PoolParticipant(entity.id)
  }

  // entity.participant = participantEntity.id;
  participantEntity.user = evtPoolInfo.params.initiator;
  participantEntity.balance = evtPoolInfo.params.value;
  participantEntity.pool = [entity.id];

  entity.participant = [participantEntity.id];
  entity.save()
  // participantEntity.save()
}

// export function handlePoolCreation(event: PoolCreation): void {}
