import { useTranslations as useNextTranslations } from "next-intl"
// import { useTranslations } from "../utils/useTranslations"

interface NotificationPropsType {
  titleId: string
}

export default function Notification(props: NotificationPropsType) {
  const { titleId } = props
  // const t = useTranslations()
  const t = useNextTranslations() // TODO: replace with type defined function above

  const color = "rgba(241,94,126,.15)"

  const NotificationContainerStyle = {
    background: color,
    height: 70,
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  }

  return <div style={NotificationContainerStyle}>{t(titleId)}</div>
}
