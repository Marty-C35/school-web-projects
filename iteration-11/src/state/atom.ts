import {atom} from 'recoil';
import {Song} from '../types/song';
/* Atoms go here */

export const libraryState = atom<Song[]>({
  key: 'libraryState',
  default: [],
});

export const queueState = atom<Song[]>({
  key: 'queueState',
  default: [],
});

export const playedState = atom<number>({
  key: 'playedState',
  default: 0,
});

export const songState = atom<Song | undefined>({
  key: 'songState',
  default: undefined,
});

export const completeLibraryState = atom<boolean>({
  key: 'completeLibraryState',
  default: false,
});
