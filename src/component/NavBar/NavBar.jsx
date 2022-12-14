import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  const [show, setShow] = useState(false);

  const navBarVisibility = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navBarVisibility);

    return () => {
      window.removeEventListener("scroll", navBarVisibility);
    };
  }, []);

  const reDirectHandler=()=>{
    window.location.replace("/Search");
  }

  return (
    <div className={`navBar ${show && "navBarBlack"} `}>
      <Link to="/" className="navBarLogo">
        Movie App
      </Link>
      <FontAwesomeIcon className="navBarSearch" icon={faSearch} onClick={reDirectHandler} />
    </div>
  );
};

export default NavBar;


// import React, { useEffect, useState } from 'react'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
// import './NavBar.scss'

// const NavBar = () => {
//     const navigate = useNavigate()
//     const [show, setShow] = useState(false)
//     const navBarVisibility = () => {
//         if (window.scrollY > 100) return setShow(true)
//         return setShow(false)
//     }
//     useEffect(() => {
//         window.addEventListener('scroll', navBarVisibility)
//         return () => window.removeEventListener('scroll', navBarVisibility)
//     }, [])

//     return (
//         <>
//             <div className={`navBar ${show && 'navBarBlack'}`}>
//                 <Link to="/" className="navBarLogo">
//                     Movie App
//                 </Link>
//                 <FontAwesomeIcon
//                     className="navBarSearch"
//                     icon={faSearch}
//                     onClick={() => navigate('/search')}
//                 />
//             </div>
//         </>
//     )
// }

// export default NavBar
