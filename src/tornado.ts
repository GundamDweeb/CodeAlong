import { log } from "@graphprotocol/graph-ts";
import {
  Deposit as DepositEvent,
  WithdrawCall,
  Withdrawal as WithdrawalEvent
} from "../generated/Tornado/Tornado"
import { Deposit, Leaf, Withdrawal } from "../generated/schema"
import {getOrCreateAccount, createDeposit, createLeaf, createWithdrawal} from "./helper";

export function handleDeposit(event: DepositEvent): void {
    getOrCreateAccount(event.transaction.from);
    createDeposit(event);
    createLeaf(event);
}

export function handleWithdrawal(event: WithdrawalEvent): void {
    getOrCreateAccount(event.params.to);
    createWithdrawal(event);
    log.info("WITHDRAWAL VALUE = {}", [event.transaction.value.toString()])
}


export function handleWithdrawalCall(call: WithdrawCall): void {
  log.info("ROOT", [call.inputs.input[0].toString()])
    let leaf = Leaf.load(call.inputs.input[0].toString());
    if(!leaf) {
      log.info("LEAF NOT FOUND", [call.transaction.hash.toHexString()])
    } else {
      let withdrawal = Withdrawal.load(call.transaction.hash);
      if(withdrawal) {
        leaf.withdrawal = call.transaction.hash
        leaf.save()
      }
      else{ 
        log.info("WITHDRAWALAL DOESNT EXIST = {}", [call.transaction.hash.toHexString()])
      }
    }

}

