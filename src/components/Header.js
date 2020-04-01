import React, { useState, useCallback } from 'react';
import { Menu, Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const Header = () => {
  const { t } = useTranslation();
  const defaultLang = i18n.language;
  const [currentLang, setCurrentLang] = useState(defaultLang);

  const handleChangeLang = useCallback(lang => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  }, []);

  return (
    <Menu style={styles.menu} mode="horizontal">
      <Menu.Item key="landing">
        <Link to="/">
          <label style={styles.text}>{t('titles.landing')}</label>
        </Link>
      </Menu.Item>

      <SubMenu
        style={styles.subMenu}
        title={
          <Avatar
            size="small"
            src={require(`../static/images/${currentLang}.svg`)}
          />
        }
      >
        <Menu.Item key="tr" onClick={() => handleChangeLang('tr')}>
          <Avatar size="small" src={require(`../static/images/tr.svg`)} />
        </Menu.Item>
        <Menu.Item key="en" onClick={() => handleChangeLang('en')}>
          <Avatar size="small" src={require(`../static/images/en.svg`)} />
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

const styles = {
  menu: {
    backgroundColor: '#45789D'
  },
  subMenu: {
    float: 'right'
  },
  text: { fontFamily: 'monospace', color: 'white', fontSize: '16px' }
};

export default Header;
