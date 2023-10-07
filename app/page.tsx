import { getServerSession } from "next-auth"
import UnauthenticatedLanding from "./landing"
import AuthenticatedLanding from "./AuthenticatedLanding"

export default async function IndexPage() {

  // const { session } = await getSession()
  const session = await getServerSession()

  if (!session) {
    return <UnauthenticatedLanding />
  }

  return <AuthenticatedLanding />
}
