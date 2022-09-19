import React from 'react';
import styled from 'styled-components';
import ICar from '../interfaces/Car';

const Wrapper = styled.div`
.popup {
position: fixed;
width:100%;
height:100%;
bacground-color: rgba(0,0,0,0.8);
top: 0;
left: 0;
}
.popup__body{
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 10px;

}
.popup__content{
    background-color: white;
    color: black;
    padding: 30px;
    max-width: 800px;
    position: relative;
}
a{
position: absolute;
right: 10px;
top: 10px;
font-size: 25px;
color: black;
text-decoration: none;
}
p{
    font-size: 25px;
    margin: 0 0 1em 0;
}
`;

interface IPopupProps {
  winner: ICar;
  winnerTime: number;
  action: ()=>void
}

function Popup(props:IPopupProps) {
  const { winner, winnerTime, action } = props;

  const popupText = [`Выиграл этот чел -> ${winner.name} #${winner.id}`, `Time: ${winnerTime}`];

  return (
    <Wrapper>
      <div className="popup" id="popup">
        <div className="popup__body">
          <div className="popup__content">
            <button type="button" onClick={action}>Х</button>
            {popupText.map((u, i) => <p key={i}>{u}</p>)}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Popup;
