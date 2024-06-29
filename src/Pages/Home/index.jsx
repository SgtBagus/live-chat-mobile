import React from "react";
import { useNavigate } from 'react-router-dom';

import Container from "../../Components/Container";
import CategoryList from "../../Components/CategoryList";
import Accordion from "../../Components/Accordion";

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
                onClick={() => handelNavigate('/chat-bot')}
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
              title: 'Apakah aplikasi ini sudah sepenuhnya dikembangkan ?',
              desc: 'Aplikasi ini masih dalam tahap perkembangan. Kami terus bekerja untuk memperbaiki dan memperluas fitur-fitur yang ada untuk memberikan pengalaman terbaik kepada pengguna.',
              show: true,
            },
            {
              id: 2,
              title: 'Apakah chatbot ini dapat menjawab semua pertanyaan kesehatan ?',
              desc: 'Chatbot ini masih belum bisa menjelaskan beberapa penyakit di luar kategori yang telah ditentukan. Kami merekomendasikan Anda untuk memeriksa kategori yang tersedia sebelum mengajukan pertanyaan.',
              show: false,
            },
            {
              id: 3,
              title: 'Apakah saya bisa mendapatkan penanganan profesional melalui aplikasi ini ?',
              desc: 'Untuk penanganan profesional yang lebih spesifik dan mendalam, kami sangat menyarankan Anda untuk berkonsultasi langsung dengan dokter. Aplikasi ini dimaksudkan untuk memberikan informasi awal dan bukan untuk menggantikan saran medis profesional.',
              show: false,
            },
            {
              id: 4,
              title: 'Apakah data pribadi saya aman ?',
              desc: 'Kami sangat memperhatikan privasi dan keamanan data Anda. Semua informasi yang Anda berikan akan disimpan dengan aman dan tidak akan dibagikan kepada pihak ketiga tanpa izin Anda.',
              show: false,
            },
            {
              id: 5,
              title: 'Bagaimana cara memberikan masukan atau saran ?',
              desc: 'Kami sangat menghargai masukan dan saran dari pengguna. Anda dapat memberikan masukan dengan cara menghubungi email saya yaitu "procw57@gmail.com" untuk umpan balik di dalam aplikasi. Masukan Anda sangat berharga untuk peningkatan layanan kami.',
              show: false,
            },
          ]}
        />
      </Container>
    </>
  );
};

export default Home;