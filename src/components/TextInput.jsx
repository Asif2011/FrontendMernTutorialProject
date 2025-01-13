import style from './TextInput.module.css'

function TextInput({errorMessage,...props}) {
    return (
        <div className={style.textInputWrapper}>
            <input {...props} />
            {props.error && (<p className={style.errorMessage}>{errorMessage}</p>)}
        </div >
    )
}

export default TextInput