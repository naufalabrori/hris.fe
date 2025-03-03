/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, PenIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ChangeEvent, useEffect, useState } from 'react';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateUpdateMenu } from '@/hooks/Services/MasterData/Menu/useCreateUpdateMenu';
import { toast } from 'react-toastify';
import { Menu } from '@/types/MasterData/Menu/type';
import InputField from '@/components/common/Input/InputField';

const MenuSchema = z.object({
  menuName: z.string({ required_error: 'Menu Name is required' }).min(1, 'Menu Name is required'),
});

type MenuFormValues = z.infer<typeof MenuSchema>;

export function UpdateMenuForm({ data }: { data: Menu }) {
  const [form, setForm] = useState<Partial<MenuFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof MenuFormValues, string>>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const queryClient = useQueryClient();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const { mutate, isPending } = useCreateUpdateMenu(data?.id);

  const handleSubmit = () => {
    const result = MenuSchema.safeParse(form);

    if (!result.success) {
      const validationErrors = result.error.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {}
      );
      setErrors(validationErrors);
    } else {
      mutate(form, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['get-list-menu'],
          });
          toast('Menu Updated Successfully', { type: 'success' });
        },
        onError: (error: any) => {
          toast(
            error?.response?.data?.message || 'Terjadi kesalahan, silakan coba beberapa saat lagi.',
            {
              type: 'error',
            }
          );
        },
      });
      // Clear form and errors
      setForm({});
      setErrors({});
      setIsDialogOpen(false); // Close dialog after success
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-full overflow-scroll">
        <DialogHeader className="mb-2">
          <DialogTitle>Update Menu</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-4">Menu Name</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Menu Name"
              type="text"
              name="menuName"
              value={form.menuName || ''}
              onChange={onChange}
              error={errors.menuName}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive" disabled={isPending}>
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="mb-2 sm:mb-0"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
