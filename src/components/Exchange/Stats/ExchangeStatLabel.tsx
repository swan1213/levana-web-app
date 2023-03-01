import StatLabel, { StatLabelProps } from "../../common/StatLabel"

export default function ExchangeStatLabel(props: StatLabelProps) {
  return (
    <StatLabel
      {...props}
      direction="row"
      titleColor="text.secondary"
      titleSize="small"
      valueColor="text.primary"
      valueSize="small"
    />
  )
}
