import { Box, Button, Modal, Typography } from "@mui/material"

import LevanaIcon from "../../../icons/LevanaIcon"
import Card from "../Card"
import { useStyles } from "./createPollModalStyles"
import { CreatePollModalProps } from "./createPollModalProps"
import { useTranslations } from "../../../utils/useTranslations"

export default function CreatePollModal(props: CreatePollModalProps) {
  const { open, onClose, pollInfo } = props
  const classes = useStyles()
  const t = useTranslations()

  return (
    <Modal className={classes.modal} open={open}>
      <Card style={{ width: 600, textAlign: "right" }}>
        <Box className={classes.header}>
          <LevanaIcon />
          <Typography variant="h5">
            {t("gov.poll.createModal.complete")}
          </Typography>
        </Box>
        <Box>
          <Box className={classes.formResultContainer}>
            <p>{t("gov.poll.createModal.title")}</p>
            <p>{pollInfo.title}</p>
          </Box>
        </Box>
        <Box>
          <Box className={classes.formResultContainer}>
            <p>{t("gov.poll.createModal.description")}</p>
            <p>{pollInfo.description}</p>
          </Box>
        </Box>
        {pollInfo.information && (
          <Box>
            <Box className={classes.formResultContainer}>
              <p>{t("gov.poll.createModal.link")}</p>
              <p>{pollInfo.information}</p>
            </Box>
          </Box>
        )}
        <Box>
          <Box className={classes.formResultContainer}>
            <p>{t("gov.poll.createModal.pollId")}</p>
            <p>{pollInfo.pollId}</p>
          </Box>
        </Box>
        <Box className={classes.txInfoBlock}>
          <Box className={classes.txSum}>
            <p>{t("gov.poll.createModal.txfee")}</p>
            <span>{pollInfo.txfee}</span>
          </Box>
          <Box className={classes.txSum}>
            <p>{t("gov.poll.createModal.txhash")}</p>
            <span>{pollInfo.txhash}</span>
          </Box>
        </Box>
        <Button size="large" variant="outlined" onClick={onClose}>
          Close
        </Button>
      </Card>
    </Modal>
  )
}
