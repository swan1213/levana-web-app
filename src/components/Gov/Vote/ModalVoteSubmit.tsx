import { Box, Button, Modal, Typography } from "@mui/material"

import Card from "../Card"
import LevanaIcon from "../../../icons/LevanaIcon"
import getCompactHash from "../../../utils/getCompactHash"
import { ModalVoteSubmitProps } from "./modalVoteSubmitProps"
import { useSelectStyles } from "./voteStyles"
import { useTranslations } from "../../../utils/useTranslations"

export default function ModalVoteSubmit(props: ModalVoteSubmitProps) {
  const { answer, id, onClose, open, txHash, txFee } = props
  const classes = useSelectStyles()
  const t = useTranslations()

  return (
    <Modal className={classes.modal} open={open}>
      <Card style={{ width: 600, textAlign: "right" }}>
        <Box className={classes.header}>
          <LevanaIcon />
          <Typography variant="h5">
            {t("gov.poll.voteModal.complete")}
          </Typography>
        </Box>
        <Box>
          <Box className={classes.formResultContainer}>
            <p>{t("gov.poll.voteModal.id")}</p>
            <span>{id}</span>
          </Box>
          <Box className={classes.formResultContainer}>
            <p>{t("gov.poll.voteModal.answer")}</p>
            <span>{answer}</span>
          </Box>
        </Box>
        <Box className={classes.txInfoBlock}>
          <Box className={classes.txSum}>
            <p>{t("gov.poll.createModal.txfee")}</p>
            <span>{txFee}</span>
          </Box>
          <Box className={classes.txSum}>
            <p>{t("gov.poll.createModal.txhash")}</p>
            <span>{getCompactHash(txHash)}</span>
          </Box>
        </Box>
        <Button size="large" variant="outlined" onClick={onClose}>
          {t("gov.poll.voteModal.close")}
        </Button>
      </Card>
    </Modal>
  )
}
