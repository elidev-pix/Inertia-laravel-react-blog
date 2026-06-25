import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Link, Head } from '@inertiajs/react';
import { Post } from '@/types/post';
import ListPost from '@/Components/Post/ListPost';


interface Props extends PageProps{
    userPosts : Post[]
}

export default function Dashboard({auth, userPosts} : Props) {
    console.log(userPosts);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Mes publications
                                </h2>
                                <Link href={route('posts.create')} className="inline-flex items-center px-4 py-2 border 
                                    text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                        Créer un nouveau post
                                </Link>
                            </div>

                            {userPosts.length > 0? (
                                <ListPost 
                                    posts={userPosts} 
                                    showAuthor={false} 
                                    canEdit={true}/>
                            ) : (  
                                    <div className="text-center py-12">
                                        <p className="p mb-4 text-gray-500">
                                            Vous n'avez pas encore créé de posts
                                        </p>
                                        <Link href={route('posts.create')} className="text-indigo-600 hover:text-indigo-700">
                                            Créer un nouveau post
                                        </Link>
                                    </div>
                            )}  
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

