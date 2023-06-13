import { ReactElement } from "react";

type HighScoreProps = {
  score: number,
}

function HighScore({ score }: HighScoreProps): ReactElement {
  return <div className="HighScore">{`High Score: ${score}`}</div>;
}

export default HighScore;
