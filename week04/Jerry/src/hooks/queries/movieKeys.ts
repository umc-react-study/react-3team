export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  
  popular: (page: number) => [...movieKeys.lists(), 'popular', page] as const,
  nowPlaying: (page: number) => [...movieKeys.lists(), 'nowPlaying', page] as const,
  topRated: (page: number) => [...movieKeys.lists(), 'topRated', page] as const,
  upcoming: (page: number) => [...movieKeys.lists(), 'upcoming', page] as const,
  
  popularInfinite: () => [...movieKeys.lists(), 'popular', 'infinite'] as const,
  nowPlayingInfinite: () => [...movieKeys.lists(), 'nowPlaying', 'infinite'] as const,
  topRatedInfinite: () => [...movieKeys.lists(), 'topRated', 'infinite'] as const,
  upcomingInfinite: () => [...movieKeys.lists(), 'upcoming', 'infinite'] as const,
};