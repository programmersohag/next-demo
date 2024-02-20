import Link from 'next/link'
import React from 'react'
import Item from "@/app/Item";

const getNotes = async () => {
    // Because this is server components, we have to define the URL with http
    const res = await fetch(process.env.BASE_URL + '/api/note', {next: {revalidate: 0}})

    // Define the output to json, because if only res, it will return by any type
    const json = await res.json()
    return json
}

const Page = async () => {

    const notes = await getNotes()

    return (
        <div className='w-[1200px] mx-auto py-20'>
            <Link href={"/create"}
                  className='px-3 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-md text-white'>Create</Link>

            <div className='grid grid-cols-3 gap-5 mt-8'>
                {notes?.notes?.map((note: any, i: number) => (
                    <Item key={i} note={note}/>
                )).sort().reverse()}
            </div>
        </div>
    )
}

export default Page
