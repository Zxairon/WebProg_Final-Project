import PostModal from '@/components/PostModal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

type User = { id: number; name: string };
type Post = {
    id: number;
    title: string;
    body: string;
    created_at: string;
    user?: User;
};

type Props = {
    posts:
        | {
              data: Post[];
              current_page?: number;
              last_page?: number;
          }
        | Post[];
};

export default function Dashboard({ posts }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const items: Post[] = Array.isArray(posts) ? posts : (posts.data ?? []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-2 flex justify-end">
                    <Button
                        className="mt-0 w-auto border border-gray-200 bg-white text-black hover:bg-gray-100"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add New Post
                    </Button>
                </div>

                <PostModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />

                <div className="space-y-4">
                    {items.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground">
                            No posts yet
                        </div>
                    )}

                    {items.map((post) => (
                        <article
                            key={post.id}
                            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-slate-800"
                        >
                            <header className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {post.title}
                                    </h3>
                                    <div className="text-xs text-muted-foreground">
                                        {post.user?.name ?? 'Unknown'}•{' '}
                                        {new Date(
                                            post.created_at,
                                        ).toLocaleString()}
                                    </div>
                                </div>
                            </header>

                            <div className="mt-3 text-sm text-foreground dark:text-slate-200">
                                {post.body.length > 300
                                    ? `${post.body.slice(0, 300)}…`
                                    : post.body}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
