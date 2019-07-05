import React,{Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth';
import {itemTotal} from './cartHelpers';
const isActive=(history,path)=>{
    if(history.location.pathname===path){
        return 'active'
    } else{
        return '';
    }
}

const Menu=({history})=> {
    return (
        <nav className="mb-1 navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to='/' className="navbar-brand">MyBook</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
            aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
            <ul className="navbar-nav mr-auto">
            <li className={'nav-item' + isActive(history,'/') }>
                <Link className="nav-link" to='/'>Home
                <span className="sr-only">(current)</span>
                </Link>
            </li>
            <li className={'nav-item' + isActive(history,'/shop') }>
                <Link className="nav-link" to='/shop'>Shop
                </Link>
            </li>
            <li className={'nav-item' + isActive(history,'/cart') }>
                <Link className="nav-link" to='/cart'>Cart <sup><small className='badge'>{itemTotal()}</small></sup>
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <Fragment>
                    <li className={'nav-item' + isActive(history,'/admin/dashboard') }>
                        <Link className="nav-link" to='/admin/dashboard'>Dashboard</Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <Fragment>
                    <li className={'nav-item' + isActive(history,'/user/dashboard') }>
                        <Link className="nav-link" to='/user/dashboard'>Dashboard</Link>
                    </li>
                </Fragment>
            )}
            {!isAuthenticated() && (
                <Fragment>
                    <li className={'nav-item' + isActive(history,'/signin') }>
                        <Link className="nav-link" to='/signin'>SignIn</Link>
                    </li>
                    <li className={'nav-item' + isActive(history,'/signup') }>
                        <Link className="nav-link" to='/signup'>SignUp</Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}
            </ul>
        </div>
        </nav>
    )
}

export default withRouter(Menu);
