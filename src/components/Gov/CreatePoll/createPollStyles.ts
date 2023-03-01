import makeStyles from "@mui/styles/makeStyles"

export const TxFeeContainer = {
  background: "black",
  marginRight: -2,
  marginTop: 8,
  marginLeft: 1,
  height: 100,
  display: "flex",
  justifyContent: "space-between",
  padding: 10,
  borderRadius: 7,
}

export const useStyles = makeStyles({
  textField: {
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
      {
        display: "none",
      },
    "& input": {
      "-webkit-box-shadow": "0 0 0 30px #121212 inset !important",
    },
  },
})
