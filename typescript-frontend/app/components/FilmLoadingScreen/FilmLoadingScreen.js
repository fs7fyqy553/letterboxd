function FilmLoadingScreen({ areLoadingAnimationsEnabled, setAreLoadingAnimationsEnabled }) {

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