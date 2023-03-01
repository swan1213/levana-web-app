import { atom, useSetRecoilState, AtomEffect } from "recoil"
import { recoilPersist } from "recoil-persist"

const ssrCompletedState = atom({
  key: "SsrCompleted",
  default: false,
})

export const useSsrComplected = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState)
  return () => setSsrCompleted(true)
}

const { persistAtom } = recoilPersist()

export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param))
}
