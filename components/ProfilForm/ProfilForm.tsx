
import { useForm } from "@mantine/form"
import { showNotification } from '@mantine/notifications';

import styles from "./ProfilForm.module.css"
import Form from "../Crud/Form"
import CrudTable from "../Crud/CrudTable"
import Input from "../Crud/Form/Input"
import { useRouter } from "next/router";



export default function ProfilForm({ user }: { user: User }) {

    const router = useRouter()
    const isDemo = router.pathname.startsWith("/demo")

    const handleFile = async (formData) => {

        try {
            const response = await fetch('/api/uploads', { method: "POST", body: formData });
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (profil: Profil) => {
        try {
            if (!isDemo) {
                if (user.profil !== null) {

                    const res = await fetch(`/api/profil/${user.profil.id}`, {
                        method: "PUT",
                        headers: {
                            Authorization: "application/json",
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ...profil, userId: user.id })
                    });
                } else {
                    const res = await fetch(`/api/profil`, {
                        method: "POST",
                        headers: {
                            Authorization: "application/json",
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ...profil, userId: user.id })
                    });
                }
            }
            showNotification({
                title: 'Great success 😎 !',
                message: "Vos informations ont bien étés mises à jour !",
                color: "green"
            })
        } catch (error) {
            console.log(error)
            showNotification({
                title: 'Unexpected error :/',
                message: error.message,
                color: "red"
            })

        }
    }

    const form = useForm({
        initialValues: user.profil ||
        {
            avatar: "",
            color: "",
            name: "",
            firstname: "",
            tel: "",
            mail: "",
            linkedin: "",
            github: "",
            website: "",
            intro: "",
        }
    })

    const experienceSchema = {
        entreprise: { type: "text", label: "Entreprise" },
        poste: { type: "long", label: "Poste" },
        place: { type: "text", label: "Lieu" },
        startDate: { type: "date", label: "Date de début" },
        endDate: { type: "date", label: "Date de fin" },
        description: { type: "textarea", label: "Description" },
    }
    const diplomeSchema = {
        title: { type: "long", label: "Intitulé" },
        diplomaDate: { type: "date", label: "Année d'obtention" },
        school: { type: "text", label: "École" },
        place: { type: "text", label: "Lieu" },
        description: { type: "textarea", label: "Description" }
    }
    const skillSchema = {
        skill: { type: "text", label: "Compétence" },
        tech: { type: "checkbox", label: "Technique ?" },
    }
    const hobbySchema = {
        name: { type: "text", label: "Hobby" },
    }
    const lettreSchema = {
        title: { type: "text", label: "Tittle" },
        objet: { type: "long", label: "Objet" },
        content: { type: "content", label: "Contenu" },
    }
    const refSchema = {
        file: { type: "file", label: "Choisir un fichier", handler: handleFile },
    }
    const projectSchema = {
        image: { type: "image", label: "Choisir un fichier", handler: handleFile },
        title: { type: "text", label: "Titre" },
        github: { type: "text", label: "Github" },
        demo: { type: "text", label: "Demo" },
        description: { type: "textarea", label: "Description" },
    }

    return (
        <>
            <div className={styles.container}>

                <div className={styles.forms}>
                    <Form form={form} handler={handleSubmit} className={styles.profil}>
                        <Input name="avatar" form={form} type='image' handler={handleFile} >Changer photo de profil</Input>
                        <Input name="color" form={form} type='color'>Couleur</Input>
                        <Input name="name" form={form} type='text'>Nom</Input>
                        <Input name="firstname" form={form} type='text'>Prénom</Input>
                        <Input name="tel" form={form} type='text'>Téléphone</Input>
                        <Input name="mail" form={form} type='text'>Email</Input>
                        <Input name="linkedin" form={form} type='text'>LinkedIn</Input>
                        <Input name="github" form={form} type='text'>GitHub</Input>
                        <Input name="website" form={form} type='text'>Website</Input>
                        <Input name="intro" form={form} type='textarea' >Intro</Input>
                    </Form>
                    <CrudTable<Experience>
                        title={"Expériences"}
                        items={user.experiences}
                        schema={experienceSchema}
                        baseURL={!isDemo ? "/api/experience" : undefined}
                        addValue={!isDemo ? { userId: user.id } : undefined}
                    />
                    <CrudTable<Diplome>
                        title={"Diplômes"}
                        items={user.diplomes}
                        schema={diplomeSchema}
                        baseURL={!isDemo ? "/api/diplome" : undefined}
                        addValue={!isDemo ? { userId: user.id } : undefined}
                    />
                    <CrudTable<Skill>
                        title={"Compétences"}
                        items={user.skills}
                        schema={skillSchema}
                        baseURL={!isDemo ? "/api/skill" : undefined}
                        addValue={!isDemo ? { userId: user.id } : undefined}
                    />
                    <CrudTable<Hobby>
                        title={"Hobby"}
                        items={user.hobbies}
                        schema={hobbySchema}
                        baseURL={!isDemo ? "/api/hobby" : undefined}
                        addValue={!isDemo ? { userId: user.id } : undefined}
                    />
                    <CrudTable<Lettre>
                        title={"Lettres de motivation"}
                        items={user.lettres}
                        schema={lettreSchema}
                        baseURL={!isDemo ? "/api/lettre" : undefined}
                        addValue={!isDemo ? { userId: user.id } : undefined}
                    />
                    <CrudTable<Ref>
                        title={"Références PDF"}
                        items={user.refs}
                        schema={refSchema}
                        baseURL={!isDemo ? "/api/ref" : undefined}
                        addValue={!isDemo ? { userId: user.id } : undefined}
                    />
                    <CrudTable<Project>
                        title={"Projets"}
                        items={user.projects}
                        schema={projectSchema}
                        baseURL={!isDemo ? "/api/project" : undefined}
                        addValue={!isDemo ? { userId: user.id } : undefined}
                    />
                </div>


            </div>
        </>
    );

}




