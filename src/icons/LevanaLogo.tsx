import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon"
import { useTheme } from "@mui/material/styles"

export default function LevanaLogo(props: SvgIconProps) {
  const { sx, ...otherProps } = props
  const theme = useTheme()
  const width = 98
  const height = 14

  const Svg = () => (
    <g fill={theme.palette.text.primary}>
      <polygon points="3.33073665 11.4056 7.77232044 11.4056 7.77232044 13.9997554 7.10542728e-15 13.9997554 7.10542728e-15 6.11540646e-05 3.33073665 6.11540646e-05"></polygon>
      <polygon points="17.1222063 2.693225 17.1222063 5.62372778 21.7776575 5.62372778 21.7776575 8.17782728 17.1222063 8.17782728 17.1222063 11.2868999 22.362108 11.2868999 22.362108 14 13.7911688 14 13.7911688 0 22.362108 0 22.362108 2.693225"></polygon>
      <polygon points="31.3029085 0.000122308129 34.6727489 10.5345215 38.0428901 0.000122308129 41.6076476 0.000122308129 36.8156341 13.9998165 32.5109134 13.9998165 27.738151 0.000122308129"></polygon>
      <path d="M55.0480258,8.87103918 L53.3340786,3.72278426 L51.6002787,8.87103918 L55.0480258,8.87103918 Z M55.905601,11.4453195 L50.7433051,11.4453195 L49.8860307,13.9997248 L46.3799288,13.9997248 L51.4252142,0.0994059319 L55.2624948,0.0994059319 L60.3074794,13.9997248 L56.7622738,13.9997248 L55.905601,11.4453195 Z"></path>
      <polygon points="78.2873211 13.9998777 74.9562836 13.9998777 69.3849024 5.40620277 69.3849024 13.9998777 66.0538649 13.9998777 66.0538649 0.000183462194 69.3849024 0.000183462194 74.9562836 8.6730529 74.9562836 0.000183462194 78.2873211 0.000183462194"></polygon>
      <path d="M89.117434,0.0992530468 L84.0724494,13.9998777 L87.5785513,13.9998777 L88.4358257,11.4451666 L93.5978207,11.4451666 L94.4547944,13.9998777 L98,13.9998777 L98,13.9989604 L92.9550153,0.0992530468 L89.117434,0.0992530468 Z M91.0262983,3.72263137 L92.7408471,8.8708863 L89.2927993,8.8708863 L91.0262983,3.72263137 Z"></path>
    </g>
  )

  return (
    <SvgIcon
      {...otherProps}
      viewBox={`0 0 ${width} ${height}`}
      sx={{ ...sx, width, height: "100%" }}
    >
      <Svg />
    </SvgIcon>
  )
}