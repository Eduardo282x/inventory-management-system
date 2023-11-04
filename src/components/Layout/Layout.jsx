import { Banner } from "../banner/Banner"
import { Outlet as Page } from "react-router"

export const Layout = () => {
  return (
    <div>
        <Banner/>
        <Page/>
    </div>
  )
}

export default Layout
