var ViinyForm = (() => {
    /**
     * ViinyForm constructor method.
     * @param {string} el form wrapper object class or id
     * @param {object} opt option parameters
     */
    function ViinyForm(el, options) {
        var defaultOptions = {
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

        options = extend(defaultOptions, options);

        var viinyForm = new ViinyForm.instance(el, options);
        viinyForm.setForms();
        viinyForm.setNextButtons();
        viinyForm.setPrevButtons();
        return viinyForm;
    }

    ViinyForm.instance = function (el, options) {
        this.options = options;
        this.currentFormIndex = 0;

        let wrapperElement = document.querySelector(el);

        if (wrapperElement) {
            this.formWrapper = wrapperElement;
        }
        else {
            throw ("Wrapper element not found");
        }

        this.formArr = this.formWrapper.querySelectorAll('form');

        this.options['onInit'](this.formArr.length);
    }

    ViinyForm.instance.prototype.setForms = function () {
        this.formArr.forEach((element, index) => {
            if (index !== 0) {
                element.style.display = 'none';
            }

            element.addEventListener('submit', (e) => {
                e.preventDefault();
            });
        });
    };

    ViinyForm.instance.prototype.setNextButtons = function () {
        const nextButtons = this.formWrapper.querySelectorAll(`.${this.options['nextButtonClass']}`);

        nextButtons.forEach((element) => {
            element.addEventListener('click', () => {
                if (!this.options['onBeforeNext'](this.currentFormIndex, this.formArr[this.currentFormIndex])) {
                    return;
                }

                if (this.currentFormIndex <= this.formArr.length - 1) {
                    if (!this.formArr[this.currentFormIndex].checkValidity()) {
                        this.formArr[this.currentFormIndex].classList.add('was-validated');
                        this.options['onInvalid'](this.currentFormIndex, this.formArr[this.currentFormIndex]);
                        return;
                    }

                    if (this.formArr[this.currentFormIndex]) {
                        this.formArr[this.currentFormIndex].style.display = 'none';
                    }

                    this.currentFormIndex++;

                    if (this.formArr[this.currentFormIndex]) {
                        this.formArr[this.currentFormIndex].style.display = 'block';
                    }

                    if (this.currentFormIndex > this.formArr.length - 1) {
                        this.options['onComplete'](this.currentFormIndex, this.formArr[this.currentFormIndex - 1]);
                        return;
                    }

                    this.options['onNext'](this.currentFormIndex, this.formArr[this.currentFormIndex - 1]);
                }
            });
        });
    };

    ViinyForm.instance.prototype.setPrevButtons = function () {
        const prevButtons = this.formWrapper.querySelectorAll(`.${this.options['prevButtonClass']}`);

        prevButtons.forEach((element) => {
            element.addEventListener('click', () => {
                if (!this.options['onBeforePrev'](this.currentFormIndex, this.formArr[this.currentFormIndex])) {
                    return;
                }

                if (this.currentFormIndex > 0) {
                    if (this.formArr[this.currentFormIndex]) {
                        this.formArr[this.currentFormIndex].style.display = 'none';
                    }

                    this.currentFormIndex--;

                    if (this.formArr[this.currentFormIndex]) {
                        this.formArr[this.currentFormIndex].style.display = 'block';
                    }

                    this.options['onPrev'](this.currentFormIndex, this.formArr[this.currentFormIndex + 1]);
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
        return obj;
    };

    return ViinyForm;
})();
