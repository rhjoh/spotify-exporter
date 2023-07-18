import "./tracklistitem.css"

export const TrackListItem = (props: any) => {
    return (
        <div className="track-list-item">
            <div className="track-list-item-info">
                <div className="track-list-item-artist">
                    <span id="middledot">&#183; </span>
                    <span>{props.track.track.artists[0].name}</span>
                </div>
                <div className="track-list-item-track">
                    <span>{props.track.track.name}</span>
                </div>
            </div>
            <div className="track-list-item-link">
                {/* eslint-disable-next-line */}
                <a href={props.track.track.external_urls.spotify} className="bi bi-box-arrow-up-right"></a>
            </div>
        </div>
    )
}
