import {Col, Container, Row} from 'react-bootstrap';
import {RecoilRoot} from 'recoil';
import {Queue} from './Queue';
import {Library} from './Library';
import {Player} from './Player/Player';
import {Stats} from './Stats';

export const Homepage = () => {
  return (
    <Container>
      <RecoilRoot>
        <Row>
          <Col>
            <h1>Web music player</h1>
          </Col>
        </Row>
        <Queue />
        <Library />
        <Player />
        <Stats />
      </RecoilRoot>
    </Container>
  );
};
