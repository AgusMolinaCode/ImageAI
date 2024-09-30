import { Collection } from "@/components/shared/Collection"
import { getAllImages } from "@/lib/actions/image.actions"
import React from "react";


const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      <section className="">
        <h1 className="">
          Unleash Your Creative Vision with Imaginify
        </h1>
        
      </section>

      <section className="sm:mt-12">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home