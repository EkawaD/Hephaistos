
import { Button } from "@mantine/core"
import { signIn } from "next-auth/react"
import { FaDiscord } from "react-icons/fa"


export default function Home() {



  return (
    <>
      <div className="home">
        <h1>Bienvenue sur Héphaïstos LOL votre générateur de CV automatique !</h1>
        <Button
          color="gray"
          className="discordButton"
          size="xl"
          onClick={() => signIn("discord", { callbackUrl: "https://hephaistos-ekawad.vercel.app/profil" })}
        >
          <FaDiscord size={30} className="icon" />Se connecter avec Discord
        </Button>
        OU
        <Button
          color="gray"
          size="xl"
          component="a"
          href="/demo/profil"
        >
          Essayer la démo !
        </Button>
      </div>
    </>
  )

}

