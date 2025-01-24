import style from './developer.module.css'
// import pic from 'public/Asif_Raza_CV_pic_v2_2023.png'

function Developer() {
    let response;
    response = <div className={style.devWrapper}>
        <img 
            src='Asif_Raza_CV_pic_v2_2023.png' alt='developer pic'
        />
        <h3>
            About Developer
        </h3>
        <p className={style.aboutDevPara}>
            I am Educationist with deep passsion of learning Development and have diverse
            experience of technologies and also have been freelancing at upwork in leisure
            time.
        </p>
        <h3>
            Profile Links
        </h3>
        <div className={style.linksWrapper}>
        <a href="http://www.linkedin.com/in/asif-raza-dev-2019" target="_blank" rel="noreferrer">LinkedIn Profile</a>
        <a href="https://www.upwork.com/freelancers/~0142b8e14c32c575b0" target="_blank" rel="noreferrer">Upwork Profile</a>
        <a href="https://github.com/Asif2011" target="_blank" rel="noreferrer">Github Profile</a>
        </div>
        <h3>Contact me</h3>
        <div className={style.linksWrapper}>
        <a href="https://wa.me/923208797317" target="_blank" rel="noreferrer">Whatsapp</a>
        <a href="mailto:asfrza2008@gmail.com" target="_blank" rel="noreferrer">Email</a>
        </div>

    </div>

    return response
}

export default Developer;