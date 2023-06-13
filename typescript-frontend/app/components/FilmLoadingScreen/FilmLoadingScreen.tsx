import { Dispatch, SetStateAction, ReactElement } from "react";

type FilmLoadingScreenProps = {
    areLoadingAnimationsEnabled: boolean,
    setAreLoadingAnimationsEnabled: Dispatch<SetStateAction<boolean>>,
}

function FilmLoadingScreen(
    { areLoadingAnimationsEnabled, setAreLoadingAnimationsEnabled }: FilmLoadingScreenProps
): ReactElement {

    return (
        <div className="FilmLoadingScreen">

            {areLoadingAnimationsEnabled
            &&
                <div className="LoadingAnimationContainer">
                    <button
                        className="Spinner"
                        data-enabled={areLoadingAnimationsEnabled}
                        onClick={() => setAreLoadingAnimationsEnabled((false))}
                        aria-label="Loading animation, clicking simply removes it"
                    >
                    </button>
                    <span
                        className="TooltipText"
                        aria-hidden="true"
                    >
                        Click Animation to Disable
                    </span>
                </div>
            }

            <div className="LoadingText"
                data-displayed={!areLoadingAnimationsEnabled}
            >
                Loading...
            </div>

        </div>
    );
}

export default FilmLoadingScreen;