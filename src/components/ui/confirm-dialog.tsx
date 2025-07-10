import { ReactNode } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface ConfirmDialogProps {
  children?: ReactNode
  title?: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
  open: boolean
}

const ConfirmDialog = ({
  children,
  description = 'Esta ação não pode ser desfeita. Isto irá apagar este dado diretamente do banco de dados.',
  onConfirm,
  onCancel,
  title = 'Você tem certeza disso?',
  open,
  isLoading = false,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog open={open}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogAction disabled={isLoading} onClick={onConfirm}>
            Confirmar Exclusão
          </AlertDialogAction>
          <AlertDialogCancel disabled={isLoading} onClick={onCancel}>
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ConfirmDialog }
