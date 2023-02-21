import {Col, Row} from 'react-bootstrap';
import {useRecoilValue} from 'recoil';
import {humanizeSongLength} from '../misc/utils';
import {libraryState, playedState, queueState} from '../state/atom';

export const Stats = () => {
  const library = useRecoilValue(libraryState);
  const queue = useRecoilValue(queueState);
  const played = useRecoilValue(playedState);
  const sum = queue.reduce((partialSum, a) => partialSum + a.length, 0);
  const stats = {
    totalSongsCount: library.length,
    songsQueuedCount: queue.length,
    songsPlayedCount: played,
    playbackQueuedSeconds: sum,
  };

  const statsToRender = [
    {key: 'Total songs', value: stats.totalSongsCount},
    {key: 'Songs queued', value: stats.songsQueuedCount},
    {key: 'Songs played', value: stats.songsPlayedCount},
    {key: 'Left to play', value: humanizeSongLength(stats.playbackQueuedSeconds)},
  ];

  return (
    <Row className="mt-5">
      <h2>Stats about your playback</h2>
      <Col>
        {statsToRender.map((stat, idx) => (
          <p key={idx}>
            {stat.key}: {stat.value}
          </p>
        ))}
      </Col>
    </Row>
  );
};
