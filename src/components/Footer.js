import React from 'react';
import { Layout } from 'antd';

const { Footer: FooterComp } = Layout;

const Footer = () => {
  return (
    <FooterComp style={styles.footer}>
      Pankod Frontend Challenge Created by Çağatay Sert
    </FooterComp>
  );
};

const styles = {
  footer: {
    backgroundColor: '#45789D',
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    clear: 'both',
    position: 'relative',
    height: '70px',
    marginTop: '-70px'
  }
};
export default Footer;
