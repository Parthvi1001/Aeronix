// Home page specs counter animation (preserves scroll behavior)
(function initSpecsCounter() {
    const specsSection = document.querySelector('.drone-specs-section');
    if (!specsSection) return;

    // Animated counter function
    function animateCounter(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const isDecimal = end.toString().includes('.');

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            let currentValue;
            if (isDecimal) {
                currentValue = (easeOutQuart * (end - start) + start).toFixed(1);
            } else {
                currentValue = Math.floor(easeOutQuart * (end - start) + start);
            }

            element.innerHTML = currentValue + '<span class="spec-unit">' + suffix + '</span>';

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    let hasAnimated = false;

    const specsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;

                const specItems = document.querySelectorAll('.drone-specs-section .spec-item');

                // Define target values for each spec
                const specValues = [
                    { value: 85, suffix: 'km/h' },      // Max Speed
                    { value: 55, suffix: 'min' },       // Flight Time
                    { value: 20, suffix: 'km' },        // Max Range
                    { value: 8, suffix: 'K 60fps' }     // Resolution (4K)
                ];

                specItems.forEach((item, index) => {
                    // Fade in the item
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';

                        // Start counter animation
                        const valueElement = item.querySelector('.spec-value');
                        const target = specValues[index];

                        // Set initial value to 0
                        valueElement.innerHTML = '0<span class="spec-unit">' + target.suffix + '</span>';

                        // Animate from 0 to target value
                        setTimeout(() => {
                            animateCounter(valueElement, 0, target.value, 2000, target.suffix);
                        }, 100);

                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.3 });

    specsObserver.observe(specsSection);
})();
