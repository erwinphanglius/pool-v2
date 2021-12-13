import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  PoolCreation
} from "../../generated/PoolFactory/PoolFactory"
import {
  FundPool
} from "../../generated/templates/MetaversepadTemplate/Metaversepad"
import { Factory, User, PoolByUser, Pool } from "../../generated/schema"

// export function bindToUser(address: Address, poolAddress: Address, newBalance: BigInt): void {
//   let id = address.toHexString();
//   let user = User.load(id);
//   if (user == null) {
//     user = new User(id);
//     user.pool = poolAddress;
//     user.balance = BigInt.fromI32(0);
//   }
//   user.balance = user.balance.plus(newBalance)
//   user.save();
// }

// export function loadOrCreatePool(poolAddress: Address): Pool {
//   let pool = Pool.load(poolAddress.toHex())
//   return pool as Pool
// }

export function handleFundPool(evtPoolInfo: FundPool): void {
  let entity = PoolByUser.load(evtPoolInfo.transaction.hash.toHex())
  let userEntity = User.load(evtPoolInfo.params.initiator.toHex())
  let poolEntity = Pool.load(evtPoolInfo.address.toHex())
  // let poolWithUserEntity = PoolWithUser.load(evtPoolInfo.address.toHex() + "-" + evtPoolInfo.params.initiator.toHex())
  
  if (!entity) {
    entity = new PoolByUser(evtPoolInfo.transaction.hash.toHex())
  }
  if (!userEntity) {
    userEntity = new User(evtPoolInfo.params.initiator.toHex())
  }
  if (!poolEntity) {
    poolEntity = new Pool(evtPoolInfo.address.toHex())
  }
  // if (!poolWithUserEntity) {
  //   poolWithUserEntity = new PoolWithUser(evtPoolInfo.params.initiator.toHex() + "-" + evtPoolInfo.address.toHex())
  // }

  entity.poolAddress = evtPoolInfo.address;
  entity.user = evtPoolInfo.params.initiator;
  entity.value = evtPoolInfo.params.value;
  entity.save()
  poolEntity.save()

  userEntity.totalFundAllPool = userEntity.totalFundAllPool.plus(evtPoolInfo.params.value)

  let userPool = userEntity.pool;
  userPool.push(poolEntity.id)
  userEntity.pool = userPool;
  userEntity.save()

  // poolWithUserEntity.value = poolWithUserEntity.value.plus(evtPoolInfo.params.value);

  // poolWithUserEntity.save()
}
