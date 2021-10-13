new Glider(document.querySelector('.glider'), {
    // Mobile-first defaults
    itemWidth: 282,
    slidesToShow: 'auto',
    slidesToScroll: 1,
    duration: 1.5,
    scrollLock: true,
    draggable: true,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
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
          duration: 1.5
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
          slidesToScroll: 1,
          itemWidth: 282,
          duration: 1.5
        }
      }
    ]
  });