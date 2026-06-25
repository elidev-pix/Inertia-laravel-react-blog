import React from 'react'
import {FormEvent, useState} from "react";
import {Head, useForm} from "@inertiajs/react";
import { EditProps, PostFormData } from "@/types/post";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';

export default function Edit({auth, post} : EditProps){

    const {data, setData, put, processing, errors, reset } = useForm<PostFormData>({
        title: post.title,
        description: post.description,
        image: null,
    });

    const [previewUrl, setPreviewUrl] = useState<string>(post.image ? `/storage/${post.image}` : '');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            setData('image', file)
            const reader = new FileReader();
            reader.onloadend = ()=> {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: FormEvent)=>{
        e.preventDefault()

        put(route('posts.update',post.id), {
            onSuccess: ()=> {
                reset();
                setPreviewUrl('');
            }
        })
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Créer un nouveau post
                </h2>
            }>
                <Head title="Créer un post" />

                <div className="py-12">
                    <div className="max-w-7xlmx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold mb-6">
                                    Créer un post
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Titre</Label>
                                        <Input id="title" value={data.title} onChange={e=>setData('title', e.target.value)} />
                                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>  }
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Description</Label>
                                        <Textarea id="description" value={data.description} onChange={e=>setData('description', e.target.value)} />
                                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>  }
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="image">Image</Label>
                                        <Input type="file" id="image" onChange={handleImageChange}  accept="image/*" 
                                            className="block py-2 file text-sm mr-4 file:rounded-md file:border-0 file:text-sm
                                            file:text-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo100"
                                        />
                                        {errors.image && <p className='text-red-500 text-sm'>{errors.image}</p>}
                                        {previewUrl && (
                                            <div className="mt-2">
                                                <img src={previewUrl} alt="preview" className="max-h-48 rounded-md" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-end space-x-4">
                                        <Button type="button" variant="outline" onClick={()=> window.history.back()}>
                                            Annuler
                                        </Button>
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Modification en cours...' : 'Modifier le post'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

        </AuthenticatedLayout>
    )
}