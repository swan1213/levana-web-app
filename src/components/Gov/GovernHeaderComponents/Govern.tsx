import CommunityCard from "./CommunityCard"
import StakeCard from "./StakeCard"
import { governContainer } from "./style"

export default function Govern() {
  return (
    <div style={governContainer}>
      <CommunityCard />
      <StakeCard />
    </div>
  )
}
