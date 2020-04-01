import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import useSimultaneousFetch from '../hooks/useSimultaneousFetch';
import { Spin, Row, Col } from 'antd';
import { Character } from '../components';
import axios from 'axios';
import { BASE_URL } from '../constants/';
import { FETCH_SINGLE_EPISODE } from '../redux/actions/episode';

const EpisodeDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const episodeDetail = useSelector(state => {
    return state.episode.mappedDataById
      ? state.episode.mappedDataById[id]
      : null;
  });
  const { characters } = episodeDetail ? episodeDetail : {};

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      try {
        const response = await axios.get(BASE_URL + '/episode/' + id);
        dispatch({ type: FETCH_SINGLE_EPISODE, payload: response });
      } catch (error) {
        console.error(error);
      }
    };
    if (!episodeDetail) {
      fetchEpisodeDetail();
    }
  }, [episodeDetail, id, dispatch]);

  const { error, isLoading, response } = useSimultaneousFetch(characters);

  if (error) {
    console.error(error);
    return <h2>{error.message}</h2>;
  }

  return (
    <Spin spinning={isLoading}>
      {episodeDetail && (
        <div>
          <label style={styles.label}>
            <ArrowRightOutlined style={styles.icon} />
            {`${t('labels.episodeName')} : ${episodeDetail.name}`}
          </label>

          <label style={styles.label}>
            <ArrowRightOutlined style={styles.icon} />
            {/* Todo: parse season and episode */}
            {`${t('labels.episode')} : ${episodeDetail.episode}`}
          </label>

          <label style={styles.label}>
            <ArrowRightOutlined style={styles.icon} />
            {`${t('labels.date')} : ${episodeDetail.air_date}`}
          </label>

          <label style={styles.label}>
            <ArrowRightOutlined style={styles.icon} />
            {`${t('labels.characterCount')} : ${
              episodeDetail.characters.length
            }`}
          </label>

          <div style={styles.charactersWrapper}>
            <Row>
              <Col span={8}>
                <label style={styles.title}>{t('labels.characters')}</label>
              </Col>
            </Row>

            <Row>
              {response &&
                response.map((character, index) => (
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    key={index}
                    style={styles.col}
                  >
                    <Character data={character.data} />
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      )}
    </Spin>
  );
};

const styles = {
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  label: {
    fontSize: '18px',
    display: 'block'
  },
  icon: { marginRight: 10 },
  labelsWrapper: {
    padding: 15
  },
  charactersWrapper: {
    marginTop: 20
  },
  col: {
    marginBottom: 20
  }
};

export default EpisodeDetail;
