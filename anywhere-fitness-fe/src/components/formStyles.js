import styled from 'styled-components'

export const HeaderDiv = styled.div`
background-color: #AED9E0;
width: 100%;
display:flex;
justify-content: center;
align-items: center;
color: black;
height: 70px;
border-radius: 40px 40px 0px 0px;
border-bottom: 1px solid black;
background: linear-gradient(to right, #AED9E0, #B8F2E6);
`

export const FormAlign = styled.div`
display:flex;
flex-direction: column;
justify-content: flex-end;
align-items:flex-end;
max-width: 400px;
border: 1px solid black;
padding: 20px;
border-radius: 10px;

`
export const SelectContainer = styled.div`
display:flex;
align-items: center;

`
export const Select = styled.select`
margin: 20px;
width: 230px;
border: 2px solid black;
height: 30px;
border-radius: 10px;
&:focus {
    outline:0
}


`
export const Input = styled.input`
margin: 20px;
width: 230px;
border: 2px solid black;
height: 30px;
border-radius: 10px;
padding: 5px 10px;

&:focus {
    outline:0
}
`

export const Button = styled.button`
width: 140px;
height: 45px;
font-family: 'Roboto', sans-serif;
font-size: 11px;
text-transform: uppercase;
letter-spacing: 2.5px;
font-weight: 500;
color: #000;
background: linear-gradient(to right, #AED9E0, #B8F2E6);
border: none;
border-radius: 45px;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease 0s;
cursor: pointer;
outline: none;
display:flex;
align-items:center;
justify-content: center;
margin: 10px;

&:hover {

background-color: #2EE59D;
box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
color: #fff;
transform: translateY(-7px);
}
&:focus {
    outline:0
}
`
export const FormStyle = styled.form`

display:flex;
flex-direction: column;
justify-content: center;
align-items:center;
margin: 10px;

`
export const Error = styled.p`
color: red;
`
