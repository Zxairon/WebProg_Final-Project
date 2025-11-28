import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type PostModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function PostModal({ isOpen, onClose }: PostModalProps) {
    const form = useForm({ title: '', body: '' });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        form.post('/posts', {
            onSuccess: () => {
                form.reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add New Post</DialogTitle>
                    <DialogDescription>
                        Write your post below.
                    </DialogDescription>
                </DialogHeader>

                <form className="mt-4 space-y-4" onSubmit={submit}>
                    <div>
                        <Input
                            placeholder="Title"
                            value={form.data.title}
                            onChange={(e) =>
                                form.setData(
                                    'title',
                                    (e.target as HTMLInputElement).value,
                                )
                            }
                            autoFocus
                        />
                        {form.errors.title && (
                            <p className="mt-1 text-sm text-red-600">
                                {String(form.errors.title)}
                            </p>
                        )}
                    </div>

                    <div>
                        <textarea
                            className="w-full rounded-md border px-3 py-2"
                            rows={6}
                            value={form.data.body}
                            onChange={(e) =>
                                form.setData(
                                    'body',
                                    (e.target as HTMLTextAreaElement).value,
                                )
                            }
                        />
                        {form.errors.body && (
                            <p className="mt-1 text-sm text-red-600">
                                {String(form.errors.body)}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                type="button"
                                disabled={form.processing}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>

                <DialogClose className="absolute top-4 right-4" />
            </DialogContent>
        </Dialog>
    );
}
