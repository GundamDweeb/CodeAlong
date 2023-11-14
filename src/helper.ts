import {Address, ethereum} from "@graphprotocol/graph-ts";
import {Account, Deposit, Leaf, Withdrawal} from "../generated/schema";
import {
    Deposit as DepositEvent,
    Withdrawal as WithdrawalEvent
  } from "../generated/Tornado/Tornado"
export function getOrCreateAccount(userAddress: Address): Account {
    let account = Account.load(userAddress.toHexString());
    if(!account) {
        account = new Account(userAddress.toHexString());
        account.save()
    }
    return account;
}

export function createDeposit(event: DepositEvent): void {
    let entity = new Deposit(
        event.transaction.hash.concatI32(event.logIndex.toI32())
      )
      entity.root = event.params.root
      entity.amount = event.transaction.value
      entity.sender = event.transaction.from.toHexString()
      entity.hashPairings = event.params.hashPairings
      entity.pairDirection = event.params.pairDirection
    
      entity.blockNumber = event.block.number
      entity.blockTimestamp = event.block.timestamp
      entity.transactionHash = event.transaction.hash
    
      entity.save()
}

export function createWithdrawal(event: WithdrawalEvent): void {
    let entity = new Withdrawal(
        event.transaction.hash
      )
      entity.to = event.params.to.toHexString()
      entity.nullifierHash = event.params.nullifierHash
    
      entity.blockNumber = event.block.number
      entity.blockTimestamp = event.block.timestamp
      entity.transactionHash = event.transaction.hash
    
      entity.save()
}


export function createLeaf(event: DepositEvent): void {
    let entity = new Leaf(
        event.params.root.toString()
      )
      entity.deposit = event.transaction.hash.concatI32(event.logIndex.toI32());
      entity.sender = event.transaction.from.toHexString()
      entity.amount = event.transaction.value;
    
      entity.root =  event.params.root
      entity.save()
}