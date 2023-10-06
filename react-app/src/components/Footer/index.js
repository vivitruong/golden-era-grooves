import React from "react";


function Footer() {

return(
    <>
    <nav
    class="navbar navbar-expand-lg navbar-dark navbar-tertiary justify-content-between">
    <ul class="navbar-nav navbar-nav-hover flex-row align-items-center">
        <li class="nav-item">
            <a href="../index.html" class="nav-link" role="button">
                <span class="nav-link-inner-text">📺 Start</span>
            </a>
        </li>
        <li class="nav-item">
            <a href="../docs/introduction.html" class="nav-link"
                role="button">
                <span
                    class="nav-link-inner-text">📕 Documentation</span>
            </a>
        </li>
    </ul>
    <div class="time text-center">
        <span class="time text-uppercase text-white">1:47 PM</span>
    </div>
</nav>


    </>

)
}

export default Footer;
