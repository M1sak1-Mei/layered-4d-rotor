window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    $(".navbar-burger").click(function() {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    var options = {
        slidesToScroll: 3,
        slidesToShow: 3,
        loop: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
        pagination: false,
    };

    var carousels = bulmaCarousel.attach('.carousel', options);

    for (var i = 0; i < carousels.length; i++) {
        carousels[i].on('before:show', function(state) {
            console.log(state);
        });
    }

    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
        element.bulmaCarousel.on('before-show', function(state) {
            console.log(state);
        });
    }

    function initializeVideoComparisons() {
        var comparisons = document.querySelectorAll('[data-video-compare]');

        Array.prototype.forEach.call(comparisons, function(comparison) {
            var slider = comparison.querySelector('.compare-slider');
            var videos = comparison.querySelectorAll('video');

            if (!slider) {
                return;
            }

            function setComparisonPosition(value) {
                var position = Math.max(0, Math.min(100, Number(value)));
                comparison.style.setProperty('--compare-pos', position + '%');
                slider.setAttribute('aria-valuenow', String(position));
            }

            function syncVideos(referenceVideo) {
                Array.prototype.forEach.call(videos, function(video) {
                    if (video === referenceVideo || video.readyState === 0) {
                        return;
                    }

                    if (Math.abs(video.currentTime - referenceVideo.currentTime) > 0.08) {
                        try {
                            video.currentTime = referenceVideo.currentTime;
                        } catch (error) {
                            // Browsers can reject seeking before metadata is ready.
                        }
                    }

                    if (referenceVideo.paused && !video.paused) {
                        video.pause();
                    } else if (!referenceVideo.paused && video.paused) {
                        video.play().catch(function() {});
                    }
                });
            }

            function playVideos() {
                Array.prototype.forEach.call(videos, function(video) {
                    video.play().catch(function() {});
                });
            }

            slider.addEventListener('input', function() {
                setComparisonPosition(slider.value);
            });
            slider.addEventListener('pointerdown', playVideos);
            slider.addEventListener('mousedown', playVideos);
            slider.addEventListener('touchstart', playVideos);

            Array.prototype.forEach.call(videos, function(video) {
                video.addEventListener('play', function() {
                    syncVideos(video);
                });
                video.addEventListener('seeked', function() {
                    syncVideos(video);
                });
            });

            setComparisonPosition(slider.value);
            playVideos();

            window.setInterval(function() {
                if (videos.length > 0) {
                    syncVideos(videos[0]);
                }
            }, 1000);
        });
    }

    initializeVideoComparisons();
});
