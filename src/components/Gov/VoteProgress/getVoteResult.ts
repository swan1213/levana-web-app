type Args = {
  yes: number
  no: number
  abstain: number
}

export const getVoteResult = ({ yes, no, abstain }: Args) => {
  const total = yes + no + abstain
  if (total <= 0) {
    return {
      yesPercents: "--",
      noPercents: "--",
      abstainPercents: "--",
    }
  }
  const yesPercents = `${(yes / total) * 100}%`
  const noPercents = `${(no / total) * 100}%`
  const abstainPercents = `${(abstain / total) * 100}%`

  return { yesPercents, noPercents, abstainPercents }
}
