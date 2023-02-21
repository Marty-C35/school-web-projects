import {Button, Col, Row} from 'react-bootstrap';
import {useRecoilValue} from 'recoil';
import type {Song} from '../types';
import {humanizeSongLength} from '../misc/utils';
import {queueState} from '../state/atom';

export type SongProps = Song & {
  /**
   *  The actionButton* props serve to wire up the button. Use for adding/removing songs to and from queue
   */
  actionButtonName: string;
  onAction: ({author, name, coverURL, length}: Song) => void;
};

const isSameSong = (a: Song, b: Song) =>
  a.name === b.name && a.coverURL === b.coverURL && a.author === b.author && a.length === b.length;

export const SongItem = ({author, name, coverURL, length, actionButtonName, onAction}: SongProps) => {
  const queue = useRecoilValue(queueState);
  return (
    <Row className="border d-flex align-items-center p-1">
      <Col md="3">
        <img className="img-fluid" src={coverURL} alt="song cover" style={{maxHeight: 50}} />
      </Col>
      <Col md="2">
        <span>{name}</span>
      </Col>
      <Col md="2">
        <span>{author}</span>
      </Col>
      <Col md="2">
        <span>{humanizeSongLength(length)}</span>
      </Col>
      <Col md="3">
        <Button
          variant="outline-primary"
          onClick={() => {
            onAction({author, name, coverURL, length});
          }}
          disabled={
            actionButtonName === 'Add' && queue.some((pom) => isSameSong(pom, {name, coverURL, author, length}))
          }
        >
          {actionButtonName}
        </Button>
      </Col>
    </Row>
  );
};
