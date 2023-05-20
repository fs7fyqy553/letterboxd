import useMediaQuery from "@mui/material/useMediaQuery";

function FilmPoster({ portraitModeURL, landscapeModeURL }) {
  const useLandscapeImage = useMediaQuery("(max-height: 400px)");
  const backgroundImageURL = (useLandscapeImage) ? landscapeModeURL : portraitModeURL;
  return (
    <div className="img" style={{ backgroundImage: `url(${backgroundImageURL})` }} />
  );
}

export default FilmPoster;
