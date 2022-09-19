import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
height: 150px;
background-color: SeaGreen;
display: flex;
flex-direction: row;
justify-content: space-between;
alighn-items: center;
padding: 0 20px 0 40px;
img{
width: 150px;
};
ul{
display: flex;
flex-direction: row;
}
li{
padding: 40px 20px 0 40px;
list-style-type: none;
}
a{
text-decoration: none;
color: black;
font-size: 30px;
}
`;

interface IHeaderProps {
  children: React.ReactNode
}

function Header(props: IHeaderProps) {
  const { children } = props;
  return (
    <Wrapper>
      <div>
        <a href="../main/index.html">
          <img alt="race-logo" src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/59364/car-race-logo-clipart-xl.png" />
        </a>
      </div>
      <nav>
        <ul className="menu" id="menu">
          {children}
        </ul>
      </nav>
    </Wrapper>
  );
}

export default Header;
