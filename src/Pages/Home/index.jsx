import React from "react";

import Container from "../../Components/Container";
import CategoryList from "../../Components/CategoryList";
import Accordion from "../../Components/Accordion";

import Button from "../../Components/Button";

const Home = () => {
  return (
    <>
      <Container className="home-section">
        <div className="home-box">
          <img
            src="https://plus.unsplash.com/premium_photo-1699387204388-120141c76d51?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="img-fluid"
            alt="Banner Images"
            style={{
              transform: 'scaleX(-1)',
              filter: 'brightness(80%)',
            }}
          />
          <div className="home-container">
            <div>
              <h4>Hello &amp; Silakan mulai konsultasinya anda !</h4>
              <Button
                className="w-75 explore-btn"
                label="Konsultasi Sekarang !"
                link="#"
              />
            </div>
          </div>
        </div>
      </Container>

      <Container
        className="section-t-space-3 cloth-category-section"
        title="Penyakin yang bisa di bantu !"
        linkName="Lihat Semua Kategori"
      >
        <CategoryList
          data={[
            {
              id: 1,
              src: 'https://w7.pngwing.com/pngs/42/77/png-transparent-medicine-computer-icons-health-care-medical-assistant-health-love-text-heart-thumbnail.png',
              title: 'Demam',
              link: '#',
            },
            {
              id: 2,
              src: 'https://w7.pngwing.com/pngs/42/77/png-transparent-medicine-computer-icons-health-care-medical-assistant-health-love-text-heart-thumbnail.png',
              title: 'Sakit Kepala',
              link: '#',
            },
            {
              id: 3,
              src: 'https://w7.pngwing.com/pngs/42/77/png-transparent-medicine-computer-icons-health-care-medical-assistant-health-love-text-heart-thumbnail.png',
              title: 'Susah TIdur',
              link: '#',
            },
            {
              id: 4,
              src: 'https://w7.pngwing.com/pngs/42/77/png-transparent-medicine-computer-icons-health-care-medical-assistant-health-love-text-heart-thumbnail.png',
              title: 'Stres',
              link: '#',
            },
          ]}
        />
      </Container>

      {/* <Container
        className="section-t-space-3"
        title="Solusi Cepat"
        link="/fast-solusion"
        linkName="Lihat Semua Solusi Cepat"
      >
        <FastSolusion
          data={[
            {
              id: 1,
              title: 'Lorem Ipsum',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              stepLength: '5',
              srcImage: 'https://moewalls.com/wp-content/uploads/2023/01/ushio-noa-blue-archive-thumb.jpg',
              link: '/test',
            },
            {
              id: 2,
              title: 'Lorem Ipsum',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              stepLength: '5',
              srcImage: 'https://moewalls.com/wp-content/uploads/2023/01/ushio-noa-blue-archive-thumb.jpg',
              link: '/test2',
            },
          ]}
        />
      </Container> */}

      <Container
        className="section-t-sm-space feature-section"
        title="FAQ"
      >
        <Accordion
          idAccordion='faqHome'
          data={[
            {
              id: 1,
              title: 'Lorem Ipsum',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              show: true,
            },
            {
              id: 2,
              title: 'Lorem Ipsum',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              show: false,
            },
            {
              id: 3,
              title: 'Lorem Ipsum',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              show: false,
            },
          ]}
        />
      </Container>
    </>
  );
};

export default Home;