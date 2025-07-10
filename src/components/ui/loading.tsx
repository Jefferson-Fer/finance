import { Icons } from '../icons'

interface LoadingOnButtonProps {
  isLoading: boolean
  onActionText: string
  defaultText: string
}

export const LoadingOnButton = ({
  isLoading,
  onActionText,
  defaultText,
}: LoadingOnButtonProps) => {
  return isLoading ? (
    <>
      {onActionText}
      <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />
    </>
  ) : (
    defaultText
  )
}
