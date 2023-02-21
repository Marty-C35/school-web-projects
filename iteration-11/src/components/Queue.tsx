import {Col, Row} from 'react-bootstrap';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {queueState} from '../state/atom';
import type {Song} from '../types';
import {isSameSong} from './Library';
import {SongItem} from './SongItem';

export const Queue = () => {
  // @todo todo take the actual songs from Recoil
  const songs: Song[] = useRecoilValue(queueState);
  const setQueue = useSetRecoilState(queueState);
  // Const setTodoList = useSetRecoilState(que);

  const onSongClick = (song: Song) => {
    // SetTodoList((todos) => [...todos, newTodoObj]);
    // console.log("queue click");

    setQueue(songs.filter((pom) => !isSameSong(pom, song)));
  };

  return (
    <Row className="border">
      <Col>
        <h2>Queue</h2>
        {songs.map((song, index) => (
          <SongItem key={index} {...song} actionButtonName={'Remove'} onAction={onSongClick} />
        ))}
      </Col>
    </Row>
  );
};
