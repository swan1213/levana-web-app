import { LocaleStrings, LocaleStrings2 } from "./types"

const locale2 /*: LocaleStrings2*/ = {
  layout: {
    direction: "ltr",
  },
  generic: {
    dismiss: "Dismiss",
    loading: "Loading",
  },
  timeline: {
    d1: "1D",
    w1: "1W",
    m1: "1M",
    y1: "1Y",
  },
  form: {
    balance: {
      title: "Balance: {balance}",
    },
    stats: {
      base: {
        title: "Price",
      },
      swap: {
        title: "Swap Fee",
      },
      fee: {
        title: "Transaction Fee",
      },
    },
    response: {
      loading: {
        title: "Loading",
      },
      success: {
        title: "Transaction succeeded",
      },
      failure: {
        title: "Transaction failed",
      },
    },
  },
  exchange: {
    title: "Exchange",
    form: {
      primaryAsset: {
        title: "From",
      },
      secondaryAsset: {
        title: "To",
      },
      slippage: {
        title: "Slippage Tolerance",
      },
      submit: {
        title: "Swap",
      },
    },
    stats: {
      realLeverage: {
        title: "Real Leverage",
      },
      targetLeverage: {
        title: "Target Leverage",
      },
      min: {
        title: "Min",
      },
      max: {
        title: "Max",
      },
    },
  },
  error: {
    levana: {
      transaction: "A transaction issue occurred.",
      query: "A query issue occurred.",
    },
    network: {
      internal: "That's strange, try again.",
      missingWallet: "Connect a wallet to continue.",
      insufficientFunds: "Insufficient funds.",
      transactionFailed: "A transaction issue occurred.",
    },
  },
  header: {
    exchange: {
      title: "Exchange",
    },
    farm: {
      title: "Farm",
    },
    trade: {
      title: "Trade",
    },
  },
  farm: {
    main: {
      title: "Stake LP tokens to earn",
      detail:
        "Liquidity provider tokens (LP tokens) are created and awarded to a user that deposits assets into a liquidity pool.",
      pool: {
        apr: {
          title: "APR",
          tip: "TODO:",
        },
        lp: {
          title: "Staked",
          tip: "TODO:",
        },
        lpTotal: {
          title: "Total Staked",
          tip: "TODO:",
        },
        earned: {
          title: "Earned",
          tip: "TODO:",
        },
        claim: {
          title: "Rewards",
        },
        open: {
          title: "Manage",
        },
      },
    },
    pool: {
      title: "Manage Pool",
      detail: "Add liquidity to farm or unstake your LP tokens",
      form: {
        provide: {
          title: "Provide",
        },
        unstake: {
          title: "Unstake",
        },
      },
    },
  },
  perps: {
    menu: {
      vault: {
        deposit: "Deposit",
        withdraw: "Withdraw",
        cancel: "Cancel",
      },
    },
    trade: {
      leftSidebar: {
        connect: "CONNECT WALLET",
        availableBalance: "Available Balance",
        overallAccountValue: "Overall Account Value",
        accumulativeFundingPayments: "Accumulative Funding Payments",
        netValueOfOpenPosition: "Net Value of Open Position",
        numberOfPositionsInLiquidityRisk:
          "Number of Positions in Liquidity Risk",
        deposit: "DEPOSIT",
        withdraw: "WITHDRAW",
        trade: "TRADE",
        additionalAssets:
          "Additional assets will be available on the Mainnet, coming soon!",
        riskFund: "RISK FUND",
        history: "HISTORY",
      },
      form: {
        short: "Short",
        long: "Long",
        amount: "Amount",
        leverage: "Leverage",
        size: "Position Size",
        slippage: "Slippage",
        submitButton: {
          title: "Place {type} Order",
        },
        submitDescription:
          "Your order will not be executed if there will be a slippage which is larger than your tolerance",
        stats: "Order Details",
      },
      table: {
        opened: "Opened At",
        value: "Position Value",
        type: "Type",
        entry: "Entry Price",
        ratio: "Margin Ratio",
        payments: "Accumulative Funding Payment",
        closeButton: {
          title: "Close",
        },
        addButton: {
          title: "Add Margin",
        },
        short: "Short",
        long: "Long",
        connect: "Connect to see your open positions",
      },
      stats: {
        markPrice: "Mark Price",
        spotPrice: "Spot Price",
        change: "Change (24h)",
        volume: "Volume (24h)",
        fundingRate: "Funding Rate",
      },
    },
    riskFund: {
      form: {
        stake: "Stake",
        unstake: "Unstake",
        button: {
          title: "Proceed",
        },
      },
      balance: {
        details: "TODO: ",
      },
    },
  },
  wallet: {
    dialog: {
      title: "Connect a Wallet",
    },
    connect: {
      title: "Connect",
    },
    disconnect: {
      title: "Disconnect",
    },
    options: {
      extension: {
        title: "Terra Station (extension)",
      },
      walletConnect: {
        title: "Terra Station (mobile)",
      },
    },
  },

  // --- outdated ---

  swap: {
    title: "Swap {name}",
    from: "From",
    to: "To",
  },
  dashboard: {
    header: {
      title: "Dashboard",
      subtitle: "Change a preset",
      description:
        "Welcome to Levana. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
    },
  },
  track: {
    title: "Track Tokens",
  },
  gov: {
    community: {
      title: "LVN",
      apr: {
        title: "APR",
        tooltip:
          "Annualized LVN staking return based on 15 days average of LVN distribution and staking ratio.\n\nReward is generated from protocol fee which occurs when collateral is withdrawn from borrow or short position.",
      },
      pollCount: {
        title: "Poll count",
        tooltip: "Total number of polls created",
      },
      totalStaked: {
        title: "Total staked",
        tooltip: "Total quantity of LVN tokens staked",
      },
      totalLocked: {
        title: "Total locked",
        tooltip: "Total quantity of LVN tokens locked to a poll",
      },
      rewards: {
        title: "Pending rewards",
        tooltip: "Total unclaimed voting rewards",
      },
    },
    stake: {
      title: "Staking",
      staked: "Staked",
      stakable: "Stakable",
      pendingRewards: "Claimable rewards",
      total: "Total",
      manageStake: "Manage Stake",
    },
    poll: {
      createModal: {
        complete: "Poll created!",
        title: "Title",
        description: "Description",
        link: "Information link",
        pollId: "Poll ID",
        txfee: "Tx fee",
        txhash: "Tx hash",
      },
      submit: {
        header: "Submit text poll",
        title: "Title",
        description: "Description",
        link: "Information link (optional)",
        deposit: "Deposit",
        depositTooltip:
          "Passing the quorum will return the deposit to the creator. Failure to pass quorum will distribute the deposit to all LVN stakers.",
        fee: "Tx Fee",
        feeTooltip: "Fee paid to execute this transaction",
        insufficientLvn: "Insufficient LVN for initial deposit",
        error: {
          title: {
            minLength: "Title must be longer than 4 bytes",
            required: "Required",
          },
          description: {
            minLength: "Description must be longer than 10 bytes",
            required: "Required",
          },
          information: {
            minLength: "Information must be longer than 10 bytes",
            required: "Required",
            pattern: "Must provide a valid URL",
          },
          deposit: {
            minLength: "TODO",
            required: "TODO",
          },
        },
      },
      vote: {
        insufficientLvn: "Insufficient LVN for voting",
        submit: "Submit",
      },
      status: {
        in_progress: "In progress",
        details: "Poll details",
        creator: "Creator",
        endTime: "End time",
        vote: "Vote",
        link: "Link",
        voteDetails: {
          title: "Vote details",
          yes: "YES",
          no: "NO",
          abstain: "ABSTAIN",
          voter: "VOTER",
          vote: "VOTE",
          balance: "Balance",
        },
      },
      list: {
        filter: {
          all: "All",
          in_progress: "In progress",
          passed: "Passed",
          rejected: "Rejected",
          executed: "Executed",
        },
      },
      voteModal: {
        complete: "Complete!",
        id: "Poll id",
        answer: "Answer",
        close: "Close",
      },
      manageStake: {
        insufficientLvn: "Insufficient LVN for staking",
        protocolLvn:
          "Protocol fee paid from withdrawing collateral is distributed to MIR stakers and increases staked LVN",
        txFee: "Fee paid to execute this transaction",
        button: {
          stake: "Stake",
          unstake: "Unstake",
        },
      },
    },
    manageStake: {
      error: {
        amount: {
          required: "Required",
          max: "Insufficient balance",
        },
      },
    },
  },
}

export default locale2

/*
const locale: LocaleStrings = {
  direction: "ltr",

  loading: "Loading",

  "dashboard.header.title": "Dashboard",
  "dashboard.header.subtitle": "Change a preset",
  "dashboard.header.description":
    "Welcome to Levana. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",

  "swap.title": "Swap {name}",
  "swap.from": "From",
  "swap.to": "To",

  "timeline.d1": "1D",
  "timeline.w1": "1W",
  "timeline.m1": "1M",
  "timeline.y1": "1Y",

  "track.title": "Track Tokens",

  "gov.community.title": "LVN",

  "gov.community.title.apr": "APR",
  "gov.community.tooltip.apr":
    "Annualized LVN staking return based on 15 days average of LVN distribution and staking ratio.\n\nReward is generated from protocol fee which occurs when collateral is withdrawn from borrow or short position.",

  "gov.community.title.poll-count": "Poll count",
  "gov.community.tooltip.poll-count": "Total number of polls created",

  "gov.community.title.total-staked": "Total staked",
  "gov.community.tooltip.total-staked": "Total quantity of LVN tokens staked",

  "gov.community.title.total-locked": "Total locked",
  "gov.community.tooltip.total-locked":
    "Total quantity of LVN tokens locked to a poll",

  "gov.community.title.rewards": "Pending rewards",
  "gov.community.tooltip.rewards": "Total unclaimed voting rewards",

  "gov.stake.title": "Staking",
  "gov.stake.staked": "Staked",
  "gov.stake.stakable": "Stakable",
  "gov.stake.pending_rewards": "Claimable rewards",
  "gov.stake.total": "Total",
  "gov.stake.manage-stake": "Manage Stake",

  "gov.poll.submit": "Submit text poll",
  "gov.poll.submit.title": "Title",
  "gov.poll.submit.description": "Description",
  "gov.poll.submit.link": "Information link (optional)",
  "gov.poll.submit.deposit": "Deposit",
  "gov.poll.submit.deposit-tooltip":
    "Passing the quorum will return the deposit to the creator. Failure to pass quorum will distribute the deposit to all LVN stakers.",
  "gov.poll.submit.fee": "Tx Fee",
  "gov.poll.submit.fee-tooltip": "Fee paid to execute this transaction",

  "gov.poll.create-modal.complete": "Poll created!",
  "gov.poll.create-modal.title": "Title",
  "gov.poll.create-modal.description": "Description",
  "gov.poll.create-modal.link": "Information link",
  "gov.poll.create-modal.poll-id": "Poll ID",
  "gov.poll.create-modal.txfee": "Tx fee",
  "gov.poll.create-modal.txhash": "Tx hash",

  "gov.poll.submit.title.minLength": "Title must be longer than 4 bytes",
  "gov.poll.submit.title.required": "Required",

  "gov.poll.submit.insufficient-lvn": "Insufficient LVN for initial deposit",

  "gov.poll.submit.description.minLength":
    "Description must be longer than 10 bytes",
  "gov.poll.submit.description.required": "Required",

  "gov.poll.submit.information.minLength":
    "Information must be longer than 10 bytes",
  "gov.poll.submit.information.required": "Required",
  "gov.poll.submit.information.pattern": "Must provide a valid URL",

  "gov.poll.vote.insufficient-lvn": "Insufficient LVN for voting",
  "gov.poll.vote.submit": "Submit",

  "gov.poll.status.in_progress": "In progress",
  "gov.poll.status.details": "Poll details",
  "gov.poll.status.creator": "Creator",
  "gov.poll.status.end-time": "End time",
  "gov.poll.status.vote": "Vote",
  "gov.poll.status.link": "Link",
  "gov.poll.status.vote-details": "Vote details",
  "gov.poll.status.vote-details.yes": "YES",
  "gov.poll.status.vote-details.no": "NO",
  "gov.poll.status.vote-details.abstain": "ABSTAIN",

  "gov.poll.list.filter.all": "All",
  "gov.poll.list.filter.in_progress": "In progress",
  "gov.poll.list.filter.passed": "Passed",
  "gov.poll.list.filter.rejected": "Rejected",
  "gov.poll.list.filter.executed": "Executed",

  "gov.poll.status.vote-details.voter": "VOTER",
  "gov.poll.status.vote-details.vote": "VOTE",
  "gov.poll.status.vote-details.balance": "Balance",

  "gov.poll.vote-modal.complete": "Complete!",
  "gov.poll.vote-modal.id": "Poll id",
  "gov.poll.vote-modal.answer": "Answer",
  "gov.poll.vote-modal.close": "Close",

  "gov.poll.manage-stake.insufficient-lvn": "Insufficient LVN for staking",
  "gov.poll.manage-stake.protocol-lvn": `Protocol fee paid from withdrawing collateral is
  distributed to MIR stakers and increases staked LVN`,
  "gov.poll.manage-stake.tx-fee": "Fee paid to execute this transaction",
  "gov.manage-stake.error.amount.required": "Required",
  "gov.manage-stake.error.amount.max": "Insufficient balance",
  "gov.poll.manage-stake.button.stake": "Stake",
  "gov.poll.manage-stake.button.unstake": "Unstake",
}

export default locale
*/
