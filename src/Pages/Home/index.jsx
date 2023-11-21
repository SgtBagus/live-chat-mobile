import React from "react";
import { useNavigate } from 'react-router-dom';

import Container from "../../Components/Container";
import CategoryList from "../../Components/CategoryList";
import Accordion from "../../Components/Accordion";

import FastSolusion from "./Components/FastSolusion";
import Button from "../../Components/Button";

const Home = () => {
  const navigate = useNavigate();
  const handelNavigate = (path) => {
    return navigate(path);
  };

  return (
    <>
      <Container className="home-section">
        <div className="home-box">
          <img
            src="https://i.pinimg.com/736x/c2/ae/9e/c2ae9e92215afbd25a8173a02adab7f4.jpg"
            className="img-fluid"
            alt="Banner Images"
          />
          <div className="home-container">
            <div>
              <h4>Hello &amp; Mulai Kordinasi nya disini ya nanti !</h4>
              <Button
                className="w-75 explore-btn"
                label="Explore Now"
                link="#"
              />
            </div>
          </div>
        </div>
      </Container>

      <Container
        className="section-t-space-3 cloth-category-section"
        title="Kategori"
        link="/category"
        linkName="Lihat Semua Kategori"
      >
        <CategoryList
          data={[
            {
              id: 1,
              src: 'https://media.printables.com/media/prints/415756/images/3449561_0766b7c8-1a3a-46e6-a783-5708bb623946/thumbs/inside/1280x960/png/qian-nian-xue-yuan.webp',
              title: 'Category List',
              link: '#',
            },
            {
              id: 2,
              src: 'https://media.printables.com/media/prints/415756/images/3449561_0766b7c8-1a3a-46e6-a783-5708bb623946/thumbs/inside/1280x960/png/qian-nian-xue-yuan.webp',
              title: 'Category List',
              link: '#',
            },
            {
              id: 3,
              src: 'https://media.printables.com/media/prints/415756/images/3449561_0766b7c8-1a3a-46e6-a783-5708bb623946/thumbs/inside/1280x960/png/qian-nian-xue-yuan.webp',
              title: 'Category List',
              link: '#',
            },
          ]}
        />
      </Container>

      <Container
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
      </Container>

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