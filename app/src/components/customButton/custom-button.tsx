import React from "react";
import styled from "styled-components";

const Button = styled.button`
    padding: 10px 20px;
    margin: 10px;
    border: none;
    background-color: purple;
    color: white;
    cursor: pointer;
`

interface IProps {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isBusy: any;
}

export const CustomButton = ({text, onClick, isBusy}: IProps) => (
    <Button onClick={onClick} disabled={isBusy}>
        {text}
    </Button>
)