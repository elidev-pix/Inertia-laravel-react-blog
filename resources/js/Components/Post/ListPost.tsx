import React from 'react'
import { usePage, router, Link } from '@inertiajs/react';
import {useState} from 'react';
import {Post, Props} from '@/types/post';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Edit, Eye, Heart, Trash2 } from 'lucide-react';

export default function ListPost({posts, showAuthor = true}: Props) {

    const {auth} = usePage().props as any;
    const [deletingId, setDeletingId] = useState<number | null>(null);


    const handleDelete = (postId: number) => {
      if(confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        setDeletingId(postId)
        router.delete(route('posts.destroy', postId), {
          onSuccess: () => {
            setDeletingId(null)
          },
          onError: () => {
            setDeletingId(null)
            alert('Une erreur est survenue lors de la suppression.')
          }
        })
      }
    }
     
    const handleLIke = (postId: number) => {
      router.post(route('posts.like', postId), {
        preserveScroll: true,
      preserveState: true
      })
    }

    const canEditPost = (post : Post) =>{
      return auth.user?.id === post.user_id;
    }

    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
              {
                post.image &&(
                  <div className="aspect-w-16 asêct-h-9">
                    <img src={`/storage/${post.image}`} alt={post.title} className="object-cover w-full"/>
                  </div>
              )}
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-800">
              {post.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 line-clamp-3 mb-4">
              {post.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              {showAuthor && (
                <span>Par <strong>{post.author.name}</strong></span>
              )}
              <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
              <div className="flex items-center justify-end space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleLIke(post.id)} 
                  className={'transition-colors ${post.is_liked ? "text-red-600 hover:text-red-700" : "text-gray-600 hover:text-red-700"}'}>
                    <Heart className="h-6 w-6" fill={post.is_liked ? "currentColor" : "none"}  />
                </Button>
                <span className="text-gray-600">
                  {post.likes_count}
                </span>
              </div>
              <div className="div flex items-center space-x-3">
                <Button variant="link" asChild>
                  <Link href={route('posts.show', post.id)}>
                    <Eye/>
                  </Link>
                </Button>
                {canEditPost(post) && (
                  <>
                    <Button variant="link" asChild>
                      <Link href={route('posts.edit', post.id)}>
                        <Edit/>
                      </Link>
                    </Button>
                    <Button 
                      onClick={()=>handleDelete(post.id)} d
                      isabled={deletingId === post.id} 
                      variant="ghost" >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
          </CardFooter>
          </Card>
        ))}
    </div>
  )
}
