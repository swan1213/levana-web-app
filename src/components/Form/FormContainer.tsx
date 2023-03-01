import { PropsWithChildren } from "react"

import Section, { SectionProps } from "../common/Section/Section"
import SingleAssetFormController from "./SingleAssetFormController"
import DoubleAssetFormController from "./DoubleAssetFormController"
import FormSwitch from "./FormSwitch"
import { UseFormControllerReturn } from "./useFormController"
import { FormControllerProps } from "./types"
import { TransactionRequirement } from "../../network/transactions/common/types"

export default function FormContainer(props: FormControllerProps) {
  const { requirement } = props

  switch (requirement) {
    case TransactionRequirement.SingleAsset:
      return (
        <SingleAssetFormController {...props}>
          {(returnProps) => (
            <FormContainerContent {...returnProps}>
              {props.children(returnProps)}
            </FormContainerContent>
          )}
        </SingleAssetFormController>
      )

    case TransactionRequirement.DoubleAsset:
      return (
        <DoubleAssetFormController {...props}>
          {(returnProps) => (
            <FormContainerContent {...returnProps}>
              {props.children(returnProps)}
            </FormContainerContent>
          )}
        </DoubleAssetFormController>
      )
  }
}

type FormContainerContentProps = PropsWithChildren<
  UseFormControllerReturn & SectionProps
>

function FormContainerContent(props: FormContainerContentProps) {
  const { result, onSubmit, onDismiss, bgAlpha, children } = props
  const { response, error } = result

  return (
    <FormSwitch result={result} onDismiss={onDismiss} bgAlpha={bgAlpha}>
      <Section
        variant={props.variant}
        sx={{
          color: ({ palette }) => palette.text.secondary,
          filter: response || error ? "blur(4px)" : "none",
          overflow: "hidden",
        }}
      >
        <form onSubmit={onSubmit}>{children}</form>
      </Section>
    </FormSwitch>
  )
}
