class Header {
    constructor(target) {
        console.log(target)
        this.target = target;
        this.DOM = null;

        this.init();

    }
    init() {
        console.log(111111111111111111111)
        const DOM = document.querySelector(this.target);
        if (!DOM) {
            throw 'ERROR: header target location was not found.';
        }
        this.DOM = DOM;

    }

}

export default Header;
