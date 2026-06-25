import React from 'react'
import Nav from "@/components/Nav"
import {ShowProps} from "@/types/post"
import {Head, Link, router} from "@inertiajs/react"
import {Heart} from "lucide-react"

export default function Show({auth, post} : ShowProps) {

  
    const handleLike = ()=>{
      if(!auth.user){
        window.location.href = route('login')
        return;
      }
      router.post(route('posts.like', post.id), {}, {
        preserveScroll : true,
        preserveState : true
      })
    }

    
    const handleDelete = ()=>{
      if(confirm('C\'est quoi tu veux supprimer la ?' )){
        router.delete(route('posts.destroy', post.id))
      }
    }



  return (
    <div>Show</div>
  )
}
