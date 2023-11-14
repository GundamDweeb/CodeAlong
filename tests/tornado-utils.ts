import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { Deposit, Withdrawal } from "../generated/Tornado/Tornado"

export function createDepositEvent(
  root: BigInt,
  hashPairings: Array<BigInt>,
  pairDirection: Array<i32>
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("root", ethereum.Value.fromUnsignedBigInt(root))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "hashPairings",
      ethereum.Value.fromUnsignedBigIntArray(hashPairings)
    )
  )
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "pairDirection",
      ethereum.Value.fromI32Array(pairDirection)
    )
  )

  return depositEvent
}

export function createWithdrawalEvent(
  to: Address,
  nullifierHash: BigInt
): Withdrawal {
  let withdrawalEvent = changetype<Withdrawal>(newMockEvent())

  withdrawalEvent.parameters = new Array()

  withdrawalEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam(
      "nullifierHash",
      ethereum.Value.fromUnsignedBigInt(nullifierHash)
    )
  )

  return withdrawalEvent
}
