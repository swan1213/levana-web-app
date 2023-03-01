import makeStyles from "@mui/styles/makeStyles"

export const useSelectStyles = makeStyles({
  titleBlock: {
    display: "flex",
    justifyContent: "space-between",
    color: "grey",
    fontSize: 12,
  },
  wrapper: {
    fontSize: 12,
    marginTop: 20,
  },
  blockInfoTitle: {
    color: "grey",
  },
  info: {
    margin: "0 10px",
    color: "#eeb143",
  },
  button: {
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  linkBlock: {
    marginTop: 10,
  },
  link: {
    textDecoration: "none",
    color: "#eeb143",
    fontSize: 12,
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
  votersHeader: {
    display: "grid",
    "grid-template-columns": "1.7fr 1fr 0.9fr",
    marginBottom: 20,
    paddingLeft: 20,
  },
  voterData: {
    display: "grid",
    "grid-template-columns": "2fr 1fr 1fr",
    textAlign: "left",
    marginBottom: 3,
    background: "black",
    padding: "15px 20px",
    borderRadius: 20,
  },
  voterAuthor: {
    color: "#eeb143",
    fontSize: 12,
    height: 10,
    widows: 40,
  },
  progress: {
    display: "flex",
    width: "100%",
    height: 8,
    background: "#5d5d5d",
  },
  status: {
    marginLeft: 13,
    position: "relative",
    top: -3,
    fontSize: 14,
  },
  progressItem: {
    height: 8,
  },
})
