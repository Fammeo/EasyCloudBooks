$(function () {
    $('.fancybox-buttons').fancybox({
        openEffect: 'none',
        closeEffect: 'none',

        'href': this.href,
        prevEffect: 'true',
        nextEffect: 'true',
        overlayShow: 'true',

        beforeShow: function () {
            this.title = '';
            if ($(this.element).attr('title') != undefined)
                this.title = '<p class="main-title">' + $(this.element).attr('title') + '</p>';
            if ($(this.element).find('img').attr('alt') == undefined || $(this.element).find('img').attr('alt') == null)
                this.title = this.title + '<p  class="main-description">' + ' ' + '</p>';
            else
                this.title = this.title + '<p  class="main-description">' + $(this.element).find('img').attr('alt') + '</p>';
        },
        helpers: {
            title: {
                type: 'inside'
            },
            overlay: {
                locked: false
            },
            buttons: {}
        }
    });

    $('.fancybox-media').fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        helpers: {
            media: {}
        }, beforeShow: function () {
        }
    });
});