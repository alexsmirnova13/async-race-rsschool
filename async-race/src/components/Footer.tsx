import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
height: 150px;
background-color: SeaGreen;
display: flex;
flex-direction: row;
justify-content: space-around;
alighn-items: center;
img{
padding-top: 50px;
width: 200px;
}
p{
color: black;
font-size: 30px;
padding-top: auto;
line-height: 100px;
}
`;
function Footer() {
  return (
    <Wrapper>
      <a target="blank" href="https://github.com/alexsmirnova13">
        <img src="https://www.seekpng.com/png/full/192-1923313_2-februari-github-logo-png-white.png" alt="logo-github" />
      </a>
      <p>2022</p>
      <a target="blank" href="https://rs.school/js/">
        <img src="https://rs.school/images/rs_school_js.svg" alt="logo-RSSchool" />
      </a>
    </Wrapper>
  );
}

export default Footer;
