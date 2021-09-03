new Glider(document.querySelector('.glider2'), {
    // Mobile-first defaults
    itemWidth: 282,
    slidesToShow: 'auto',
    slidesToScroll: 1,
    duration: 1.5,
    scrollLock: true,
    draggable: true,
    dots: '.dots2',
    arrows: {
      prev: '.glider-prev2',
      next: '.glider-next2'
    },
    responsive: [
      {
        // screens greater than >= 580px
        breakpoint: 580,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 'auto',
          slidesToScroll: 1,
          itemWidth: 282,
          duration: 1.5
        }
      },{
        // screens greater than >= 768px
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          itemWidth: 282,
          duration: 0.25
        }
      },{
        // screens greater than >= 1024px
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          itemWidth: 282,
          duration: 1.5
        }
      },{
        // screens greater than >= 1200px
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          itemWidth: 282,
          duration: 1.5
        }
      }
    ]
  });