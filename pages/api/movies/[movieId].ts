import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    const { movieId } = req.query;

    if (typeof movieId !== 'string' && !movieId) {
      throw new Error('Invalid Id');
    }

    if (typeof movieId === 'string') {
      const movie =
        await prismadb.movie.findUnique({
          where: {
            id: movieId,
          },
        });

      if (!movie) {
        throw new Error('Invaild Id');
      }

      return res.status(200).json(movie);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
