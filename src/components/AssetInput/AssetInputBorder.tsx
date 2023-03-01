import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"

import { lightness } from "../../theme/colors"

const AssetInputBorder = styled(Box)(({ theme }) => {
  const { default: bgColor, paper } = theme.palette.background
  const adjustment = theme.palette.mode === "dark" ? 10 : 3
  const input = {
    start: lightness(paper, -adjustment),
    end: lightness(paper, adjustment),
  }
  const inputActive = {
    start: lightness(theme.palette.primary.main, adjustment),
    end: lightness(paper, adjustment * 2),
  }

  return {
    border: "2px solid transparent",
    borderRadius: theme.spacing(1),
    backgroundOrigin: "border-box",
    backgroundImage: `
      linear-gradient(${bgColor}, ${bgColor}), 
      linear-gradient(to bottom, ${input.start}, ${input.end})
    `,
    backgroundClip: "content-box, border-box",
    overflow: "hidden",
    "&:focus-within": {
      backgroundImage: `
        linear-gradient(${bgColor}, ${bgColor}), 
        linear-gradient(to bottom, ${inputActive.start}, ${inputActive.end})
      `,
    },
  }
})

export default AssetInputBorder
