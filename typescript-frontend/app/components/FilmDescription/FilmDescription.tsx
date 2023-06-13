import { ReactElement } from "react";

type FilmDescriptionProps = {
  filmTitle: string,
  releaseYearString: string,
  directorNameArray: string[],
  averageRatingString: string,
  showAverageRating: boolean,
}

function FilmDescription({
  filmTitle,
  releaseYearString,
  directorNameArray,
  averageRatingString,
  showAverageRating,
}: FilmDescriptionProps): ReactElement {
  return (
    <div className="FilmDescription">
      <div>
        <strong>{filmTitle}</strong> ({releaseYearString})
      </div>
      <div>
        <strong>Directed By:</strong> {directorNameArray.join(", ")}
      </div>
      {showAverageRating && (
        <div>
          <strong>Rating:</strong> {averageRatingString}/5
        </div>
      )}
    </div>
  );
}

export default FilmDescription;
