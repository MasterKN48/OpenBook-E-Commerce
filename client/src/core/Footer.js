import React from 'react'

const Footer = () => {
    return (
  <footer className="page-footer pt-4 mt-4 text-center text-md-left mdb-color lighten-2">
    <div className="container">
      <div className="row">
        <div className="col-md-3 mr-auto">
          <h5 className="text-uppercase mb-3">Footer Content</h5>
          <p>Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.</p>
        </div>
      </div>
    </div>
    <hr>
    <div className="social-section text-center">
      <ul className="list-unstyled list-inline">

        <li className="list-inline-item">
          <a className="btn-floating btn-fb">
            <i className="fa fa-facebook"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-tw">
            <i className="fa fa-twitter"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-gplus">
            <i className="fa fa-google-plus"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-li">
            <i className="fa fa-linkedin"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-dribbble">
            <i className="fa fa-dribbble"> </i>
          </a>
        </li>

      </ul>
    </div>
    <div className="footer-copyright py-3 text-center">
      <div className="container-fluid">
        &copy; 2018 Copyright:
        <a href="#"> MDBootstrap.com </a>

      </div>
    </div>

  </footer>
    )
}

export default Footer
