document.addEventListener("DOMContentLoaded", function () {


    const header = document.querySelector("header");
    const nav = document.querySelector("header nav");

    if (header && nav) {

        const menuButton = document.createElement("button");

        menuButton.className = "mobile-menu-button";
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-label", "Open menu");

        header.appendChild(menuButton);


        menuButton.addEventListener("click", function () {

            nav.classList.toggle("mobile-nav-open");

            const isOpen =
                nav.classList.contains("mobile-nav-open");

            if (isOpen) {

                menuButton.innerHTML = "✕";

                menuButton.setAttribute(
                    "aria-label",
                    "Close menu"
                );

            } else {

                menuButton.innerHTML = "☰";

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        });


        
        const navLinks =
            nav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    nav.classList.remove(
                        "mobile-nav-open"
                    );

                    menuButton.innerHTML = "☰";

                }
            );

        });


        

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 768) {

                    nav.classList.remove(
                        "mobile-nav-open"
                    );

                    menuButton.innerHTML = "☰";

                }

            }
        );

    }

});