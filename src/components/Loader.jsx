import { ThreeDots } from 'react-loader-spinner'
import style from './Loader.module.css'

function Loader({ text }) {
    return (
        <div className={style.loaderWrapper}>
            <ThreeDots visible={true}
                height="80"
                width="80"
                color="#767173FF"
                radius="9" />
            <h3>
                {text}
            </h3>
        </div>
    )
}

export default Loader;  // Exporting the component