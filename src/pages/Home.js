import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_EPISODES } from '../redux/actions/episode';
import useFetch from '../hooks/useFetch';
import { Spin, Card, Tooltip, Row, Col, Pagination, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const Home = () => {
  //hooks
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { response, error, isLoading } = useFetch('/episode', page);
  const [episodes, setEpisodes] = useState([]);

  const episodesData = useSelector(state => state.episode.data);

  useEffect(() => {
    setEpisodes(episodesData);
  }, [setEpisodes, episodesData]);

  const handleChangePage = useCallback(e => {
    setPage(e);
  }, []);

  const handleFilterChange = useCallback(
    e => {
      if (e === 'greater') {
        const filteredData = episodesData.filter(
          episode => episode.characters.length > 20
        );
        setEpisodes(filteredData);
      } else if (e === 'lower') {
        const filteredData = episodesData.filter(
          episode => episode.characters.length <= 20
        );
        setEpisodes(filteredData);
      } else {
        setEpisodes(episodesData);
      }
    },
    [episodesData]
  );

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
        <Col span={8}>
          <label>Rick And Morty {t('titles.episodes')}</label>
        </Col>
        <Col offset={8} span={8}>
          <Select
            placeholder={t('placeholders.selectCharacterCount')}
            style={styles.select}
            onChange={handleFilterChange}
          >
            <Option value="all">{t('labels.all')}</Option>
            <Option value="greater">{t('labels.greaterThan')}</Option>
            <Option value="lower">{t('labels.lowerThan')}</Option>
          </Select>
        </Col>
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
  },
  select: { width: 200, float: 'right' }
};

export default Home;
