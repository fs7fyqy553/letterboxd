import "../styles/LoadingFilmDetails.css";

function LoadingFilmDetails({ areLoadingAnimationsEnabled, setAreLoadingAnimationsEnabled }) {

    return (
        <div className="LoadingFilmDetails">
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
            <div className="LoadingText"
                data-shown={!areLoadingAnimationsEnabled}
            >
                Loading...
            </div>
        </div>
    );
}

export default LoadingFilmDetails;