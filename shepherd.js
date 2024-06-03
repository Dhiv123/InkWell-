document.addEventListener('DOMContentLoaded', function() {
        const tour = new Shepherd.Tour({
            defaultStepOptions: {
                classes: 'shepherd-theme-dark',
                scrollTo: true,
	        beforeShowPromise: function() {
                return new Promise(resolve => {
                    document.body.insertAdjacentHTML('beforeend', '<div class="shepherd-overlay"></div>');
                    resolve();
                });
            },
            when: {
                show: function() {
                    const target = document.querySelector(this.options.attachTo.element);
                    target.classList.add('shepherd-target-highlight');
                    document.querySelector('.shepherd-overlay').style.opacity = '1';
                },
                hide: function() {
                    const target = document.querySelector(this.options.attachTo.element);
                    if (target) {
                        target.classList.remove('shepherd-target-highlight');
                    }
                    const overlay = document.querySelector('.shepherd-overlay');
                    if (overlay) {
                        overlay.remove();
                    }
                }
            }
        }
    });
        
        tour.addStep({
            id: 'step1',
            text: 'Welcome to the InkWell- An Interactive Writing Workshop! This is where you can unleash your creativity and enhance your writing skills.',
            attachTo: {
                element: '.home-background',
                on: 'bottom'
            },
            buttons: [
{
                        text: 'Skip',
                        action: function() {
                tour.cancel();
                document.querySelector('.shepherd-overlay').remove(); // Remove the overlay
            },
            classes: 'shepherd-button-secondary'
        },
                    {
                        text: 'Previous',
                        action: tour.back,
                        secondary: true
                    },
                {
                    text: 'Next',
                    action: tour.next
                }
            ]
        });

        tour.addStep({
            id: 'step2',
            text: 'Here you can learn about InkWell.',
            attachTo: {
                element: '#about',
                on: 'top'
            },
            buttons: [
{
                        text: 'Skip',
                        action: function() {
                tour.cancel();
                document.querySelector('.shepherd-overlay').remove(); // Remove the overlay
            },
            classes: 'shepherd-button-secondary'
        },
                    {
                        text: 'Previous',
                        action: tour.back,
                        secondary: true
                    },
                {
                    text: 'Next',
                    action: tour.next
                }
            ]
        });

        tour.addStep({
            id: 'step3',
            text: 'Here you can learn about the awesome features of InkWell.',
            attachTo: {
                element: '#features',
                on: 'top'
            },
            buttons: [
{
                        text: 'Skip',
                        action: function() {
                tour.cancel();
                document.querySelector('.shepherd-overlay').remove(); // Remove the overlay
            },
            classes: 'shepherd-button-secondary'
        },
                    {
                        text: 'Previous',
                        action: tour.back,
                        secondary: true
                    },
                {
                    text: 'Next',
                    action: tour.next
                }
            ]
        });

	tour.addStep({
        id: 'step3',
        text: 'Now let\'s move to the Brainstorming page.',
        attachTo: {
            element: 'li:nth-child(2)',
            on: 'top'
        },
        buttons: [
{
                        text: 'Skip',
                        action: function() {
                tour.cancel();
                document.querySelector('.shepherd-overlay').remove(); // Remove the overlay
            },
            classes: 'shepherd-button-secondary'
        },
                    {
                        text: 'Previous',
                        action: tour.back,
                        secondary: true
                    },
            {
                text: 'Next',
                action: function() {
                    window.location.href = 'brainstorming.html';
 }
            }
        ]
    });


        tour.start(); // Start the tour
    });

