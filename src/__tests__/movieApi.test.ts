import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { movieApi } from '../store/movieApi';
import { configureStore } from '@reduxjs/toolkit';

const mockMovieResponse = {
  results: [
    {
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      poster_path: '/test.jpg',
      release_date: '2023-01-01',
      vote_average: 8.5,
      vote_count: 100
    }
  ],
  total_pages: 1,
  total_results: 1,
  page: 1
};

export const handlers = [
  rest.get('https://api.themoviedb.org/3/discover/movie', (req, res, ctx) => {
    return res(ctx.json(mockMovieResponse));
  }),
  rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
    return res(ctx.json(mockMovieResponse));
  })
];

const server = setupServer(...handlers);

let store: ReturnType<typeof setupStore>;

function setupStore() {
  return configureStore({
    reducer: {
      [movieApi.reducerPath]: movieApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(movieApi.middleware),
  });
}

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  store = setupStore();
});
afterAll(() => server.close());

describe('Movie API', () => {
  it('fetches popular movies successfully', async () => {
    store = setupStore();
    const result = await store.dispatch(
      movieApi.endpoints.getPopularMovies.initiate({ page: 1 })
    );
    
    expect(result.data).toEqual(mockMovieResponse);
  });

  it('fetches search results successfully', async () => {
    store = setupStore();
    const result = await store.dispatch(
      movieApi.endpoints.searchMovies.initiate({ query: 'test', page: 1 })
    );
    
    expect(result.data).toEqual(mockMovieResponse);
  });

  it('handles API errors gracefully', async () => {
    server.use(
      rest.get('https://api.themoviedb.org/3/discover/movie', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    store = setupStore();
    const result = await store.dispatch(
      movieApi.endpoints.getPopularMovies.initiate({ page: 1 })
    );
    
    expect(result.error).toBeDefined();
  });
}); 