import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface DecodeHashRoute<Return> {
  (...hashComponents: (string | undefined)[]): Return | undefined
}

interface EncodeHashRoute<Props> {
  (props: Props): string
}

export interface HashRouteMap<T> {
  decode: DecodeHashRoute<T>
  encode: EncodeHashRoute<T>
}

export function useHashRoute<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Map extends DecodeHashRoute<any>,
  Return extends ReturnType<Map>
>(map: Map): Return | undefined {
  const { asPath } = useRouter()
  const [routerHash, setRouterHash] = useState<Return>()

  // useEffect is required for the first render to match the server
  useEffect(() => {
    const [, hash] = asPath.split("#")

    if (hash) {
      const hashComponents = hash.replace(/^\/|\/$/g, "").split("/")
      setRouterHash(map(...hashComponents))
    } else {
      setRouterHash(undefined)
    }
  }, [asPath, map])

  return routerHash
}
