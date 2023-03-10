/**
 * 커스텀 커서
 */
const cursor = {
    element: undefined,
    dots: [],
    mouseX: 0, mouseY: 0,
    initCursor: function() {
        // 이미 cursor가 있을 경우 실행하지 않음
        if(this.element !== undefined) {
            console.warn('이미 커서 요소가 존재하여 초기 작업을 중지하였습니다.');
            return;
        }
        // Create Cursor Element
        this.element = document.createElement('div');
        this.element.classList.add('cursor');
        for(let i = 0; i < 20; i++) {
            let dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.transform = `scale(${(32-i)/32})`;
            dot.dataset.delay = i;
            this.dots.push(dot);
            this.element.appendChild(dot);
        }
        document.body.appendChild(this.element);
        // Add Event
        this.addEvent();
    },
    translate: function() {
        // 마우스 이동
        // gsap.to(this.element, {duration: 3, left:targetX, top:targetY, ease: 'elastic'});
        this.dots.forEach((dot) => {
            // 가운데 정렬을 위한 px 계산
            const cursorWidth = (dot.offsetWidth/2);
            const cursorHeight = (dot.offsetHeight/2);
            const targetX = this.mouseX-cursorWidth;
            const targetY = this.mouseY-cursorHeight;
            gsap.to(dot, {duration:dot.dataset.delay*(0.04), left:targetX, top:targetY});
        });
    },
    toggleCursor(_is = true) {
        if(_is) {this.element.classList.remove('off');}
        else {this.element.classList.add('off');}
    },
    scaleCursor(scale = 1) {
        gsap.to(this.element, {scaleX: scale, scaleY: scale, duration: .5});
    },
    addEvent() {
        document.body.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.translate();
        });
    }
}

window.addEventListener('DOMContentLoaded', function() {
    cursor.initCursor(); // 커서 로딩
});