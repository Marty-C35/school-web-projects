import {Col, Row, Spinner} from 'react-bootstrap';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {completeLibraryState, libraryState, queueState} from '../state/atom';
import type {Song} from '../types';
import {SongItem} from './SongItem';

const NoConnection = () => (
  <Row className="border mt-5">
    <Col>
      <h3>No internet connection!</h3>
    </Col>
  </Row>
);

export const isSameSong = (a: Song, b: Song) =>
  a.name === b.name && a.coverURL === b.coverURL && a.author === b.author && a.length === b.length;

export const Library = () => {
  const setLibrary = useSetRecoilState(libraryState);
  const setQueue = useSetRecoilState(queueState);
  const setCompleteLibrary = useSetRecoilState(completeLibraryState);
  const completeLibrary = useRecoilValue(completeLibraryState);
  const queue = useRecoilValue(queueState);

  useEffect(() => {
    axios
      .get<Song[]>(`https://www.fi.muni.cz/~xorsula1/resources/songs.php`)
      .then((songs) => {
        setLibrary(songs.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);
  const songs: Song[] = useRecoilValue(libraryState);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const onSongClicked = (song: Song) => {
    setQueue((songs) => [...songs, song]);
  };

  const lib = () => {
    setCompleteLibrary(!completeLibrary);
  };

  const getLibrarySongs = () => {
    if (completeLibrary) {
      return songs;
    }

    const onlyInLeft = (songs: Song[], queue: Song[], isSongSame: any) =>
      songs.filter((leftValue) => !queue.some((rightValue) => isSongSame(leftValue, rightValue)));

    return onlyInLeft(songs, queue, isSameSong);
  };

  if (error) return <NoConnection />;

  return (
    <Row className="border mt-5">
      <Col>
        <Row>
          <Col>
            <h2>Library</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              className="form-check-input me-2 mb-3"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={() => {
                lib();
              }}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Show songs already in queue
            </label>
          </Col>
        </Row>
        {loading && (
          <Row>
            <Col>
              <Spinner animation="border" />
            </Col>
          </Row>
        )}
        {getLibrarySongs().map((song, index) => (
          <SongItem key={index} {...song} actionButtonName={'Add'} onAction={onSongClicked} />
        ))}
      </Col>
    </Row>
  );
};
