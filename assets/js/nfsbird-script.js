// Variable values calculated on load
(() => {
    function getCalculatedCssVariables() {
        // Initial window height
        let heroVh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--rd-vh', `${heroVh}px`);

        // Site header height
        let headerEl = document.getElementById('rd-site-header');
        document.documentElement.style.setProperty('--rd-headerHeight', `${headerEl.offsetHeight}px`);

        // Header Top Nav height
        let headerTopNavEl = document.getElementById('rd-header-top-nav');
        document.documentElement.style.setProperty('--rd-topNavHeight', `${headerTopNavEl.offsetHeight}px`);

        // Secondary Nav Height
        let secNavEl = document.getElementById('rd-secondary-nav');
        document.documentElement.style.setProperty('--rd-secNavHeight', `${secNavEl.offsetHeight}px`);

        // Bottom Nav Height
        let bottomNavEl = document.getElementById('rd-bottom-nav');
        document.documentElement.style.setProperty('--rd-bottomNavHeight', `${bottomNavEl.offsetHeight}px`);
    }
    getCalculatedCssVariables();

    // Recalculate variables upon horizontally resizing the window
    let resizePrevWidth = window.innerWidth;
    window.addEventListener('resize', (e) => {
        let resizeCurrentWidth = window.innerWidth;
        if (resizeCurrentWidth !== resizePrevWidth) {
            // Update previous width
            resizePrevWidth = resizeCurrentWidth;
            // Close drawers
            getCalculatedCssVariables();
        }
    });
})();



// Generic helpers
function elAddClass(el, classname) {
    if (!el.classList.contains(classname)) {
        el.classList.add(classname);
    }
}
function elRemoveClass(el, classname) {
    if (el.classList.contains(classname)) {
        el.classList.remove(classname);
    }
}



// Hero slider
(() => {
    // Initialise slider
    const heroSlider = new Splide('#nfsbird-hero-slider', {
        speed: 1000,
        type: 'loop',
        mediaQuery:'min',
        arrows:false,
        breakpoints: {
            '1200':{
                arrows:true,
            }
        }
    }).mount();
})();


// Flipcard Slider
(() => {
    // Note for SBI Card team: Maximum 8 cards should be visible in the slider below at any time, irrespective of whether any filters are applied or not.

    // Initialise slider
    const flipCardSlider = new Splide('#nfsbird-products-slider', {
        type:'slide',
        autoWidth:true,
        mediaQuery: 'min',
        perPage: 1,
        perMove: 1,
        gap: 20,
        padding: { left: 20, right: 20 },
        breakpoints: {
            '480': {
                perPage: 1,
                perMove: 1,
                autoWidth:true
            },
            '590': {
                perPage: 2,
                perMove: 1,
                type:'slide',
                autoWidth:false
            },
            '768': {
                perPage: 2,
                perMove: 1,
            },
            '920': {
                perPage: 3,
                perMove: 2,
            },
            '1024': {
                perPage: 3,
                perMove: 1,
                padding: { left: 10, right: 10 },
            },
            '1280': {
                perPage: 4,
                perMove: 4,
                padding: { left: 10, right: 10 }
            },
            '1320': {
                perPage: 4,
                perMove: 4,
            }
        },
        speed: 1000,
    }).mount();

    const flipcardSelector = '[data-flipcard]';
    const flipcardObjectSelector = '[data-flipcard-object]';
    const flipcardToggleClass = 'rd-flipped';
    const flipcardCloseSelector = '[data-flipcard-close]';
    const flipCardsList = document.querySelectorAll(flipcardSelector);
    // Flip cards when clicked
    flipCardsList.forEach((card) => {
        card.querySelector('[data-flipcard-open]').addEventListener('click', (e) => {
            const activeFlippedCard = document.querySelector('.rd-flipped');
            if(activeFlippedCard){
                activeFlippedCard.classList.remove(flipcardToggleClass)
            }
            const cardObject = card.querySelector(flipcardObjectSelector);
            cardObject.classList.add(flipcardToggleClass);
        })

        card.querySelectorAll('[data-flipcard-close]')[1].addEventListener('click', (e) => {
            const cardObject = card.querySelector(flipcardObjectSelector);
            cardObject.classList.remove(flipcardToggleClass);
        })
    });

    // Reset all cards before the slider is moved
    flipCardSlider.on('move', () => {
        flipCardsList.forEach((card) => {
            const cardObject = card.querySelector(flipcardObjectSelector);
            if (cardObject.classList.contains(flipcardToggleClass)) {
                cardObject.classList.remove(flipcardToggleClass);
            }
        });
    });
    })();


// benefits left card slider
(() => {
    // Initialise slider
    const benefitsSlider = new Splide('#benefits-carousel-card', {
        speed: 1000,
        type: 'fade',
        rewind: true,
        autoplay: true,
        interval: 2800,
        speed: 1000
        // pauseOnHover: true

    }).mount();
    benefitsSlider.on('active', function (a) {
        if (a.slide.classList.contains('dark')) {
            benefitsSlider.Components.Elements.pagination.style.color = 'rgba(255, 255, 255)'
        } else {
            benefitsSlider.Components.Elements.pagination.style.color = 'rgba(45, 45, 45)'
        }
    })
})();
// // Deals  carousel
(() => {
    // Initialise slider
    const dealsSlider = new Splide('#deals-carousel', {
        type: 'loop',
        interval: 2800,
        speed: 1000,
        perPage: 2,
        // focus: 'center',
        gap: 20,
        perMove: 1,
        padding: 190,
        dragMinThreshold: 10,
        perPage: 2,
        lazyLoad: 'nearby',
        padding: { top: 30, bottom:30,left:300,right:300 },
                // start:1,
        grid: {
                dimensions: [ [ 1, 1 ], [ 2, 1 ],[1,1],[ 2, 1 ],[1,1],[ 2, 1 ],[1,1],[ 2, 1 ]],
                gap : {
                    row: '20px',
                    col: '20px',
                },
            },
        mediaQuery: 'min',
        breakpoints: {
            '280': {
                perPage: 1,
                padding: 40,
                grid:false
            },
            '590': {
                perPage: 1,
                padding: 40,
                grid: {
                    dimensions: [ [ 1, 1 ], [1,1]],
                    gap : {
                        row: '20px',
                        col: '20px',
                    },
                }
            },
            '768': {
                perPage: 1,
                padding: { top: 30, bottom:30,left:145,right:145},
                grid: {
                    dimensions: [ [ 1, 1 ], [ 2, 1 ],[1,1],[ 2, 1 ],[1,1],[ 2, 1 ],[1,1],[ 2, 1 ]],
                    gap : {
                        row: '20px',
                        col: '20px',
                    },
                }
            },
            '920': {
                perPage: 1,
                padding: { top: 30, bottom:30,left:230,right:230},
            },
            '1024': {
                perPage: 2,
                padding: { top: 30, bottom:30,left:145,right:145},
            },
            '1200': {
                perPage: 2,
                padding: { top: 30, bottom:30,left:190,right:190 },
            },
            '1536': {
                perPage: 2,
                padding: { top: 30, bottom:30,left:300,right:300 },
            }
        },
    }).mount(window.splide.Extensions);
})();

// // Digital Channels carousel
(() => {
    // Initialise slider
    const digitalChannelSlider = new Splide('#digitalChannel-carousel', {
        speed: 1000,
        type:'slide',
        rewind:true,
        interval: 2800,
        speed: 1000,
        perPage: 2,
        gap: 20,
        start:1,
        perMove: 1,
        perPage: 2,
        lazyLoad: 'nearby',
        padding: { top: 30, bottom:30,left:300,right:300 },
        mediaQuery: 'min',
        breakpoints: {
            '280': {
                perPage: 1,
                padding: 40,
            },
            '590': {
                perPage: 1,
                padding: 40,
            },
            '768': {
                perPage: 1,
                padding: { top: 30, bottom:30,left:145,right:145},
            },
            '920': {
                perPage: 1,
                padding: { top: 30, bottom:30,left:230,right:230},
            },
            '1024': {
                perPage: 2,
                padding: { top: 30, bottom:30,left:145,right:145},
            },
            '1200': {
                perPage: 2,
                padding: { top: 30, bottom:30,left:190,right:189 },
            },
            '1536': {
                perPage: 2,
                padding: { top: 30, bottom:30,left:300,right:299 },
            }
        },

    }).mount();
    digitalChannelSlider.on('moved', function (a) {

        let val = a
        if(digitalChannelSlider.n.perPage == 2){
            val = a+1
        }
        switch (val) {
            case 2:
                appSlider.Components.Autoplay.play()
                appSlider.Components.Elements.slides[0].querySelector('dotlottie-player').play();
                break;
            case 3:
                ilaSlider.Components.Autoplay.play()
                if(ilaSlider.Components.Elements.slides[0].querySelector('dotlottie-player')){
                    ilaSlider.Components.Elements.slides[0].querySelector('dotlottie-player').play();
                }
                break;

            default:
                break;
        }

    })
    digitalChannelSlider.on('inactive', function (a) {
        switch (a.index) {
            case 1:
                websiteSlider.Components.Autoplay.pause()
                websiteSlider.Components.Elements.slides[0].querySelector('dotlottie-player').pause();
                break
            case 2:
                appSlider.Components.Autoplay.pause()
                appSlider.Components.Elements.slides[0].querySelector('dotlottie-player').pause();
                break;
            case 3:
                ilaSlider.Components.Autoplay.pause()
                if(ilaSlider.Components.Elements.slides[0].querySelector('dotlottie-player')){
                    ilaSlider.Components.Elements.slides[0].querySelector('dotlottie-player').pause();
                }
                break;

            default:
                break;
        }

    })

// Whatsapp Inner Slider

    // Initialise slider
    const whatsappSlider = new Splide('#whatsapp-carousel-card', {
        autoplay: false,
        interval: 6000,
        speed: 1800,
        perPage: 1,
        lazyLoad: 'nearby',
        perMove: 1,
        drag:false,
        pauseOnHover: true

    }).mount();
    whatsappSlider.on('active', function (currentSlide) {
        if (currentSlide.slide.querySelector('dotlottie-player')) {
            setTimeout(() => {
                currentSlide.slide.querySelector('dotlottie-player').seek(0)
                currentSlide.slide.querySelector('dotlottie-player').play();
                // currentSlide.slide.querySelector('dotlottie-player').addEventListener('frame',function(a){
                //     if(a.detail.seeker > 98){
                //       this.pause();
                //     }
                // })
            }, 100);
        }
        if(currentSlide.index === whatsappSlider.Components.Elements.slides.length -1){
            whatsappSlider.Components.Autoplay.pause();
            document.querySelector('#whatsapp-carousel-card').classList.add('rd-autoplay-stopped')
        }
    })

// Website Inner Slider

    // Initialise slider
    const websiteSlider = new Splide('#website-carousel-card', {
        autoplay: false,
        interval: 6000,
        speed: 1800,
        perPage: 1,
        lazyLoad: 'nearby',
        perMove: 1,
        drag:false,
        pauseOnHover: true
    }).mount();
    websiteSlider.on('active', function (currentSlide) {
        if (currentSlide.slide.querySelector('dotlottie-player')) {
            setTimeout(() => {
                currentSlide.slide.querySelector('dotlottie-player').seek(0)
                currentSlide.slide.querySelector('dotlottie-player').play();
                // currentSlide.slide.querySelector('dotlottie-player').addEventListener('frame',function(a){
                //     if(a.detail.seeker > 98){
                //       this.pause();
                //     }
                // })
            }, 100);
        }
        if(currentSlide.index === websiteSlider.Components.Elements.slides.length -1){
            websiteSlider.Components.Autoplay.pause();
            document.querySelector('#website-carousel-card').classList.add('rd-autoplay-stopped')
        }
    })
// Mobile App Inner Slider

    // Initialise slider
    const appSlider = new Splide('#app-carousel-card', {
        autoplay: false,
        interval: 6000,
        speed: 1800,
        perPage: 1,
        lazyLoad: 'nearby',
        perMove: 1,
        drag:false,
        pauseOnHover: true

    }).mount();
    appSlider.on('active', function (currentSlide) {
        if (currentSlide.slide.querySelector('dotlottie-player')) {

            currentSlide.slide.querySelector('dotlottie-player').seek(0)
            currentSlide.slide.querySelector('dotlottie-player').play();
            // currentSlide.slide.querySelector('dotlottie-player').addEventListener('frame',function(a){
            //     if(a.detail.seeker > 98){
            //       this.pause();
            //     }
            // })
        }
        if(currentSlide.index === appSlider.Components.Elements.slides.length -1){
            appSlider.Components.Autoplay.pause();
            document.querySelector('#app-carousel-card').classList.add('rd-autoplay-stopped')
        }
    })


// ILA App Inner Slider

    // Initialise slider
    const ilaSlider = new Splide('#ila-carousel-card', {
        autoplay: false,
        interval: 6000,
        lazyLoad: 'nearby',
        speed: 1800,
        perPage: 1,
        perMove: 1,
        drag:false,
        pauseOnHover: true

    }).mount();
    ilaSlider.on('active', function (currentSlide) {
        if (currentSlide.slide.querySelector('dotlottie-player')) {
            currentSlide.slide.querySelector('dotlottie-player').seek(0)
            currentSlide.slide.querySelector('dotlottie-player').play();
            // currentSlide.slide.querySelector('dotlottie-player').addEventListener('frame',function(a){
            //     if(a.detail.seeker > 98){
            //       this.pause();
            //     }
            // })
        }
        if(currentSlide.index === ilaSlider.Components.Elements.slides.length -1){
            ilaSlider.Components.Autoplay.pause();
            document.querySelector('#app-carousel-card').classList.add('rd-autoplay-stopped')
        }
    })


    window.addEventListener('scroll',()=>{
        const allFadeMeUps = document.querySelectorAll('.fade-me-up');
        for (let i = 0; i < allFadeMeUps.length; i++) {
            const element = allFadeMeUps[i];
            const linkToTheElement = document.querySelector('#rd-secondary-ul-desktop a[href="#'+element.id+'"]');
            let fadeOffset =  element.offsetTop + (element.offsetHeight/2);
            if(window.innerWidth<768){
                fadeOffset =  element.offsetTop + ((element.offsetHeight/3));
            }
            if(window.scrollY > fadeOffset){
                if(window.innerWidth>1023){
                    // if(linkToTheElement){

                    //     linkToTheElement.classList.add('rd-text-brand-black');
                    //     linkToTheElement.classList.remove('rd-text-brand-grey');
                    // }
                }
                if(element.classList.contains('faded')){
                    continue
                }
                element.classList.add('faded')
                switch (element.id) {
                    case 'rd-digital-section':
                        handleDigitalCarouselInitiation();
                        break;

                    default:
                        break;
                }
            }else{
                if(linkToTheElement && window.innerWidth>1023){
                    linkToTheElement.classList.remove('rd-text-brand-black');
                    linkToTheElement.classList.add('rd-text-brand-grey');
                }
            }
        }

        const allDataSrc = document.querySelectorAll('[data-src]');
        allDataSrc.forEach(el => {
            if(!el.src.includes(el.dataset.src) && el.parentElement.offsetHeight >0){
                el.src = el.dataset.src
                if(el.parentElement.tagName == 'VIDEO'){
                    el.parentElement.load();
                }
                // if(el.tagName === 'dotLOTTIE-PLAYER'){
                //     el.mount();
                // }
            }
        });

    })
    function handleDigitalCarouselInitiation(){

        websiteSlider.Components.Autoplay.play();
        websiteSlider.Components.Elements.slides[0].querySelector('dotlottie-player').play();
        websiteSlider.Components.Elements.slides[0].querySelector('dotlottie-player').addEventListener('frame',function(a){
            console.log(a.detail);
            if(a.detail.seeker > 98){
                console.log(this);
              this.pause();
            }
        })
        if(window.innerWidth > 920){
            appSlider.Components.Autoplay.play();
            if(appSlider.Components.Elements.slides[0].querySelector('dotlottie-player')){
                appSlider.Components.Elements.slides[0].querySelector('dotlottie-player').play();
            }
        }

    }
})();

// Knowledge Centre carousel
(() => {
    // Initialise slider
    const knowledgeSlider = new Splide('#rd-knowledge-carousel', {
        type: 'loop',
        interval: 2800,
        speed: 1000,
        perPage: 2,
        gap: 20,
        perMove: 1,
        padding: 190,
        dragMinThreshold: 10,
        mediaQuery: 'min',
        breakpoints: {
            '280': {
                perPage: 1,
                padding: 40,
            },
            '590': {
                perPage: 1,
                padding: 40,
            },
            '768': {
                perPage: 1,
                padding: { top: 30, bottom:30,left:145,right:145},
            },
            '920': {
                perPage: 1,
                padding: { top: 30, bottom:30,left:230,right:230},
            },
            '1024': {
                perPage: 2,
                padding: { top: 30, bottom:30,left:145,right:145},
            },
            '1200': {
                perPage: 2,
                padding: { top: 30, bottom:30,left:190,right:190 },
            },
            '1536': {
                perPage: 2,
                padding: { top: 30, bottom:30,left:300,right:300 },
            }
        },
    }).mount();
})();



// Generic drawer-related helpers
function toggleDrawer(drawer) {
    const drawerGenericSelectorCamel = 'rdDrawerId';
    const drawerToggleClass = 'rd-drawer-open';
    const feedbackToggleClassAttr = 'rdToggleClass';

    const drawerId = drawer.dataset[drawerGenericSelectorCamel];
    const drawerFeedbackSelector = '[data-rd-trigger-feedback="' + drawerId + '"]';

    // Close rival drawers
    const drawerRivalContext = drawer.dataset.rdDrawerRivalContext || null;
    const drawerContextDrawersList = drawerRivalContext ? document.querySelectorAll('[data-rd-drawer-rival-context="' + drawerRivalContext + '"]') : [];
    drawerContextDrawersList.forEach((contextDrawer) => {
        if (contextDrawer !== drawer) {
            closeDrawer(contextDrawer);
        }
    });

    // Toggle the drawer
    drawer.classList.toggle(drawerToggleClass);

    // Toggle all feedback elements when a drawer is triggered
    const drawerFeedbackList = document.querySelectorAll(drawerFeedbackSelector);
    drawerFeedbackList.forEach((feedback) => {
        let feedbackToggleClass = feedback.dataset[feedbackToggleClassAttr];
        feedback.classList.toggle(feedbackToggleClass);
    });
}

function closeDrawer(drawer) {
    const drawerGenericSelectorCamel = 'rdDrawerId';
    const drawerToggleClass = 'rd-drawer-open';
    const feedbackToggleClassAttr = 'rdToggleClass';

    const drawerId = drawer.dataset[drawerGenericSelectorCamel];
    const drawerFeedbackSelector = '[data-rd-trigger-feedback="' + drawerId + '"]';

    if (drawer.classList.contains(drawerToggleClass)) {
        drawer.classList.remove(drawerToggleClass);

        // Reset all feedback elements when a drawer is closed
        const drawerFeedbackList = document.querySelectorAll(drawerFeedbackSelector);
        drawerFeedbackList.forEach((feedback) => {
            let feedbackToggleClass = feedback.dataset[feedbackToggleClassAttr];
            if (feedback.classList.contains(feedbackToggleClass)) {
                feedback.classList.remove(feedbackToggleClass);
            }
        });
    }
}



// Drawers
(() => {
    const drawerGenericSelector = '[data-rd-drawer-id]';
    const drawerGenericSelectorCamel = 'rdDrawerId';

    const drawerList = document.querySelectorAll(drawerGenericSelector);
    drawerList.forEach((drawer) => {
        let drawerId = drawer.dataset[drawerGenericSelectorCamel];
        let drawerTriggerSelector = '[data-rd-trigger="' + drawerId + '"]';

        let drawerTriggerList = document.querySelectorAll(drawerTriggerSelector);
        drawerTriggerList.forEach((trigger) => {
            trigger.addEventListener('click', (e) => {
                let minTriggerDisableWidth = trigger.dataset['rdTriggerDisableMinWidth'];

                // Click is disabled on some drawers for larger screen sizes
                if (minTriggerDisableWidth && (window.innerWidth > minTriggerDisableWidth)) {
                    return;
                }
                toggleDrawer(drawer);
            });
        });
    });

    // Close all drawers upon horizontally resizing the window
    let resizePrevWidth = window.innerWidth;
    window.addEventListener('resize', (e) => {
        let resizeCurrentWidth = window.innerWidth;
        if (resizeCurrentWidth !== resizePrevWidth) {
            // Update previous width
            resizePrevWidth = resizeCurrentWidth;
            // Close drawers
            drawerList.forEach((drawer) => {
                closeDrawer(drawer);
            });
        }
    });
})();



// Dropdown Headings
(() => {
    const dhSelectList = document.querySelectorAll('[data-rd-drawer-type="select"]');
    dhSelectList.forEach((select) => {
        const selectId = select.dataset.rdDrawerId;
        const selectDisplaySelector = '[data-rd-drawer-select-display="' + selectId + '"]';
        const selectIconDisplaySelector = '[data-rd-drawer-select-icon-display="' + selectId + '"]';

        const selectOptionsList = select.querySelectorAll('[data-select-option]');
        const selectDisplaysList = document.querySelectorAll(selectDisplaySelector);
        const selectIconDisplaysList = document.querySelectorAll(selectIconDisplaySelector);

        selectOptionsList.forEach((option) => {
            option.addEventListener('click', (e) => {
                const optionValue = e.target.textContent.trim();
                selectDisplaysList.forEach((display) => {
                    display.textContent = optionValue;
                });
                selectIconDisplaysList.forEach((iconDisplay) => {
                    iconDisplay.src = e.target.dataset.rdSelectOptionIcon;
                });
                closeDrawer(select);
            });
        });
    });
})();



// Bottom Quick Links Drawer
(() => {
    const drawerId = 'rd-bottom-quicklinks';
    const bottomQldSelector = '[data-rd-drawer-id="' + drawerId + '"]';
    const bottomQldpositionReferenceSelector = '[data-rd-position-reference="' + drawerId + '"]';

    const bottomQld = document.querySelector(bottomQldSelector);
    const bottomQldPositionReference = document.querySelector(bottomQldpositionReferenceSelector);

    function setBottomQldPosition() {
        const bottomQldReferencePositionTop = bottomQldPositionReference.getBoundingClientRect().top;
        const bottomQldReferencePositionBottom = bottomQldPositionReference.getBoundingClientRect().bottom;
        bottomQld.style.bottom = Math.floor((bottomQldReferencePositionBottom - bottomQldReferencePositionTop)) + 'px';
    }
    setBottomQldPosition();
    // Re-position upon resizing the window
    window.addEventListener('resize', setBottomQldPosition);
})();



// Header search box
(() => {
    const searchInputId = 'rd-header-search';
    const searchSuggestionsSelector = '[data-rd-search-suggestions="' + searchInputId + '"]';
    const searchCloseSelector = '[data-rd-close-trigger="' + searchInputId + '"]';
    const searchSuggestionsOpenClass = 'rd-search-suggestions-open';

    const searchInputEl = document.getElementById(searchInputId);
    const searchSuggestionsEl = document.querySelector(searchSuggestionsSelector);
    const searchCloseEl = document.querySelector(searchCloseSelector);

    function closeSearch() {
        searchInputEl.blur();
        elRemoveClass(searchSuggestionsEl, searchSuggestionsOpenClass);
    }

    searchInputEl.addEventListener('keyup', (e) => {
        // On keyup event for the input field, fetch data and inject in <a> tags in the HTML in div.rd-search-suggestions. Replace characters in the result that match the user's current input string (eg. 'ca') with the same string wrapped in a span with the classes shown eg. <span class="rd-text-brand-white xs:rd-text-brand-black">ca</span>.

        // Open search suggestions box
        elAddClass(searchSuggestionsEl, searchSuggestionsOpenClass);

        // Close search and suggestions boxes when Escape key is pressed
        if (e.code === 'Escape') {
            closeSearch();
        }
    });
    searchInputEl.addEventListener('focusout', (e) => {
        // Close search suggestions box
        elRemoveClass(searchSuggestionsEl, searchSuggestionsOpenClass);
    });

    // Close search and suggestions boxes when cross is clicked
    searchCloseEl.addEventListener('click', (e) => {
        closeSearch();
    });
})();





(() => {
    const menuDrawerElSelector = '[data-rd-drawer-id="rd-mobilenav"]';
    const menuDrawerTriggerSelector = '[data-rd-trigger="rd-mobilenav"]';
    const mhdEl = document.querySelector(menuDrawerElSelector);
    const mhdTrigger = document.querySelector(menuDrawerTriggerSelector);
    let overflowValue = 'auto';
    mhdTrigger.addEventListener('click', () => {

        if (mhdEl.classList.contains('rd-drawer-open')) {
            overflowValue = 'hidden';
        } else {
            overflowValue = 'auto';
        }
        document.querySelector('html').style.overflow = overflowValue;
        document.querySelector('body').style.overflow = overflowValue;
    });
})();


(() => {
    window.addEventListener('resize',function(){
        if(window.innerWidth >1024){
            document.querySelector('#rd-progress-tracker').style.width = '';
        }else{
            document.querySelector('#rd-progress-tracker').style.width = '0px';
        }
    })
    window.addEventListener('scroll', function () {
        const heroSlider = document.querySelector('#rd-hero-slider');
        const primaryNav = document.querySelector('#rd-header-primary-nav');
        // mobile
        if (window.innerWidth < 1024) {
            return;
        }
        if (window.scrollY > (heroSlider.offsetHeight + heroSlider.offsetTop - 84)) {
            primaryNav.classList.add('hidden');
        } else {
            primaryNav.classList.remove('hidden');
        }

        handlePageProgress()
    })
    function handlePageProgress(){
        const heroSlider = document.querySelector('#rd-hero-slider');
        const footer = document.querySelector('#rd-site-footer');

        const progressElement =  document.querySelector('#rd-page-progress');
        const progresstracker = document.querySelector('#rd-progress-tracker');

        // const scrollHeight = document.documentElement.scrollHeight - window.innerHeight - footer.offsetHeight;
        const scrollHeight = document.querySelector('#main-content').offsetHeight - (window.innerHeight/2)
        const scrollPostion = window.scrollY - heroSlider.offsetHeight
        const quickLinks = document.querySelector('[data-rd-trigger="rd-quicklinks-dropdown"]').parentElement
        if(scrollPostion > -80 ){
            if(!quickLinks.classList.contains('md:rd-block')){
                quickLinks.classList.add('md:rd-block')
            }
        }else{
            quickLinks.classList.remove('md:rd-block')
        }
        if(scrollPostion > 0 && scrollPostion < scrollHeight){
            // progressElement.style.width = Math.round(scrollPostion/scrollHeight * 100) +'%'
            if((Math.round(scrollPostion/scrollHeight * 100)/100)>.03){
                progresstracker.style.transform = 'scaleX(' + (Math.round(scrollPostion/scrollHeight * 100)/100) +')'
                progresstracker.style.webkitTransform = 'scaleX(' + (Math.round(scrollPostion/scrollHeight * 100)/100) +')'
            }
        }

    }
    const allIdSections = []

    document.querySelectorAll('#rd-secondary-ul-mobile a[href^="#"]').forEach(anchor => {
        allIdSections.push(document.querySelector(anchor.getAttribute('href')))
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            let headerShownOffset = -20;
                  if((targetElement.offsetTop + document.querySelector('#rd-hero-slider').offsetHeight) > window.scrollY){
                    headerShownOffset = 40
                    // while going down
                  }else{
                    headerShownOffset = -20
                   // while going up
                  }
            window.scrollTo({
                top: (targetElement.offsetTop + document.querySelector('#rd-hero-slider').offsetHeight) + headerShownOffset,
                behavior: 'smooth'
            });

                const linkHighlighter = document.querySelector('#rd-tab-highlight');
                linkHighlighter.style.transform = 'translateX(' + anchor.parentElement.offsetLeft+'px)';
                linkHighlighter.style.width = anchor.parentElement.offsetWidth+'px';
        });
    });

    function handleIntersection(entries) {
        entries.map((entry) => {
          if (entry.isIntersecting) {

            const linkHighlighter = document.querySelector('#rd-tab-highlight');
            const linkRelatedToSection = document.querySelector('#rd-secondary-ul-mobile a[href^="#'+entry.target.id+'"]');
            const existingHighlightedLink = document.querySelector('#rd-secondary-ul-mobile a.rd-text-brand-black');
            const scrollableMenuList = document.querySelector('#rd-secondary-ul-mobile').parentElement;
            if(existingHighlightedLink){
                existingHighlightedLink.classList.add('rd-text-brand-grey');
                existingHighlightedLink.classList.remove('rd-text-brand-black')
            }
            linkRelatedToSection.classList.add('rd-text-brand-black');
            linkRelatedToSection.classList.remove('rd-text-brand-grey');
            // observer.unobserve(entry.target);
            linkHighlighter.style.transform = 'translateX(' + linkRelatedToSection.parentElement.offsetLeft+'px)';
            linkHighlighter.style.width = linkRelatedToSection.parentElement.offsetWidth+'px';
            if((linkRelatedToSection.offsetWidth + linkRelatedToSection.offsetLeft - scrollableMenuList.scrollLeft) > window.innerWidth){
                scrollableMenuList.scrollTo({
                    left: linkRelatedToSection.parentElement.offsetLeft,
                    behavior: 'smooth'
                });
            }
            if( linkRelatedToSection.parentElement.offsetLeft < scrollableMenuList.scrollLeft ){
                scrollableMenuList.scrollTo({
                    left: linkRelatedToSection.parentElement.offsetLeft,
                    behavior: 'smooth'
                });
            }
          }
        });
      }
    const observer = new IntersectionObserver(handleIntersection,{threshold: 0.75});
    allIdSections.forEach(section => observer.observe(section));

    const allIdSectionsDesktop = []
    document.querySelectorAll('#rd-secondary-ul-desktop> li>a[href^="#"]').forEach(anchor => {
        allIdSectionsDesktop.push(document.querySelector(anchor.getAttribute('href')))
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement =
                  document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: (targetElement.offsetTop + document.querySelector('#rd-hero-slider').offsetHeight) - 20 ,
                behavior: 'smooth'
            });
        });
    });

    var lastCheckedScrollPosition = 0
    function handleIntersectionDesktop(entries) {
        entries.map((entry) => {
          if (entry.isIntersecting) {
            const linkRelatedToSection = document.querySelector('#rd-secondary-ul-desktop a[href^="#'+entry.target.id+'"]');
            const existingHighlightedLink = document.querySelector('#rd-secondary-ul-desktop a.rd-text-brand-black');
            if(window.scrollY > lastCheckedScrollPosition){
                linkRelatedToSection.classList.remove('rd-text-brand-grey');
                // linkRelatedToSection.classList.remove('rd-text-brand-black');
            }
            // else{
            //     // linkRelatedToSection.classList.add('rd-text-brand-black');
            //     linkRelatedToSection.classList.remove('rd-text-brand-grey');
            // }
          }
        });
        lastCheckedScrollPosition = window.scrollY
      }
    const desktopObserver = new IntersectionObserver(handleIntersectionDesktop,{threshold: .85});
    allIdSectionsDesktop.forEach(section => desktopObserver.observe(section));

    window.addEventListener('load',()=>{
        const linkHighlighter = document.querySelector('#rd-tab-highlight');
        linkHighlighter.style.transform = 'translateX(0px)'
        linkHighlighter.style.width = document.querySelector('#rd-secondary-nav a[href^="#"]').parentElement.offsetWidth + 'px'
    })
})();



(() => {
    // Hide/show elements based on scroll direction
    function navShow(navEl, className) {
        if (navEl.classList.contains(className)) {
            navEl.classList.remove(className);
        }
    }
    function navHide(navEl, className) {
        if (!navEl.classList.contains(className)) {
            navEl.classList.add(className);
        }
    }

    const htmlEl = document.documentElement;
    const headerEl = document.getElementById('rd-site-header');
    const bottomNavEl = document.getElementById('rd-bottom-nav');
    const secNavEl = document.getElementById('rd-secondary-nav');
    const footerEl = document.getElementById('rd-site-footer');

    var lastScrollTop = 0;

    window.addEventListener('scroll', (e) => {
        if (window.innerWidth > 1024) {
            return;
        }
        function scrollDirection() {
            let currentScrollTop = window.scrollY || document.documentElement.scrollTop;
            if (currentScrollTop > lastScrollTop) {
                lastScrollTop = currentScrollTop
                return 'DOWN'
            } else {
                lastScrollTop = currentScrollTop
                return 'UP'
            }
        }


        let currentScrollTop = window.scrollY || document.documentElement.scrollTop; // active scroll position
        let bottomOffset = footerEl.offsetTop; // value of top of footer.
        let heroSlider = document.getElementById('rd-hero-slider');
        let topOffset = heroSlider.offsetHeight  + heroSlider.offsetTop; // value of height of slider

        if (scrollDirection() === 'DOWN') {
            // if scrolling down
            if (currentScrollTop > topOffset) {
                // and greater than main slider then hide navigation
                navHide(headerEl, 'rd-scroll-change-header');
                navHide(secNavEl, 'rd-scroll-change-secnav');
            }
            // show the bottom nav irresctive when going down.
            navShow(bottomNavEl, 'rd-scroll-change-bottomnav');
            elAddClass(bottomNavEl, 'rd-opacity-60');

        } else {
            // definitely going up so no if required here

            // show the header when going up without additional conditions.
            navShow(headerEl, 'rd-scroll-change-header');
            navShow(secNavEl, 'rd-scroll-change-secnav');

            // here add window height to scroll top and then compare bottom offset.
            if ((currentScrollTop + window.innerHeight) < (bottomOffset)) {
                // if true then hide the bottom nav
                navHide(bottomNavEl, 'rd-scroll-change-bottomnav');
                elRemoveClass(bottomNavEl, 'rd-opacity-60');
            }
        }

        scrollPrevPos = currentScrollTop;
    }, false)
    window.addEventListener('scroll',function(){
        handleBlob()
    ;
    function handleBlob(){
        const interestedSection = document.querySelector('#rd-interested-section');
        const dealsSection = document.querySelector('#rd-deals-section');
        const benefitsSection = document.querySelector('#rd-benefits-section');
        const channelsSection = document.querySelector('#rd-digital-section');
        const valuesSection = document.querySelector('#rd-core-values');

        let classValue = ''
        if(window.scrollY > (interestedSection.offsetTop + (interestedSection.offsetHeight))){
            document.querySelector('.rd-animated-bg-halo-flipcard').style.top = interestedSection.offsetTop + 'px'
            document.querySelector('.rd-animated-bg-halo-flipcard').classList.add('stage-2')
            if(window.scrollY > (dealsSection.offsetTop + dealsSection.offsetHeight)){
                document.querySelector('.rd-animated-bg-halo-flipcard').style.top = dealsSection.offsetTop + 'px'
                document.querySelector('.rd-animated-bg-halo-flipcard').classList.add('stage-3')
                if(window.scrollY > (benefitsSection.offsetTop + benefitsSection.offsetHeight )){
                    document.querySelector('.rd-animated-bg-halo-flipcard').style.top = benefitsSection.offsetTop + 'px'
                    document.querySelector('.rd-animated-bg-halo-flipcard').classList.add('stage-4')
                    if(window.scrollY > (channelsSection.offsetTop + channelsSection.offsetHeight )){
                        document.querySelector('.rd-animated-bg-halo-flipcard').style.top = channelsSection.offsetTop + 'px'
                        document.querySelector('.rd-animated-bg-halo-flipcard').classList.add('stage-5')
                        if(window.scrollY > (valuesSection.offsetTop + valuesSection.offsetHeight )){
                            document.querySelector('.rd-animated-bg-halo-flipcard').style.top = valuesSection.offsetTop + 'px'
                            document.querySelector('.rd-animated-bg-halo-flipcard').classList.add('stage-6')
                        }else{
                            document.querySelector('.rd-animated-bg-halo-flipcard').classList.remove('stage-6')
                        }
                    }else{
                        document.querySelector('.rd-animated-bg-halo-flipcard').classList.remove('stage-5')
                    }
                }else{
                    document.querySelector('.rd-animated-bg-halo-flipcard').classList.remove('stage-4')
                }
            }else{
                document.querySelector('.rd-animated-bg-halo-flipcard').classList.remove('stage-3')
            }
        }
        else{
            document.querySelector('.rd-animated-bg-halo-flipcard').style.top =  '0px'
            document.querySelector('.rd-animated-bg-halo-flipcard').classList.remove('stage-2')
        }

    }
    })
})();

// Momentarily hide high-transition elements on switching breakpoints
(() => {
    const sbtSelector = '[data-rd-smooth-breakpoint-transition]';
    const sbtBreakpoint = '1024px';
    const sbtToggleClass = 'rd-invisible';

    const sbtElementList = document.querySelectorAll(sbtSelector);
    const sbtMediaQuery = window.matchMedia('(min-width: ' + sbtBreakpoint + ')');
    try {
        sbtMediaQuery.addEventListener('change', (e) => {
            sbtElementList.forEach((sbtEl) => {
                sbtEl.classList.add(sbtToggleClass);
                setTimeout(() => {
                    sbtEl.classList.remove(sbtToggleClass);
                }, 300);
            });
        });
    } catch (error) {
        console.log('MatchMedia error: mediaQueryList.addEventListener not supported by this browser.');
    }
})();
window.addEventListener('DOMContentLoaded',function(){
    const allLotties = document.querySelectorAll('dotlottie-player')
    for (let i = 0; i < allLotties.length; i++) {
        const element = allLotties[i];
        element.addEventListener('frame',function(a){
            if(a.detail.seeker > 98){
              this.pause();
            }
        })
    }
})
