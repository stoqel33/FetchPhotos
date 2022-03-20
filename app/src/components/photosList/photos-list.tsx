import React from "react";
import styled from "styled-components";
import { IPhoto } from "../../App";

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Photo = styled.img`
    width: 30%;
    height: auto;
    object-fit: contain;
    margin: 10px 15px;

` 

interface IProps {
    photos: IPhoto[]
}

export const PhotosList = ({photos}: IProps) => {
    return (
        <Wrapper>
            {
                photos.map((photo: IPhoto) => (
                    <Photo
                        key={photo.id}
                        src={`http://source.unsplash.com/${photo.url}`}
                        alt={`Author: ${photo.author}`}
                    >
                    </Photo>
                ))
            }
        </Wrapper>
    )
}