import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import '../App.css';



const NavBar = () => {
  return(
    <nav class="navbar navbar-dark navbar-expand-lg navbar-light bg-dark">
    <a class="navbar-brand" href="/">Web Database</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">Insert</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Search">Search</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Update">Update</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Delete">Delete</a>
        </li>
      </ul>
      
    </div>
  </nav>
            
  );
};
  

export default NavBar