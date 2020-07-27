import styled from 'styled-components'


export const Select = styled.select`
margin: 20px;
width 230px;
border 2px solid black;
height: 30px;
border-radius: 10px;
&:focus {
    outline:0
}

`
export const Input = styled.input`
margin: 20px;
width 230px;
border 2px solid black;
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
background-color: #fff;
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
export const Form = styled.form`
display:flex;
flex-direction: column;
justify-content: center;
align-items:center;
margin: 10px;
`

export const DatePickerStyle = styled.div`

input {
    margin: 20px;
    width 230px;
    border 2px solid black;
    height: 30px;
    border-radius: 10px;
}
`
export const Error = styled.p`
color: red;
`