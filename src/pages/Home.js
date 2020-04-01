import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_EPISODES } from '../redux/actions/episode';
import useFetch from '../hooks/useFetch';
import { Spin, Card, Tooltip, Row, Col, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  //hooks
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { response, error, isLoading } = useFetch('/episode', page);

  const episodes = useSelector(state => state.episode.data);

  const handleChangePage = useCallback(e => {
    setPage(e);
  }, []);

  if (error) {
    console.error(error.message);
    return <h2>{error.message}</h2>;
  }

  if (response) {
    dispatch({ type: FETCH_EPISODES, payload: response.results });
  }
  return (
    <Spin spinning={isLoading}>
      <Row style={styles.row}>
        <label>Rick And Morty {t('titles.episodes')}</label>
      </Row>
      <Row style={styles.row}>
        {episodes &&
          episodes.length > 0 &&
          episodes.map((episode, index) => {
            return (
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={6}
                key={index}
                style={styles.col}
              >
                <Tooltip placement="top" title={episode.name}>
                  <Card
                    title={<label style={styles.label}>{episode.name}</label>}
                    extra={
                      <Link to={`/episode/${episode.id}`}>
                        {t('labels.detail')}
                      </Link>
                    }
                    style={styles.card}
                  >
                    <p> {`${t('labels.episode')} : ${episode.episode}`} </p>
                    <p>{`${t('labels.date')}: ${episode.air_date}`}</p>
                    <p>{`${t('labels.characterCount')}: ${
                      episode.characters.length
                    }`}</p>
                  </Card>
                </Tooltip>
              </Col>
            );
          })}
      </Row>
      <Row>
        <Col offset={20} span={4}>
          <Pagination
            onChange={handleChangePage}
            defaultCurrent={1}
            defaultPageSize={20}
            total={response ? response.info.count : 0}
          />
        </Col>
      </Row>
    </Spin>
  );
};

const styles = {
  row: {
    marginBottom: '20px'
  },
  col: {
    marginBottom: '20px'
  },
  card: {
    color: '#fff',
    width: 300,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  label: {
    color: '#fff'
  }
};

export default Home;
