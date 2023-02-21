import {useRecoilValue} from 'recoil';
import {queueState} from '../../state/atom';
import type {Song} from '../../types';

export const NextSong = () => {
  // @todo retrieve from Recoil
  const nextSong: Song = useRecoilValue(queueState)[1];
  return <span>Next: {nextSong?.name || 'None'}</span>;
};
