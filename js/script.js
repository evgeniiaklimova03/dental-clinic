document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.case-slider').forEach(initSlider);

    function initSlider(slider) {
        const beforeContainer = slider.querySelector('.case-slider__before');
        const beforeImg = beforeContainer && beforeContainer.querySelector('.case-slider__img');
        const handle = slider.querySelector('.case-slider__handle');
        if (!beforeContainer || !beforeImg || !handle) return;

        let isDragging = false;

        // Картинка "До" всегда равна ширине всего слайдера, чтобы не сжималась при обрезке
        const syncImageWidth = () => {
            beforeImg.style.width = `${slider.getBoundingClientRect().width}px`;
        };

        const updatePosition = (x) => {
            const rect = slider.getBoundingClientRect();
            const position = Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100));
            beforeContainer.style.width = `${position}%`;
            handle.style.left = `${position}%`;
        };

        syncImageWidth();
        window.addEventListener('resize', syncImageWidth);

        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            updatePosition(e.clientX);
            e.preventDefault();
        });
        window.addEventListener('mousemove', (e) => {
            if (isDragging) updatePosition(e.clientX);
        });
        window.addEventListener('mouseup', () => { isDragging = false; });

        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            updatePosition(e.touches[0].clientX);
        }, { passive: true });
        window.addEventListener('touchmove', (e) => {
            if (isDragging) updatePosition(e.touches[0].clientX);
        }, { passive: true });
        window.addEventListener('touchend', () => { isDragging = false; });
    }
});
