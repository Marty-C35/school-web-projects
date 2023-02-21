import {Button, Col, Row} from 'react-bootstrap';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import type {Song} from '../../types';
import {humanizeSongLength} from '../../misc/utils';
import {playedState, queueState} from '../../state/atom';
import {NextSong} from './NextSong';

// Do not worry about actual playback, just make skipping to next song work
export const Player = () => {
  const setQueue = useSetRecoilState(queueState);
  const queue = useRecoilValue(queueState);
  const setPlayed = useSetRecoilState(playedState);
  const played = useRecoilValue(playedState);

  const nextClicked = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1));
      setPlayed(played + 1);
    }
  };

  const currentSong: Song = queue[0];

  return (
    <Row className="mt-5 d-flex justify-content-between border align-items-center" style={{flexGrow: 1}}>
      <Col>
        <img className="img-fluid" src={currentSong?.coverURL} alt="song cover" style={{maxHeight: 100}} />
      </Col>
      <Col>
        <Row>
          <Col>
            <span>Playing: {currentSong?.name || 'None'}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="small">{currentSong?.author || 'None'}</span>
          </Col>
          <Col>
            <span className="small">00:00/{humanizeSongLength(currentSong?.length || 0)}</span>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="m-2">
            <Button variant="success">Play</Button>
          </Col>
        </Row>
        <Row>
          <Col className="m-2">
            <Button variant="dark" onClick={nextClicked}>
              Next
            </Button>
          </Col>
        </Row>
      </Col>
      <Col>
        <NextSong />
      </Col>
    </Row>
  );
};
