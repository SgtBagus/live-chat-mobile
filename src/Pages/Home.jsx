import React, { Component } from 'react';

import Banner from '../Components/Banner';
import Container from '../Components/Container';
import CategoryList from '../Components/CategoryList';

class Home extends Component {
  render() {
    return (
      <>
        <Container>
          <Banner src="https://static.zerochan.net/Blue.Archive.full.4042722.jpg" alt="Banner Images" />
        </Container>
        
        <Container
          title="Kategori"
          link="/category"
          linkName="Lihat Semua Kategori"
        >
          <CategoryList />
        </Container>
      </>
    );
  }
}

export default Home;
