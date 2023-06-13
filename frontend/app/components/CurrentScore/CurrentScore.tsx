import { ReactElement } from "react";

type CurrentScoreProps = {
  score: number,
}

function CurrentScore({ score }: CurrentScoreProps): ReactElement {
  return <div className="CurrentScore">{`Current Score: ${score}`}</div>;
}

export default CurrentScore;
