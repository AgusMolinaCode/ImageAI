import { Collection } from "@/components/shared/Collection";


export default function Home({searchParams}: SearchParamProps) {

  const page = Number(searchParams?.page) || 1;
  const searchQuery =(searchParams?.search as string) || '';

  return (
    <>
      <h1>
        Unleash Your creative with ImageAI
      </h1>
      <div>
        <Collection 

        />
      </div>
    </>
  );
}
