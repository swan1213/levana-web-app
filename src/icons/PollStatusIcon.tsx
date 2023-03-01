import { PollStatusRaw } from "../network/types/types"

type Props = {
  status: PollStatusRaw
}

export default function PollDetailIcon(props: Props) {
  const { status } = props

  switch (status) {
    case PollStatusRaw.inProgress: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          width="18"
          height="18"
          fill="#ee8f00"
        >
          <path d="M4.208 7.993v3.174H3.85a.675.675 0 00-.1 1.343l.1.007h9.618a.675.675 0 00.1-1.343l-.1-.007h-.36V7.993h1.525c.29 0 .544.184.637.451l.027.104 1.109 5.756a.677.677 0 01-.565.788l-.1.007H1.576a.674.674 0 01-.675-.695l.01-.099L2.019 8.55A.676.676 0 012.576 8l.107-.008h1.525zM11.601 3.6a.43.43 0 01.43.43v7.203H5.3V4.029c0-.237.192-.429.43-.429h5.87z"></path>
        </svg>
      )
    }

    case PollStatusRaw.passed: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          width="18"
          height="18"
        >
          <circle cx="9" cy="9" r="7.65"></circle>
          <path
            fill="#ee8f00"
            d="M9.61 5.513l.084.072 2.981 2.925a.75.75 0 01.08.98l-.074.085-2.98 2.991a.75.75 0 01-1.136-.974l.073-.084 1.705-1.713H5.85a.75.75 0 01-.102-1.493l.102-.006 4.464-.001-1.67-1.64a.75.75 0 01-.082-.976l.072-.084a.75.75 0 01.975-.082z"
          ></path>
        </svg>
      )
    }
    case PollStatusRaw.executed: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          width="18"
          height="18"
        >
          <path d="M16.65 9.01l-1.872-1.884.425-2.622-2.621-.423-1.198-2.371-2.369 1.197-2.359-1.194-1.215 2.361-2.616.405.405 2.624-1.88 1.886 1.855 1.87-.423 2.603 2.622.425 1.198 2.37 2.37-1.197 2.361 1.214 1.214-2.362 2.625-.406-.406-2.624z"></path>
          <path
            fill="#ee8f00"
            d="M5.87 8.645a.75.75 0 01.984-.067l.076.067 1.211 1.212 3.146-3.146a.75.75 0 01.984-.067l.077.067a.75.75 0 01.067.984l-.067.077-3.676 3.676a.75.75 0 01-.984.067l-.077-.067L5.87 9.706a.75.75 0 010-1.06z"
          ></path>
        </svg>
      )
    }
    case PollStatusRaw.rejected: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          width="18"
          height="18"
        >
          <circle cx="9" cy="9" r="7.65"></circle>
          <path
            fill="#ee8f00"
            d="M12.177 5.823c.24.24.262.614.066.879l-.066.075L9.955 9l2.222 2.223a.675.675 0 01-.879 1.02l-.075-.066L9 9.955l-2.223 2.222a.675.675 0 01-1.02-.879l.066-.075L8.045 9 5.823 6.777a.675.675 0 01.879-1.02l.075.066L9 8.045l2.223-2.222a.675.675 0 01.954 0z"
          ></path>
        </svg>
      )
    }

    default: {
      return null
    }
  }
}
