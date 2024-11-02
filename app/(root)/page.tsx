import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;

  const posts = [{
    _createdAt: new Date(),
    _id: 1,
    views: 55,
    author: {
      id: 1,
      name: 'Adrian'
    },
    description: 'This is a description',
    image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/We-Robot-Carousel-Slide-1-Robotaxi-Tablet.png",
    category: 'Robots',
    title: 'We Robots'
  }]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup. <br/> Connect With Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed on Virtual Competitions</p>
        <SearchForm query={query}/>
      </section>

      <section className="section_container">
         <p className="text-30-semibold">
            {query ? `Search results for "${query}"` : `All Startups`}
         </p>

         <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
              posts.map((post: StartupCardType, index: number) => (
                <StartupCard key={post?._id} post={post}/>
              ))
            ) : (
              <p className="no-results">No startups found</p>
            )}
         </ul>
      </section>
    </>
  );
}
