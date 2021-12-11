import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  PoolCreation
} from "../../generated/PoolFactory/PoolFactory"
import {
  FundPool
} from "../../generated/templates/MetaversepadTemplate/Metaversepad"
import { Factory, User, PoolByUser } from "../../generated/schema"

// export function bindToUser(address: Address, pool: PoolByUser): void {
//   let id = address.toHexString();
//   let user = User.load(id);
//   if (user == null) {
//     user = new User(id);
//     user.pool = [pool.id];
//   }
//   user.save();
// }

export function handleFundPool(evtPoolInfo: FundPool): void {
  let entity = PoolByUser.load(evtPoolInfo.transaction.hash.toHex())

  if (!entity) {
    entity = new PoolByUser(evtPoolInfo.transaction.hash.toHex())
  }

  // entity.poolAddress = evtPoolInfo.address;
  entity.user = evtPoolInfo.params.initiator;
  entity.value = entity.value.plus(evtPoolInfo.params.value);

  // let id = address.toHexString();
  // PoolByUser.load(User)

  // userentity.pool = []

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