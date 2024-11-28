"use client"
import Image from 'next/image'

const LinkBlogFeed = ({ avatar, email}) => {
    return (
        <>
            <div className="imagen">
                <Image
                    className="imagen-imagen"
                    // src={item?.author[0]?.avatar === "" || item?.author[0]?.avatar === null || item?.author[0]?.avatar === undefined ? "/img/title-doraemon.jpg" : item?.author[0]?.avatar}
                    src={avatar === "" || avatar === null || avatar === undefined ? "/img/title-doraemon.jpg" : avatar}
                    alt="Perfil" width={20} height={20}
                />
            </div>
            <div className="nombre">
                {/* <p> {item?.author[0]?.email} </p> */}
                <p> {email} </p>
            </div>
        </>
    )
}

export default LinkBlogFeed