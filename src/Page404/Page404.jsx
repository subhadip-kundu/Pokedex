import React from 'react';
import './Page404.css';
import { Link } from 'react-router-dom';


const Page404 = (props) => {
  
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <section className="page_404">
      <div className="container">
        <div className="row">  
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center text-404">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <p>Can't find pokemon called : <span className='capitalize'>{props.text}</span></p>
                <Link to="/" className="link_404" onClick={handleGoHome}>Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
