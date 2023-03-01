import makeStyles from "@mui/styles/makeStyles"

export const useSelectStyles = makeStyles({
  container: {
    width: "calc(50% - 10px)",

    "&:nth-child(odd)": {
      "margin-right": 20,
    },
  },
  pollItemContainer: {
    "text-decoration": "none",
    color: "inherit",
    margin: 0,
    padding: 0,
  },
  titleBlock: {
    display: "flex",
    justifyContent: "space-between",
    color: "grey",
    fontSize: 12,
  },
  title: {
    margin: "15px 0",
  },
  progress: {
    display: "flex",
    width: "100%",
    height: 8,
    background: "#5d5d5d",
  },
  status: {
    marginLeft: 10,
    position: "relative",
    top: -3,
    fontSize: 12,
    "text-transform": "uppercase",
  },
  progressItem: {
    height: 8,
  },
  creatorBlock: {
    fontSize: 12,
    marginTop: 20,
  },
  creatorInfoTitle: {
    color: "grey",
  },
  endDate: {
    margin: "0 10px",
    color: "#eeb143",
  },
})
