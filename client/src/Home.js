import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowRight } from 'react-icons/md';
import BgImg from './assets/img1.jpeg';
const Section = styled.section`
background-image: url(${BgImg});
  height: 900px;
  width:100%;
  display: block;
  
  background-repeat: no-repeat;
  background-size: auto;
  background-size: 1500px 800px;
`;

const Content = styled.div`
  width: 100%;
  height: 100px;
`;

const Left = styled.div`
padding-left: 350px;
padding-top: 100px;
`;

const Title = styled.p`
  font-size: 8vw;
  color: #2feded  ;
  font-weight: 400;
`;



const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  margin-top:20px;
  width: 371px;
  height: 71px;
  line-height: 71px;
  font-size: 5vwpx;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  background: linear-gradient(90deg, #0546d6, #3f89fc);
  text-decoration: none;
  box-shadow: 0 15px 14px rgb(0 42 177 / 12%);
`;


const Home = () => {
  return (
    <Section>
      <Content>
        <Left>
          <Title>
            BOOK A TICKET <br /> AND ENJOY!
          </Title>
          
          <Button href='/main' >
            <span>BOOK NOW!</span>
            <MdKeyboardArrowRight />
          </Button>
        </Left>
      </Content>
    </Section>
    
  );
};

export default Home;