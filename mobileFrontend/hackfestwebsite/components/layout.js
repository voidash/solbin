import Navbar from "./Navbar";
const Layout = ({children}) => {
    return (  
        <div className=" bg-bgBlue">
            <Navbar/>
            {children}
        </div>
    );
}
 
export default Layout;