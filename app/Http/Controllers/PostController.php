<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class PostController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'nullable|string',
        ]);

        $post = $request->user()->posts()->create($data);

        return redirect()->route('dashboard')->with('success', 'Post created successfully.');
    }




}
