import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useMovieList from '@/hooks/useMovieList';
import { NextPageContext } from 'next';
import {
  getSession,
  signOut,
} from 'next-auth/react';

export default function Home() {
  const { data: movie = [] } = useMovieList();
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList
          title="Trending now"
          data={movie}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(
  context: NextPageContext
) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
