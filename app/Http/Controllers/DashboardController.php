<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Post;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
    
        $posts = Post::with('user')
            ->latest()
            ->paginate(10);

            
        $posts->getCollection()->transform(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'body' => $post->body,
                'created_at' => $post->created_at ? $post->created_at->toDateTimeString() : null,
                'user' => $post->user ? [
                    'id' => $post->user->id,
                    'name' => $post->user->name,
                ] : null,
            ];
        });

        return Inertia::render('dashboard', [
            'posts' => $posts,
        ]);
    }
}
