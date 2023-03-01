import makeStyles from "@mui/styles/makeStyles"

export const useSelectStyles = makeStyles({
  voteContainer: {
    width: 600,
    margin: "0 auto",
    padding: "20px 0",
  },
  voteBox: {
    margin: "20px 0",
  },
  amountBlock: {
    display: "flex",
    justifyContent: "space-between",
    margin: 20,
  },
  btnYes: {
    color: "#695b41",
    border: "1px solid #695b41",
    width: 170,
    padding: "25px 0",
    opacity: 0.7,

    "&:hover, &:focus, &:disabled": {
      color: "#ffa600",
      border: "1px solid #ffa600",
      opacity: 1,
    },
  },
  btnNo: {
    color: "#886666",
    border: "1px solid #886666",
    width: 170,
    padding: "25px 0",
    opacity: 0.7,

    "&:hover, &:focus, &:disabled": {
      color: "#ff657f",
      border: "1px solid #ff657f",
      opacity: 1,
    },
  },
  btnAbstain: {
    color: "gray",
    border: "1px solid gray",
    width: 170,
    padding: "25px 0",
    opacity: 0.7,

    "&:hover, &:focus, &:disabled": {
      color: "#eae4e4",
      border: "1px solid #eae4e4",
      opacity: 1,
    },
  },
  formBox: {
    padding: "20px 0",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    padding: "30px 0 25px",
  },
  formResultContainer: {
    background: "black",
    marginRight: -2,
    marginTop: 20,
    marginLeft: 1,
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 20px",
    borderRadius: 7,
    "align-items": "center",
  },
  txInfoBlock: {
    display: "flex",
    padding: "3px 0",
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 20,
    borderTop: "1px solid #cf7108",
    borderBottom: "1px solid #cf7108",
  },
  txSum: {
    margin: "10px 0",
    color: "gray",
    display: "flex",
    justifyContent: "space-between",
    "align-items": "center",
  },
})
