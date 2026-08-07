A/*

*/

document.addEventListener("DOMContentLoaded", () => {

/* =====================================================
   CURRENT YEAR
   ===================================================== */

const yearElements = document.querySelectorAll("[data-current-year]");

yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
});


/* =====================================================
   BACK TO TOP BUTTON
   ===================================================== */

const backToTop = document.createElement("button");

backToTop.type = "button";
backToTop.className = "back-to-top";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.setAttribute("title", "Back to top");
backToTop.innerHTML = "↑";

document.body.appendChild(backToTop);

const updateBackToTop = () => {

    if (window.scrollY > 500) {
        backToTop.hidden = false;
        backToTop.style.opacity = "1";
        backToTop.style.pointerEvents = "auto";
    } else {
        backToTop.hidden = true;
        backToTop.style.opacity = "0";
        backToTop.style.pointerEvents = "none";
    }

};

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);

updateBackToTop();


/* =====================================================
   SMOOTH INTERNAL LINKS
   ===================================================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =====================================================
   IMAGE ERROR HANDLING
   ===================================================== */

document.querySelectorAll("img").forEach((image) => {

    image.addEventListener("error", () => {

        image.classList.add("image-error");

        image.setAttribute(
            "alt",
            image.getAttribute("alt") || "Image unavailable"
        );

    });

});


/* =====================================================
   EXTERNAL LINKS
   ===================================================== */

document.querySelectorAll("a[href]").forEach((link) => {

    const href = link.getAttribute("href");

    if (!href) {
        return;
    }

    if (
        href.startsWith("http://") ||
        href.startsWith("https://")
    ) {

        try {

            const url = new URL(href);

            if (url.hostname !== window.location.hostname) {

                link.setAttribute("target", "_blank");
                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        } catch (error) {
            // Ignore invalid URLs.
        }

    }

});


/* =====================================================
   CURRENT PAGE NAVIGATION
   ===================================================== */

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("nav a[href]").forEach((link) => {

    const linkPage =
        link.getAttribute("href").split("/").pop();

    if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")
    ) {

        link.setAttribute(
            "aria-current",
            "page"
        );

    }

});


/* =====================================================
   SIMPLE SITE SEARCH FOUNDATION
   ===================================================== */

const searchForms =
    document.querySelectorAll(
        'form[data-site-search]'
    );

searchForms.forEach((form) => {

    form.addEventListener("submit", (event) => {

        const input =
            form.querySelector(
                'input[type="search"], input[name="q"]'
            );

        if (!input) {
            return;
        }

        const query =
            input.value.trim();

        if (!query) {
            event.preventDefault();

            input.focus();

            return;
        }

    });

});


/* =====================================================
   GALLERY IMAGE VIEWER FOUNDATION
   ===================================================== */

const galleryImages =
    document.querySelectorAll(
        ".gallery-item img, [data-lightbox]"
    );

if (galleryImages.length > 0) {

    const viewer =
        document.createElement("div");

    viewer.className = "image-viewer";
    viewer.setAttribute("role", "dialog");
    viewer.setAttribute("aria-modal", "true");
    viewer.setAttribute(
        "aria-label",
        "Image viewer"
    );

    viewer.innerHTML = `
        <button
            type="button"
            class="image-viewer-close"
            aria-label="Close image viewer"
        >
            ×
        </button>

        <img
            class="image-viewer-image"
            src=""
            alt=""
        >
    `;

    document.body.appendChild(viewer);

    const viewerImage =
        viewer.querySelector(
            ".image-viewer-image"
        );

    const closeViewer =
        viewer.querySelector(
            ".image-viewer-close"
        );

    const hideViewer = () => {

        viewer.classList.remove("active");

        document.body.style.overflow = "";

        viewerImage.src = "";
        viewerImage.alt = "";

    };

    const showViewer = (image) => {

        viewerImage.src =
            image.currentSrc ||
            image.src;

        viewerImage.alt =
            image.alt ||
            "Shravani Mela photograph";

        viewer.classList.add("active");

        document.body.style.overflow = "hidden";

        closeViewer.focus();

    };

    galleryImages.forEach((image) => {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {
            showViewer(image);
        });

    });

    closeViewer.addEventListener(
        "click",
        hideViewer
    );

    viewer.addEventListener(
        "click",
        (event) => {

            if (event.target === viewer) {
                hideViewer();
            }

        }
    );

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                viewer.classList.contains("active")
            ) {

                hideViewer();

            }

        }
    );

}


/* =====================================================
   FAQ ACCESSIBILITY
   ===================================================== */

document.querySelectorAll(
    ".faq-item summary"
).forEach((summary) => {

    summary.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                const details =
                    summary.parentElement;

                details.open =
                    !details.open;

            }

        }
    );

});


/* =====================================================
   MOBILE TABLE SAFETY
   ===================================================== */

document.querySelectorAll("table").forEach((table) => {

    if (
        !table.parentElement.classList.contains(
            "table-wrapper"
        )
    ) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "table-wrapper";

        table.parentNode.insertBefore(
            wrapper,
            table
        );

        wrapper.appendChild(table);

    }

});


/* =====================================================
   CONSOLE CONFIRMATION
   ===================================================== */

console.log(
    "Shravani Mela 2026 website JavaScript loaded successfully."
);

});
