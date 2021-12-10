import {
    PoolCreation
  } from "../../generated/PoolFactory/PoolFactory"
import {
  FundPool
} from "../../generated/templates/MetaversepadTemplate/Metaversepad"
import { Factory, Pool, PoolParticipant } from "../../generated/schema"

export function handleFundPool(evtPoolInfo: FundPool): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Pool.load(evtPoolInfo.address.toHexString())
  let participantEntity = PoolParticipant.load(evtPoolInfo.params.initiator.toHexString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Pool(evtPoolInfo.address.toHexString())
    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }
  if (!participantEntity) {
    participantEntity = new PoolParticipant(evtPoolInfo.params.initiator.toHexString())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters

  // Entities can be written to the store with `.save()`

  participantEntity.balance = evtPoolInfo.params.value;
//   participantEntity.pool = entity;
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.name(...)
  // - contract.owner(...)
}

// export function handlePoolCreation(event: PoolCreation): void {}
