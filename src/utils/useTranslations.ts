import {
  useTranslations as useNextTranslations,
  TranslationValues,
} from "next-intl"

// import { LocaleStrings2 } from "../locales/types"
import dict from "../locales/en" // TODO: change with locales/types

type Dict = typeof dict

type KeysUnion<T, Cache extends string = ""> = T extends PropertyKey
  ? Cache
  : {
      [P in keyof T]: P extends string
        ? Cache extends ""
          ? KeysUnion<T[P], `${P}`>
          : Cache | KeysUnion<T[P], `${Cache}.${P}`>
        : never
    }[keyof T]

type RemoveDot<T extends string> = T extends `.${infer Tail}` ? Tail : T

type ExtractString<
  T extends string,
  U extends string,
  Result extends string = ""
> = T extends `${infer Head}${infer Tail}`
  ? `${Result}${Head}` extends U
    ? Tail
    : ExtractString<Tail, U, `${Result}${Head}`>
  : Result

type ValidPrefix<T extends string, U extends string> = T extends `${U}${string}`
  ? Exclude<T, U>
  : never

type ConcatNamespaceWithPrefix<N extends string, P extends string> = `${N}.${P}`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Acc = Record<string, any>

// (acc, elem) => hasProperty(acc, elem) ? acc[elem] : acc
type Predicate<
  Accumulator extends Acc,
  El extends string
> = El extends keyof Accumulator ? Accumulator[El] : Accumulator

type Reducer<
  Keys extends string,
  Accumulator extends Acc = object
> = Keys extends `${infer Prop}.${infer Rest}`
  ? Reducer<Rest, Predicate<Accumulator, Prop>>
  : Keys extends `${infer Last}`
  ? Predicate<Accumulator, Last>
  : never

type EmptyProps<D = Dict> = () => <Prefix extends KeysUnion<D>>(
  prefix: Prefix,
  values?: TranslationValues
) => Reducer<Prefix, D>

type WithProps<D = Dict> = <
  ValidKeys extends KeysUnion<D>,
  Namespace extends ValidKeys
>(
  namespace?: Namespace
) => <
  Prefix extends RemoveDot<
    ExtractString<ValidPrefix<KeysUnion<Dict>, Namespace>, Namespace>
  >
>(
  prefix: Prefix,
  values?: TranslationValues
) => Reducer<ConcatNamespaceWithPrefix<Namespace, Prefix>, D>

type UseTranslationsProps = EmptyProps & WithProps

export type TranslationKeys = KeysUnion<Dict>

// TODO: fix build without `unknown` cast
export const useTranslations =
  useNextTranslations as unknown as UseTranslationsProps
