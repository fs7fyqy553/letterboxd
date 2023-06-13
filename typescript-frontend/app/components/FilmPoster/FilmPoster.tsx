import { ReactElement } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

type FilmPosterProps = {
  portraitModeURL: string,
  landscapeModeURL: string,
}

function FilmPoster({ portraitModeURL, landscapeModeURL }: FilmPosterProps): ReactElement {
  const useLandscapeImage = useMediaQuery("(max-height: 400px)");
  const backgroundImageURL = (useLandscapeImage) ? landscapeModeURL : portraitModeURL;

  return (
    <div className="FilmPoster" style={{ backgroundImage: `url(${backgroundImageURL})` }} />
  );
}

export default FilmPoster;
