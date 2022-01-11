import styled from "styled-components";

const Button = styled.button<{color? : string,bgColor?:string}>`
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    user-select: none;
    border-radius: 0.25rem;
    transition : color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    font-size: 1rem;
    color : ${props => props.theme.style.getColor(props.color)};
    background-color : ${props => props.theme.style.getColor(props.bgColor)};
    border-color : ${props => props.theme.style.getColor(props.bgColor)};
    &:hover{
        color : ${props => props.theme.style.getColor(props.color,1,'darker')};
        background-color : ${props => props.theme.style.getColor(props.bgColor,1,'darker')};
    }
    &:active,&:focus{
        color : ${props => props.theme.style.getColor(props.color,1,'darkest')};
        background-color : ${props => props.theme.style.getColor(props.bgColor,1,'darkest')};
    }
`

export default Button;