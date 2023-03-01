import Skeleton, { SkeletonProps } from "@mui/material/Skeleton"
import { styled } from "@mui/material/styles"

const BackgroundSkeleton = styled(Skeleton)<SkeletonProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

export default BackgroundSkeleton
