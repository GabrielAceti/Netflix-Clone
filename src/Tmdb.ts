export const API_KEY: string = '9415dc25938ef4c5c3cc158d00fbeca6';
export const API__BASE: string = 'https://api.themoviedb.org/3';

/*
- Netflix originals
- Recommended (trending)
- On the rise (top rated)
- Action
- Comedy
- Horror
- Romance
- Documentaries
*/

const basicFetch = async (endpoint: string) => {
    const res = await fetch(`${API__BASE}${endpoint}`);
    const json = await res.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Netflix Originals',
                items: await basicFetch(`/discover/tv?with_network=213&language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recommended to you',
                items: await basicFetch(`/trending/all/week?language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'On the rise',
                items: await basicFetch(`/movie/top_rated?language=en-US&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Action',
                items: await basicFetch(`/discover/movie?with_genres=28&language=en-US&api_key=${API_KEY}`)
            }, {
                slug: 'comedy',
                title: 'Comedy',
                items: await basicFetch(`/discover/movie?with_genres=35&language=en-US&api_key=${API_KEY}`)
            }, {
                slug: 'horror',
                title: 'Horror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=en-US&api_key=${API_KEY}`)
            }, {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=en-US&api_key=${API_KEY}`)
            }, {
                slug: 'documentary',
                title: 'Documentaries',
                items: await basicFetch(`/discover/movie?with_genres=99&language=en-US&api_key=${API_KEY}`)
            },

        ];
    },
    getMovieInfo: async (movieId: number, type: string) => {
        let info = {};

        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=en-US&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=en-US&api_key=${API_KEY}`);
                    break;
            }
        }
        return info
    }
}