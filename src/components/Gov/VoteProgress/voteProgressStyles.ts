import makeStyles from "@mui/styles/makeStyles"

export const useSelectStyles = makeStyles({
  progressItem: {
    height: 8,
  },
  progress: {
    display: "flex",
    width: "100%",
    height: 8,
    background: "#5d5d5d",
  },
  voteAnswers: {
    marginTop: 20,
    display: "grid",
    "grid-template-columns": "1fr 1fr 1fr",
    gridGap: 18,
    textAlign: "center",
  },
  answerNo: {
    color: "#ff657f",
    padding: "0 40px",
    borderLeft: "1px solid #eeb143",
    borderRight: "1px solid #eeb143",
  },
  answerYes: {
    color: "#eeb143",
  },
  answerAbstain: {
    color: "gray",
  },
})
