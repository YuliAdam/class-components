import React from 'react';
import Header from './components/header/Header';
import Main from './components/Main';
import Footer from './components/footer/Footer';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}
