import { Button, Modal, MultiSelect, Select } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Document, Page } from 'react-pdf';
import Image from "next/image"

import CV from '../components/CV';
import ProfilForm from '../components/ProfilForm';
import LettreM from '../components/LM'
import { signOut, useSession } from 'next-auth/react';
// import ClassicCV from '../components/pages/profil/CV/ClassicCV';





export default function Profil() {


    const session = useSession()


    const [user, setUser] = useState<User>();
    const [opened, setOpened] = useState(false)
    const [lm, setLm] = useState<Lettre>()
    const [refs, setRefs] = useState([""])
    const [template, setTemplate] = useState()
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        setUser(session.data ? session.data.user as User : undefined)
        setShouldRender(false)
    }, [shouldRender, session])

    const updateData = async () => {
        try {
            const baseURl = process.env.NEXTAUTH_URL
            const res = await fetch(`${baseURl}/api/user/${user.id}`)
            const data = await res.json()
            setUser(data)
            setTemplate(templates[templateSelect.current.value])
            const lettre = user.lettres.find((l: Lettre) => l.title === refSelect.current.value)
            setLm(lettre)
            setOpened(true)
            setShouldRender(true)
        } catch (error) {
            console.log(error)
        }
    }
    const componentRef = useRef(null);
    const refSelect = useRef(null)
    const templateSelect = useRef(null)
    const templates = {
        dev: <CV data={user} />,
        // classic: <ClassicCV />
    }

    if (session.status === "unauthenticated") return <div className='redirect'> Please <a href="/" style={{ margin: "0.5rem" }}> Sign In </a> to view this page</div>
    if (!user) return <div>Loading ...</div>
    return (

        <>

            <div className="cvForm">
                <Select ref={templateSelect} data={Object.keys(templates)} label="Template CV" />
                <Select ref={refSelect} data={user.lettres.map((l: Lettre) => l.title)} label="Lettre de motivation" />
                <MultiSelect value={refs} onChange={setRefs} data={user.refs.map((r) => r.file)} label="Références" />
                <Button color="dark" className="preview" onClick={() => updateData()}>Preview</Button>
            </div>

            <div className="discord_avatar">
                <Image alt="avatar" width={50} height={50} src={user.image}></Image>
                <p> {user.name} </p>

            </div>
            <div className="signout_button" >
                <Button color="dark" variant="outline" size="xs" onClick={() => signOut()}> Se déconnecter </Button>
            </div>

            <div className="profil" >


                <ProfilForm user={user} />

                <Modal opened={opened} onClose={() => setOpened(false)} size={"clamp('50vw', '90vw')"}>
                    <ReactToPrint
                        trigger={() => <Button color="dark" className="print">Télécharger le .pdf !</Button>}
                        content={() => componentRef.current}
                    />
                    <div ref={componentRef}>
                        <>
                            {template}
                            {lm && <LettreM user={user} lm={lm} dev={true} />}
                            {refs.map((ref, key) =>
                                ref &&
                                <Document key={key} file={ref}>
                                    <Page pageNumber={1} width={950} />
                                </Document>
                            )}
                        </>
                    </div>
                </Modal>
            </div >


        </>
    )

}

