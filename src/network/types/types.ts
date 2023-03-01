// !!!: these types need to be properly organized

import Asset from "../common/assets/asset"

export interface Poll {
  id: number
  status: PollStatusRaw
  title: string
  description: string
  link: string
  yes_votes: string
  no_votes: string
  abstain_votes: string
  end_time: number
  creator: string
  deposit_amount: string
}

export interface PollData {
  title: string
  description: string
  link: string
  deposit: string
}

export type CreatePollInput = {
  title: string
  description: string
  information: string | undefined
  deposit: number
}

export interface CreatedPollInfo {
  txfee: string
  pollId: number
  txhash: string
  title: string
  information: undefined | string
  description: string
}

export interface PollVoteRaw {
  voter: string
  vote: string
  balance: string
}

export interface PollVote {
  voter: string
  vote: VoteOption
  balance: Asset
}

export enum VoteOption {
  YES = "yes",
  NO = "no",
  ABSTAIN = "abstain",
}

export interface CastVoteInput {
  id: number
  answer: VoteOption
  deposit: Asset
}

export interface CastVoteInfo {
  txfee: string
  pollId: number
  txhash: string
  answer: VoteOption
}

export enum PollStatusRaw {
  inProgress = "in_progress",
  passed = "passed",
  rejected = "rejected",
  executed = "executed",
  expired = "expired",
}

export enum PollStatusAll {
  all = "all",
}

export const PollStatusFilterObj = Object.assign(
  {},
  PollStatusRaw,
  PollStatusAll
)
export type PollStatusFilter = PollStatusRaw | PollStatusAll
