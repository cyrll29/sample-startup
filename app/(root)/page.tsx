import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { startups_query } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {

  const query = (await searchParams).query;
  const { data: posts }  = await sanityFetch({ query: startups_query });

  // console.log(JSON.stringify(posts, null, 2))

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
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post?._id} post={post}/>
              ))
            ) : (
              <p className="no-results">No startups found</p>
            )}
         </ul>
      </section>

      <SanityLive />
    </>
  );
}
