import { useState } from "react";
import { useRouter } from "next/router";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import styled from "styled-components";

import fetchData from "@/utils/fetchData";
import StyledButton from "@/components/common/StyledButton";
import Loading from "@/components/layout/Loading";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ImagePreview = styled.img`
  width: 100vw;
  height: 100vh;
`;

const ToggleButton = styled(StyledButton)`
  position: absolute;
  top: 3vh;
  left: 3vw;
  color: ${(props) => props.theme.primary.color};
  background-color: ${(props) => props.theme.white.color};
  z-index: 2;
`;

const Message = styled.div`
  width: 100%;
  position: fixed;
  top: 40vh;
  text-align: center;
  font-size: 10vw;
  color: ${(props) => props.theme.primary.color};
  background-color: ${(props) => props.theme.white.color};
  z-index: 2;
`;

function Photo({ isMobile, idealResolution, handleClose }) {
  const [dataUri, setDataUri] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const [detected, setDetected] = useState("");
  const [startedCamera, setStartedCamera] = useState(true);

  async function handleTakePhoto(uri) {
    console.log("takePhoto");
    setDataUri(uri);

    const response = await fetchData("POST", "/api/photo", uri);

    if (response.result) {
      const { _id, name } = response.data;
      setDetected(name);
      router.push(`/product/${_id}`);
      return;
    }

    setIsError(true);

    setTimeout(() => {
      setDataUri("");
      setIsError(false);
    }, 1000);
  }

  function handleStart() {
    setStartedCamera((prev) => !prev);
  }

  return (
    <Container>
      {startedCamera && <Loading />}
      <ToggleButton onClick={handleClose}>X</ToggleButton>
      {detected && <Message>{detected}</Message>}
      {isError && <Message>TRY AGAIN!</Message>}
      {
        (dataUri)
          ? <ImagePreview src={dataUri} alt="photo by user" />
          : (
            <Camera
              onTakePhotoAnimationDone={handleTakePhoto}
              isImageMirror={false}
              idealFacingMode={FACING_MODES.ENVIRONMENT}
              isFullscreen={isMobile}
              imageCompression={0.9}
              sizeFactor={0.9}
              imageType={IMAGE_TYPES.JPG}
              isDisplayStartCameraError={false}
              idealResolution={idealResolution}
              onCameraStart={handleStart}
            />
          )
      }
    </Container>
  );
}

export default Photo;
