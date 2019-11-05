$(document).ready(function () {
    $('.header__menu ul li:nth-child(1) a').addClass('active');

    $('.item__features')
        .mouseenter(function () {
            $(this).children().eq(1).fadeIn();
        })
        .mouseleave(function () {
            $(this).children().eq(1).fadeOut();
        });


    $('.content__filter').click(function () {
        if (!($('.filter__list').hasClass('visible'))) {
            $('.filter__list').addClass('visible');
            $('.filter__list').fadeIn();
        } else {
            $('.filter__list').removeClass('visible');
            $('.filter__list').fadeOut();
        }
    });

});
