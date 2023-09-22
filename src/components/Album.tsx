import { useEffect, useState } from "react"
import { Container } from './Container'
import { PhotoContainer } from "./PhotoContainer"
import { Title } from "./Title"
import { PopUp } from "./PopUp"
import { TopLevelContainer } from "./TopLevelContainer"
import { PopUpImage } from "./PopUpImage"
import { HeaderPanel } from "./HeaderPanel"
import { NavLink } from "./NavLink"

interface Photo {
  id: number,
  thumbnailUrl: string,
  title: string,
  url: string
}

const Album = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [albumTitle, setAlbumTitle] = useState<string>("No title")
  const [displayPhoto, setDisplayPhoto] = useState<string>("")
  const [displayPopUp, setDisplayPopUp] = useState<boolean>(false)

  useEffect(() => {
    const getAlbum = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums/1')
      const album = await response.json()
      setAlbumTitle(album.title ?? "No title")
      const photosOfAlbumOne = await fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
      const photos = await photosOfAlbumOne.json()
      setPhotos(photos)
    }

    getAlbum()
  }, [])

  const clickPhoto = (url: string) => () => {
    console.log(url)
    setDisplayPhoto(url)
    setDisplayPopUp(true)
  }

  const toggle = () => {
    setDisplayPhoto("")
    setDisplayPopUp(false)
  }

  return <TopLevelContainer>
    <HeaderPanel>
      <Title>{albumTitle}</Title>
      <NavLink to={"/addUser"}>Add New User</NavLink>
    </HeaderPanel>
    <Container>
      {photos.map((photo, index) => {
        return <PhotoContainer key={`image-${index}`} onClick={clickPhoto(photo.url)}><img src={photo.thumbnailUrl} alt={photo.title} width={50} height={50} /></PhotoContainer>
      })}
    </Container>
    {displayPopUp && <PopUp onClick={toggle} />}
    {displayPopUp && <PopUpImage src={displayPhoto} alt="" width={600} height={600} loading="lazy" />}
  </TopLevelContainer>
}

export default Album