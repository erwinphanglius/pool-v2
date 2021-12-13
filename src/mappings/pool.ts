import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  PoolCreation
} from "../../generated/PoolFactory/PoolFactory"
import {
  FundPool
} from "../../generated/templates/MetaversepadTemplate/Metaversepad"
import { Factory, User, Pool, UserInPool } from "../../generated/schema"

export function handleFundPool(evtPoolInfo: FundPool): void {
  // let entity = PoolByUser.load(evtPoolInfo.transaction.hash.toHex())
  let userEntity = User.load(evtPoolInfo.params.initiator.toHex())
  let poolEntity = Pool.load(evtPoolInfo.address.toHex())
  let userInPoolEntity = UserInPool.load(evtPoolInfo.params.initiator.toHex() + "-" + evtPoolInfo.address.toHex())
  
  // if (!entity) {
  //   entity = new PoolByUser(evtPoolInfo.transaction.hash.toHex())
  // }
  if (!userEntity) {
    userEntity = new User(evtPoolInfo.params.initiator.toHex())
  }
  if (!poolEntity) {
    poolEntity = new Pool(evtPoolInfo.address.toHex())
  }
  if (!userInPoolEntity) {
    userInPoolEntity = new UserInPool(evtPoolInfo.params.initiator.toHex() + "-" + evtPoolInfo.address.toHex())
  }

  // entity.poolAddress = evtPoolInfo.address;
  // entity.user = evtPoolInfo.params.initiator;
  // entity.value = evtPoolInfo.params.value;
  // entity.save()
  
  userEntity.totalFundAllPool = userEntity.totalFundAllPool.plus(evtPoolInfo.params.value)

  let userPool = userEntity.pool;
  userPool.push(poolEntity.id)
  userEntity.pool = userPool;
  userEntity.save()
  
  userInPoolEntity.pool = evtPoolInfo.address;
  userInPoolEntity.user = evtPoolInfo.params.initiator;
  userInPoolEntity.value = userInPoolEntity.value.plus(evtPoolInfo.params.value);
  
  poolEntity.save()
  userInPoolEntity.save() 
}
