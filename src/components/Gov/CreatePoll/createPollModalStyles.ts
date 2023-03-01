import makeStyles from "@mui/styles/makeStyles"

export const useStyles = makeStyles({
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
  },
})
