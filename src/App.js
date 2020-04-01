import React from 'react';
import './App.css';
import { Header, Footer } from './components';
import { Layout } from 'antd';
import Main from './components/Main';

const { Content } = Layout;

const App = () => {
  return (
    <div className="app">
      <Header />
      <Content style={styles.content}>
        <Main />
      </Content>
      <Footer />
    </div>
  );
};

const styles = {
  content: { padding: '50px 50px', marginBottom: '50px' }
};

export default App;
