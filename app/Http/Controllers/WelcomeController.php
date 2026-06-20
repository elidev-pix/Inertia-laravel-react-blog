<?php

namespace App\Http\Controllers;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        $posts = Post::with('author')->latest()->get();
        return Inertia::render('Welcome', [
            'posts' => $posts,
            'canRegister' => config('services.registration.enabled', true)
        ]);
    }
}
