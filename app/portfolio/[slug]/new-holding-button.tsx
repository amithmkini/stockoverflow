import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { addHoldingAndTx } from '@/app/actions'

export default function HoldingButton() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { register, handleSubmit } = useForm()

  const onSubmit = () => {
    // addHoldingAndTx()
    // setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4">
          <span className="block sm:hidden">Holding +</span>
          <span className="hidden sm:block">Add holding</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Holding</DialogTitle>
          <DialogDescription>
            Add a new holding to your portfolio.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
