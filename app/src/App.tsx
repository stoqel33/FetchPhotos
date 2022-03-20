import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { CustomButton } from './components/customButton/custom-button';
import { PhotosList } from './components/photosList/photos-list';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
`

const ButtonWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 50px;
`

interface IData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface IPhoto {
  id: string;
  author: string;
  url: string;
}

export const App = () => {

  const [data, setData] = useState<IData[]>([])
  const [displayPhotos, setDisplayPhotos] = useState<IPhoto[]>([])
  const [photoAmount, setPhotoAmount] = useState(3)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchData()

  }, [])

  useEffect(() => {
    !!data.length && setInitialPhotos()
    
  }, [data])
  
  useEffect(() => {
    !!displayPhotos.length && setIsLoading(false)

  }, [displayPhotos])

  useEffect(() => {
    !!data.length && setNewPhoto()

  }, [photoAmount])

  const fetchData = () => {
    fetch("https://picsum.photos/v2/list")
      .then(resp => resp.json())
      .then(data => setData(data))
  }

  const setInitialPhotos = () => {
    const photos: IPhoto[] = []

    for (let i = 0; i < 3; i++) {
      photos.push({
        id: data[i].id,
        author: data[i].author,
        url: data[i].url.split('/').at(-1) as string
      })
    }

    setDisplayPhotos(photos)
  }

  const setNewPhoto = () => {
    const newPhotos: IPhoto[] = []
    for (let i = displayPhotos.length; i < photoAmount; i++) {
      const newPhoto: IPhoto = {
        id: data[i].id,
        author: data[i].author,
        url: data[i].url.split('/').at(-1) as string
      }

      newPhotos.push(newPhoto)
    }

    setDisplayPhotos((prevState) => ([...prevState, ...newPhotos]))
  } 

  const handleNextImage = () => {
    setIsLoading(true)
    setPhotoAmount((prevState) => prevState + 3)
  }
  return (
    <Wrapper>
      {
        !!displayPhotos.length && <PhotosList photos={displayPhotos}/>
      }
      {
        data.length > (photoAmount + 1) &&
        <ButtonWrapper>
          <CustomButton
            text="Next"
            onClick={handleNextImage}
            isBusy={isLoading}
          />
        </ButtonWrapper>
      }
    </Wrapper>
  );
}
