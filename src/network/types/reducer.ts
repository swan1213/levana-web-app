export type ResultAction<Response> =
  | {
      type: ResultType.pending
    }
  | {
      type: ResultType.response
      response: Response
    }
  | {
      type: ResultType.error
      error: Error
    }

export enum ResultType {
  pending = "pending",
  response = "response",
  error = "error",
}

export interface ResultState<Response> {
  response?: Response
  error?: Error
}
