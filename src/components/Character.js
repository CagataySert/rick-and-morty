import React from 'react';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

const { Meta } = Card;

const Character = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={<img alt="character" src={data.image} />}
    >
      <Meta
        title={data.name}
        description={
          <div>
            <label style={styles.label}>{`${t('labels.species')} : ${
              data.species
            }`}</label>

            <label style={styles.label}>{`${t('labels.status')} : ${
              data.status
            }`}</label>

            <label style={styles.label}>
              {`${t('labels.gender')} : ${data.gender}`}
            </label>
          </div>
        }
      />
    </Card>
  );
};

const styles = {
  label: {
    fontSize: '18px',
    display: 'block'
  }
};

export default Character;
