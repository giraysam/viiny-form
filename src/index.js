var ViinyForm = (() => {

    var formWrapper, options, formArr, currentFormIndex;
    currentFormIndex = 0;

    options = {
        'onInit': () => { },
        'onBeforeNext': () => true,
        'onNext': () => { },
        'onBeforePrev': () => true,
        'onPrev': () => { },
        'onInvalid': () => { },
        'onComplete': () => { },
        'nextButtonClass': 'btn-next',
        'prevButtonClass': 'btn-prev'
    }

    /**
     * ViinyForm constructor method.
     * @param {string} el form wrapper object class or id
     * @param {object} opt option parameters
     */
    function ViinyForm(el, opt) {
        checkWrapperElement(el);
        extend(options, opt);
        init();
    }

    /**
     * initializing events and elements
     */
    const init = () => {
        formArr = formWrapper.querySelectorAll('form');

        setForms();
        setNextButtons();
        setPrevButtons();

        options['onInit']();
    };

    /**
     * to check wrapper element.
     * @param {string} el wrapper object class or id
     */
    const checkWrapperElement = (el) => {
        let wrapperElement = document.querySelector(el);

        if (wrapperElement) {
            formWrapper = wrapperElement;
        }
        else {
            throw ("Wrapper element not found");
        }
    };

    const setForms = () => {
        formArr.forEach((element, index) => {
            if (index !== 0) {
                element.style.display = 'none';
            }

            element.addEventListener('submit', (e) => {
                e.preventDefault();
            });
        });
    };

    const setNextButtons = () => {
        const nextButtons = formWrapper.querySelectorAll(`.${options['nextButtonClass']}`);

        nextButtons.forEach((element) => {
            element.addEventListener('click', () => {
                if (!options['onBeforeNext'](currentFormIndex, formArr[currentFormIndex])) {
                    return;
                }

                if (currentFormIndex <= formArr.length - 1) {
                    if (!formArr[currentFormIndex].checkValidity()) {
                        formArr[currentFormIndex].classList.add('was-validated');
                        options['onInvalid'](currentFormIndex, formArr[currentFormIndex]);
                        return;
                    }

                    if (formArr[currentFormIndex]) {
                        formArr[currentFormIndex].style.display = 'none';
                    }

                    currentFormIndex++;

                    if (formArr[currentFormIndex]) {
                        formArr[currentFormIndex].style.display = 'block';
                    }

                    if (currentFormIndex > formArr.length - 1) {
                        options['onComplete'](currentFormIndex - 1, formArr[currentFormIndex - 2]);
                        return;
                    }

                    options['onNext'](currentFormIndex, formArr[currentFormIndex - 1]);
                }
            });
        });
    };

    const setPrevButtons = () => {
        const prevButtons = formWrapper.querySelectorAll(`.${options['prevButtonClass']}`);

        prevButtons.forEach((element) => {
            element.addEventListener('click', () => {
                if (!options['onBeforePrev'](currentFormIndex, formArr[currentFormIndex])) {
                    return;
                }

                if (currentFormIndex > 0) {
                    if (formArr[currentFormIndex]) {
                        formArr[currentFormIndex].style.display = 'none';
                    }

                    currentFormIndex--;

                    if (formArr[currentFormIndex]) {
                        formArr[currentFormIndex].style.display = 'block';
                    }

                    options['onPrev'](currentFormIndex, formArr[currentFormIndex + 1]);
                }
            });
        });
    };

    const extend = (obj, props) => {
        for (let prop in props) {
            if (props.hasOwnProperty(prop)) {
                obj[prop] = props[prop];
            }
        }
    };

    return ViinyForm;
})();
