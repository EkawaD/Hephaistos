import { Button, Modal, MultiSelect, Select } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Document, Page } from 'react-pdf';

import CV from '../../components/CV';
import ProfilForm from '../../components/ProfilForm';
import LettreM from '../../components/LM'
// import ClassicCV from '../components/pages/profil/CV/ClassicCV';
// import { useSession } from 'next-auth/react';




export default function Profil({ data }: { data: User }) {

    const session = {
        data: {
            user: data,
        },
        status: "authenticated"
    }

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
            const res = await fetch(`/api/user/${user.id}`)
            const data = await res.json()
            setUser(data)
            const templates = {
                dev: <CV data={data} />,
                // classic: <ClassicCV />
            }
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




    if (!user) return <div>Loading ...</div>
    return (

        <>
            <div className="cvForm">
                <Select ref={templateSelect} data={["dev"]} label="Template CV" />
                <Select ref={refSelect} data={user.lettres.map((l: Lettre) => l.title)} label="Lettre de motivation" />
                <MultiSelect value={refs} onChange={setRefs} data={user.refs.map((r) => r.file)} label="R??f??rences" />
                <Button color="dark" className="preview" onClick={() => updateData()}>Preview</Button>
            </div>

            <h1 className="tittle"> Profil Demo</h1>
            <div className="signout_button" >
                <Button color="dark" variant="outline" size="xs" component='a' href="/"> Se d??connecter </Button>
            </div>
            <div className="profil" >


                <ProfilForm user={user} />

                <Modal opened={opened} onClose={() => setOpened(false)} size={"clamp('50vw', '90vw')"}>
                    <ReactToPrint
                        trigger={() => <Button color="dark" className="print">T??l??charger le .pdf !</Button>}
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

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const baseURl = process.env.NEXTAUTH_URL
    const res = await fetch(`${baseURl}/api/cv/demo`)
    const data = await res.json()

    return {
        props: {
            data: JSON.parse(JSON.stringify(data))
        }
    }
}