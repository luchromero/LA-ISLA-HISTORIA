import './FinalDos.css'

export default function FinalDos() {
    return (
        <div className="final-dos-contenedor">
          <iframe
            className='video-años'
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-lrJjWO10OY?si=ShQv9Nv_zbjt1ovD"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
        </div>
    );
}