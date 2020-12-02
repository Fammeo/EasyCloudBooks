var CurrentUser;
var CurrentSettings;
var RoleSettings = {};
var ExtraPath = "/help";
var DefaultUserImage = "~/../assets/img/user.png";
var DefaultCompanyImage = "~/../assets/img/company.png";
var urlQueryString; // Do  not Remove it is used in other pages
var timercheck = 300000;
var grittertime = 2000;
var RedirectTo = 'login.aspx';
var InitializedPageLoad = false;
(window.onpopstate = function () {
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    urlQueryString = {};
    while (match = search.exec(query)) {
        urlQueryString[decode(match[1].toLowerCase())] = decode(match[2]);
    }
})();

$.fn.showAnimated = function (type) {
    try {
        if (type == undefined || type == null)
            type = 'slow';
        $(this).slideDown(type);
    }
    catch (e)
    { $(this).show(); }
}

$.fn.showleft = function () {
    try {
        $(this).animate({ width: 200 }, {
            duration: 500
        });
    }
    catch (e)
    { $(this).show(); }
}

$.fn.hideleft = function () {
    try {
        $(this).animate({ width: "toggle" }, {
            duration: 500
        });
    }
    catch (e)
    { $(this).show(); }
}

$.fn.hideAnimated = function (type) {
    try {
        if (type == undefined || type == null)
            type = 'slow';
        $(this).slideUp(type);
    }
    catch (e)
    { $(this).hide(); }
}

$.fn.scrollTo = function (target, options, callback) {
    if (typeof options == 'function' && arguments.length == 2) { callback = options; options = target; }
    var settings = $.extend({
        scrollTarget: target,
        offsetTop: 50,
        duration: 500,
        easing: 'swing'
    }, options);
    return this.each(function () {
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({ scrollTop: scrollY }, parseInt(settings.duration), settings.easing, function () {
            if (typeof callback == 'function') { callback.call(this); }
        });
    });
}

var replaceAllstr = function (find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

var SetGoToTop = function () {
    //Check to see if the window is top if not then display button
    setTimeout(function () {
        $('.MasterParentDiv').scroll(
            function () {
                if ($(this).scrollTop() > 100) {
                    $('.scrollToTop').fadeIn();
                } else {
                    $('.scrollToTop').fadeOut();
                }
            });
        $('.scrollToTop').click(function () {
            //$('.MasterParentDiv').animate({ scrollTop: 0 }, 800);
            WrapperScroll(0);
            return false;
        });
    }, 2000);
}

$(window).resize(function () {
    try {
        $('.blockOverlay').css('height', $('body')[0].scrollHeight);
    }
    catch (e)
    { }
});

var isValidEmailAddress = function (emailAddress) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    return pattern.test(emailAddress);
}
var isValidDate = function (date, Method, splitter) {
    if (date != null && date != undefined) {
        date = date.trim();
        if (Method != null && Method != undefined && splitter != null && splitter != undefined) {
            var fields = date.trim().split(splitter);
            var Mfields = Method.trim().split(splitter);
            if (fields.length == 3 && Mfields.length == 3) {
                var day = 0;
                var month = 0;
                var year = 0;
                if (Mfields[0].toLocaleLowerCase() == 'dd') {
                    day = parseInt(fields[0]);
                } else if (Mfields[0].toLocaleLowerCase() == 'mm') {
                    month = parseInt(fields[0]);
                } else if (Mfields[0].toLocaleLowerCase() == 'yyyy') {
                    year = parseInt(fields[0]);
                }
                if (Mfields[1].toLocaleLowerCase() == 'mm') {
                    month = parseInt(fields[1]);
                }
                else if (Mfields[1].toLocaleLowerCase() == 'dd') {
                    day = parseInt(fields[1]);
                } else if (Mfields[1].toLocaleLowerCase() == 'yyyy') {
                    year = parseInt(fields[1]);
                }
                if (Mfields[2].toLocaleLowerCase() == 'mm') {
                    month = parseInt(fields[2]);
                }
                else if (Mfields[2].toLocaleLowerCase() == 'dd') {
                    day = parseInt(fields[2]);
                }
                else if (Mfields[2].toLocaleLowerCase() == 'yyyy') {
                    year = parseInt(fields[2]);
                }
                var isvalid = true;
                if (!(day > 0 && day < 32)) {
                    return false;
                }
                if (!(month > 0 && month < 13)) {
                    return false;
                }
                if (!(year > 1900 && year < 2100)) {
                    return false;
                }
                if (isvalid) {
                    return moment((month) + "-" + day + "-" + year, "MM-DD-YYYY").isValid();
                }
            }
            else if (fields.length == 2 && Mfields.length == 2) {
                var day = 0;
                var month = 0;
                var year = 0;
                var haveyear = false;
                var havemonth = false;
                var haveday = false;
                if (Mfields[0].toLocaleLowerCase() == 'dd') {
                    haveday = true;
                    day = parseInt(fields[0]);
                } else if (Mfields[0].toLocaleLowerCase() == 'mm') {
                    havemonth = true;
                    month = parseInt(fields[0]);
                } else if (Mfields[0].toLocaleLowerCase() == 'yyyy') {
                    haveyear = true;
                    year = parseInt(fields[0]);
                }
                if (Mfields[1].toLocaleLowerCase() == 'mm') {
                    havemonth = true;
                    month = parseInt(fields[1]);
                }
                else if (Mfields[1].toLocaleLowerCase() == 'dd') {
                    haveday = true;
                    day = parseInt(fields[1]);
                } else if (Mfields[1].toLocaleLowerCase() == 'yyyy') {
                    haveyear = true;
                    year = parseInt(fields[1]);
                }

                var isvalid = true;
                if (!(day > 0 && day < 32) && haveday) {
                    return false;
                }
                if (!(month > 0 && month < 13) && havemonth) {
                    return false;
                }
                if (!(year > 1900 && year < 2100) && haveyear) {
                    return false;
                }
                if (!haveyear) {
                    year = 2000;
                }
                if (!havemonth) {
                    month = 1;
                }
                if (!haveday) {
                    day = 1;
                }
                if (isvalid) {
                    return moment((month) + "-" + day + "-" + year, "MM-DD-YYYY").isValid();
                }
            }
            return false;
        }
        return moment(new Date(date)).isValid();
    }
    return false;
}

var ValidateDate = function (obj, Method, splitter, BlankError) {
    $(obj).removeClass("form-control-error");
    if (BlankError && $(obj).val().trim() == '') {
        $(obj).addClass("form-control-error");
    }
    else if ($(obj).val().trim() != '') {
        if (!isValidDate($(obj).val().trim(), Method, splitter))
        { $(obj).addClass("form-control-error"); return false; }
        else
        { return true; }
    }
    return false;
}
var GetDate = function (date, Method, splitter) {
    if (date != null && date != undefined) {
        date = date.trim();
        var possibledate = null;
        if (Method != null && Method != undefined && splitter != null && splitter != undefined) {
            var fields = date.trim().split(splitter);
            var Mfields = Method.trim().split(splitter);
            if (fields.length == 3 && Mfields.length == 3) {
                var day = 0;
                if (Mfields[0].toLocaleLowerCase() == 'dd') {
                    day = parseInt(fields[0]);
                } else if (Mfields[0].toLocaleLowerCase() == 'mm') {
                    month = parseInt(fields[0]);
                } else if (Mfields[0].toLocaleLowerCase() == 'yyyy') {
                    year = parseInt(fields[0]);
                }
                var month = 0;
                if (Mfields[1].toLocaleLowerCase() == 'mm') {
                    month = parseInt(fields[1]);
                }
                else if (Mfields[1].toLocaleLowerCase() == 'dd') {
                    day = parseInt(fields[1]);
                } else if (Mfields[1].toLocaleLowerCase() == 'yyyy') {
                    year = parseInt(fields[1]);
                }
                var year = 0;
                if (Mfields[2].toLocaleLowerCase() == 'mm') {
                    month = parseInt(fields[2]);
                }
                else if (Mfields[2].toLocaleLowerCase() == 'dd') {
                    day = parseInt(fields[2]);
                }
                else if (Mfields[2].toLocaleLowerCase() == 'yyyy') {
                    year = parseInt(fields[2]);
                }
                var isvalid = true;
                if (!(day > 0 && day < 32)) {
                    return null;
                }
                if (!(month > 0 && month < 13)) {
                    return null;
                }
                if (!(year > 1900 && year < 2100)) {
                    return null;
                }
                if (isvalid) {
                    possibledate = moment((month) + "/" + day + "/" + year, "MM-DD-YYYY");
                    if (possibledate.isValid())
                        return possibledate;
                }
            }
            else if (fields.length == 2 && Mfields.length == 2) {
                var day = 0;
                var month = 0;
                var year = 0;
                var haveyear = false;
                var havemonth = false;
                var haveday = false;
                if (Mfields[0].toLocaleLowerCase() == 'dd') {
                    haveday = true;
                    day = parseInt(fields[0]);
                } else if (Mfields[0].toLocaleLowerCase() == 'mm') {
                    havemonth = true;
                    month = parseInt(fields[0]);
                } else if (Mfields[0].toLocaleLowerCase() == 'yyyy') {
                    haveyear = true;
                    year = parseInt(fields[0]);
                }
                if (Mfields[1].toLocaleLowerCase() == 'mm') {
                    havemonth = true;
                    month = parseInt(fields[1]);
                }
                else if (Mfields[1].toLocaleLowerCase() == 'dd') {
                    haveday = true;
                    day = parseInt(fields[1]);
                } else if (Mfields[1].toLocaleLowerCase() == 'yyyy') {
                    haveyear = true;
                    year = parseInt(fields[1]);
                }

                var isvalid = true;
                if (!(day > 0 && day < 32) && haveday) {
                    return null;
                }
                if (!(month > 0 && month < 13) && havemonth) {
                    return null;
                }
                if (!(year > 1900 && year < 2100) && haveyear) {
                    return null;
                }
                if (!haveyear) {
                    year = 2000;
                }
                if (!havemonth) {
                    month = 1;
                }
                if (!haveday) {
                    day = 1;
                }
                if (isvalid) {
                    possibledate = moment((month) + "/" + day + "/" + year, "MM-DD-YYYY");
                    if (possibledate.isValid())
                        return possibledate;
                }
            }
            return null;
        }
        possibledate = moment(new Date(date));
        return possibledate.isValid();
    }
    return null;
}

var isValidPhoneNumber = function (phonenumber, type) {
    if (type == 'landline') {
        var pattern = new RegExp(/^[0-9]\d{2,4}-\d{6,8}$/i);
        return pattern.test(phonenumber);
    }
    else if (type == 'all') {
        var pattern = new RegExp(/^[0-9]\d{2,4}-\d{6,8}$/i);
        if (!pattern.test(phonenumber)) {
            var pattern = new RegExp(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/i);
            return pattern.test(phonenumber);
        }
        else return true;
    }
    else {
        var pattern = new RegExp(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/i);
        return pattern.test(phonenumber);
    }
}

var gettextdropdown = function (object, value) {
    var returntext = null;
    $('option', object).each(function () {
        if ($(this).val() == value) {
            returntext = $(this).text();
            return returntext;
        }
    });
    return returntext;
}

function htmlDecode(value) {
    return $("<textarea/>").html(value).text();
}

var IsSummernoteEmpty = function (html) {
    if (html.length == 0)
        return true;


    html = htmlDecode(html);
    var tag = $("<div>" + html + "</div>");
    return $(tag).text().length == 0;
    $(tag).find('*').removeAttr('style');
    html = $(tag).html();
    html = html.toLocaleLowerCase();
    html = html.replace(/<p>/g, '');
    html = html.replace(/<span>/g, '');
    html = html.replace(/<\/span>/g, '');
    html = html.replace(/<\/p>/g, '');
    html = html.replace(/<br>/g, '');
    html = html.replace(/<br\/>/g, '');
    html = html.replace(/&nbsp;/g, '');
    html = html.replace(/ /g, '');
    html = html.replace(/;/g, '');
    return html.length == 0;
}

var HandleEnterPress = function (e, Object, setfocus, handleEscapre, escapeobject, isnumeric) {
    if (e.keyCode == 13) {
        e.preventDefault();
        if (setfocus) {
            Object.focus();
        }
        else {
            Object.click();
        }
        return true;
    }
    else if (e.keyCode == 27 && handleEscapre) {
        if (escapeobject != null && escapeobject != undefined) {
            e.preventDefault();
            escapeobject.focus();
            $(escapeobject).click();
        }
        return true;
    }
    else if (isnumeric == true) {
        return IsNumeric(e);
    }
    else {
        return true;
    }
}

var HandleEnterPress = function (e, Object, setfocus, handleEscapre, escapeobject, isnumeric) {
    if (e.keyCode == 13) {
        e.preventDefault();
        if (setfocus) {
            Object.focus();
        }
        else {
            Object.click();
        }
        return true;
    }
    else if (e.keyCode == 27 && handleEscapre) {
        if (escapeobject != null && escapeobject != undefined) {
            e.preventDefault();
            escapeobject.focus();
            $(escapeobject).click();
        }
        return true;
    }
    else if (isnumeric == true) {
        return IsNumeric(e);
    }
    else {
        return true;
    }
}

var entertotab = function (e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 13) {
        if (e.originalTarget == undefined || e.originalTarget == null) {
            e.originalTarget = e.srcElement;
        }
        e.preventDefault();
        e.stopPropagation();
        var inputs = $(e.originalTarget).parents('[role="form"]').eq(0).find('input[type="text"]:visible,textarea:visible,select:visible');
        var idx = inputs.index(e.originalTarget);
        if (idx == inputs.length - 1) {
            inputs[0].focus()
        } else {
            inputs[idx + 1].focus();
        }
        return false;
    }
}

var goToByScroll = function (id) {
    // Remove "link" from the ID
    id = id.replace("link", "");
    // Scroll
    if ($("#" + id).offset() != undefined) {
        $('.MasterParentDiv').animate({
            scrollTop: $("#" + id).offset().top - 50
        },
            'slow');
    }
    else {
        setTimeout(function () {
            if ($("#" + id).offset() != undefined) {
                if ($("#" + id).offset().top > 50) {
                    $('.MasterParentDiv').animate({
                        scrollTop: $("#" + id).offset().top - 50
                    },
                        'slow');
                }
            }
        }, 2000);
    }
}
var goToByScrollobject = function (object) {
    // Remove "link" from the ID
    // Scroll
    if ($(object).offset() != undefined) {
        $('.MasterParentDiv').animate({
            scrollTop: $(object).offset().top - 50
        },
            'slow');
    }
    else {
        setTimeout(function () {
            if ($(object).offset() != undefined) {
                $('.MasterParentDiv').animate({
                    scrollTop: $(object).offset().top - 50
                },
                    'slow');
            }
        }, 5000);
    }
}

var HandleKeyPress = function (e, Object, setfocus, handleEscapre, escapeobject) {
    if (e.keyCode == 13) {
        e.preventDefault();
        Object.click();
    }
    else if (e.keyCode == 9) {
        e.preventDefault();
        setfocus.trigger("click");
    } else if (e.keyCode == 27 && handleEscapre) {
        if (escapeobject != null && escapeobject != undefined) {
            e.preventDefault();
            escapeobject.click();
        }
    }
}

var HideSideBar = function () {
    var sidebarbutton = $('.sidebar-minified').find('.fa-angle-left');
    if (sidebarbutton != undefined && sidebarbutton != null) {
        if ($(sidebarbutton).attr('class') != '' && $(sidebarbutton).attr('class') != undefined) {
            if ($(sidebarbutton).attr('class').indexOf('fa-angle-right') == -1) {
                $(sidebarbutton).click();
            }
        }
    }
}

function getExtension(file) {
    if (file != null && file != undefined) {
        var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
        return extension;
        return "invalid";
    }
}

var GetImagePath = function (AbsolutePath) {
    try {
        if (AbsolutePath != undefined || AbsolutePath != null) {
            if (AbsolutePath != '') {
                var root = location.protocol + "//" + location.host + ExtraPath;
                return root + AbsolutePath.replace('~', '');
            }
        }
    }
    catch (e)
    { }
    return AbsolutePath;
}

var GetscrollHeight = function (object) {
    var height = 0;

    $(object).each(function () { if (this.scrollHeight > height) { height = this.scrollHeight; } });
    if (height > 0) {
        return height;
    }
    else {
        $(object).height();
    }
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
}

function showSpinner(height, body) {
    var uuid = guid();
    var spinTemplate = '<div id="div_' + uuid + '" style="height: ' + height + 'px"><span id="' + uuid + '" style="background-color:#ffffff;position: absolute;z-index:1000; display: block; top: 25%; left: 25%;"></span></div>';
    body.append(spinTemplate);

    var target = document.getElementById(uuid);
    target.innerHTML = "<img src='assets/img/processing.gif' />";

    return uuid;
}

function hideSpinner(uuid) {
    $("#div_" + uuid).remove();
}

var specialKeys = [];
function IsAlphaNumeric(e) {
    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    var ret = (keyCode == 8 || keyCode == 13 || keyCode == 32 || keyCode == 93 || keyCode == 91 || keyCode == 40 || keyCode == 41 || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
    if (!ret) {
        e.preventDefault();
    }
    return ret;
}

function IsNumeric(e) {
    if (e.shiftKey || e.ctrlKey || e.altKey) {
        e.preventDefault();
        return false;
    } else {
        var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
        var ret = (keyCode == 8 || keyCode == 13 || keyCode == 93 || keyCode == 91 || keyCode == 40 || keyCode == 41 || (keyCode >= 48 && keyCode <= 57) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
        if (!ret) {
            e.preventDefault();
        }
        return ret;
    }
}

var showwaiting = function (object,waitingtype) {
    if (object == null || object == undefined) {
        object = $('.MasterParentDiv');
    }
    var timeid = (((new Date()).getTime() * 10000) + 621355968000000000);
    var message = '<div class="circleloading" id="circleloading_' + timeid + '"></div>';
    if (waitingtype == "circle")
    {
        message = '<div class="" id="circleloading_' + timeid + '"><div class="sk-spinner sk-spinner-fading-circle sk-waiting"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>';
    }
    $(object).block({
        message: message,
        css: { backgroundColor: 'none', border: 'none', cursor: 'default', 'min-heigth': '100%' },
        overlayCSS: {
            backgroundColor: '#ececec',
            opacity: '0.35',
            cursor: 'default'
        },
        onBlock: function () {
            if ($('.blockUI.blockMsg.blockElement').find('.MainDiscussiondiv').length == 0 && $('.blockUI.blockMsg.blockElement').find('#iFrameDocumentPreview').length == 0 && $('.blockUI.blockMsg.blockElement').find('.MainFileDocumentdiv').length == 0 && $('.blockUI.blockMsg.blockElement').find('.PopoverChangeCategories').length == 0) {
                $('.circleloading').css('background-image', $('.circleloading').css('background-image'));
                if ($('#circleloading_' + timeid).parent().parent().height() < 100) {
                    $('#circleloading_' + timeid).css('background-repeat', 'no-repeat');
                    $('#circleloading_' + timeid).css('height', '20px');
                    $('#circleloading_' + timeid).css('margin', '10px auto');
                    $('#circleloading_' + timeid).css('background-size', '33px auto');
                }
                $('.blockOverlay').css('height', $(object)[0].scrollHeight);
                $('.blockOverlay').css('min-height', '100%');
                if ($(object).hasClass('MasterParentDiv')) {
                    if ($('.blockUI.blockOverlay').height() > 500) {
                        $('.blockUI.blockMsg.blockElement').css('top', ($(object)[0].scrollTop + 200) + 'px');
                        $(object).scroll(function () { $('.circleloading').parent().css('top', ($(object)[0].scrollTop + 200) + 'px'); });
                    }
                }
            }
        }
    });
    $('.blockOverlay').attr('title', 'Please Wait');
}

var hidewaiting = function (object) {
    if (object == null || object == undefined) {
        object = $('.MasterParentDiv');
    }
    $(object).unblock();
    $(object).off("scroll");

}

function showTelerikWaiting(sender, args) {
    if (window.location != window.parent.location) {
        showwaiting($('.col-md-12'));
    }
    else
        showwaiting($('.MasterParentDiv'));
}

var ShowPreview = function (object, path, filename) {
    $.blockUI({
        message: "<div style='width:100%'><div  style='width:100%;padding:10px;'><h2 style=\"margin:0px\">Preview<input  type=\"button\" class=\"btn btn-danger pull-right\" value=\"Close\" onclick=\"$.unblockUI();\" /><a class='btn btn-primary pull-right' href='" + GetImagePath(path) + "' role='menuitem' target='_self'><i class='fa fa-download'></i> Download</a></h2></div><div style='width:100%'><iframe id=\"iFrameDocumentPreview\" style='width: 100%; height: 100%; min-height: 475px;' frameborder='0' onload=\"hidewaiting($(this).parent());\"></iframe></div></div>",
        css: {
            backgroundColor: 'White', border: '1px Solid #c1c1c1', cursor: 'default', width: '90%', left: '5%',
            top: '50px', marginBottom: '50px'
        },
        overlayCSS: {
            backgroundColor: '#dcdcdc',
            cursor: 'default'
        },
        onBlock: function () {
            if ($('.blockUI.blockMsg.blockPage').find('#iFrameDocumentPreview').length > 0) {
                showwaiting($('#iFrameDocumentPreview').parent());
                if (!IsImageFile(filename)) {
                    $('#iFrameDocumentPreview').attr('src', 'https://docs.google.com/gview?url=' + encodeURIComponent(GetImagePath(path)) + '&embedded=true');
                }
                else {
                    $('#iFrameDocumentPreview').attr('src', (GetImagePath(path)));
                }
                setTimeout(function () {
                    $('.blockOverlay').css('height', GetscrollHeight($('.MasterParentDiv')));
                }, 2000);
            }
        }
    });
}

function IsImageFile(file) {
    if (file != null && file != undefined) {
        file = file.toLocaleLowerCase();
        var extension = file.substr((file.lastIndexOf('.') + 1));
        switch (extension) {
            case 'jpg':
            case 'png':
            case 'gif':
            case 'bmp':
            case 'jpeg':
                return true;
                break;
        }
        return false;
    }
};

var getTimeSpan = function (ticks) {
    var d = new Date(ticks);
    return {
        month: d.getMonth(),
        day: d.getDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        year: d.getYear() - 70,
        week: Math.round(((ticks) / (1000 * 60 * 60 * 24)) / 7)
    }
}

var GetLocalDate = function (date) {
    var temp = new Date(moment(date));
    return temp;
}

var GetActualLocalDate = function (date) {
    var temp = new Date(moment(date));
    var LocalDate = Date.UTC(temp.getFullYear(), temp.getMonth(), temp.getDate(), temp.getHours(), temp.getMinutes(), temp.getSeconds(), temp.getMilliseconds());
    return new Date(LocalDate);
}

var GetTimeAgoString = function (date) {
    if (date != null && date != undefined) {
        return moment(GetActualLocalDate(date)).fromNow(true) + ' ago';
    }
    return "Unknown";
}
var GetTimeString = function (date) {
    if (date != null && date != undefined) {
        var a = moment(CurrentUser.CD).startOf('day');
        var b = moment(GetActualLocalDate(date)).startOf('day');
        var diff = a.diff(b, 'days');
        if (diff == 0)
            return { str: "Today", days: 0 };
        else if (diff == -1)
            return { str: "Tomorrow", days: -1 };
        else if (diff == 1)
            return { str: "Yesterday", days: 1 };
        return diff > 0 ? { str: (diff + " Days Old"), days: diff } : { str: (-diff + " Days Pending"), days: diff };
    }
    return { str: "Unknown", days: 0 };
}


var GetActualTimeString = function (date) {
    if (date != null && date != undefined) {
        var a = moment(CurrentUser.CD).startOf('day');
        var b = moment((date)).startOf('day');
        var diff = a.diff(b, 'days');
        if (diff == 0)
            return { str: "Today", days: 0 };
        else if (diff == -1)
            return { str: "Tomorrow", days: -1 };
        else if (diff == 1)
            return { str: "Yesterday", days: 1 };
        return diff > 0 ? { str: (diff + " Days Old"), days: diff } : { str: (-diff + " Days Pending"), days: diff };
    }
    return { str: "Unknown", days: 0 };
}
var showglobalmessage = function (Message, MessageType, Header, sticky) {
    if (MessageType == '' || MessageType == undefined || MessageType == null) {
        MessageType = "error";
    }
    if (Header == '' || Header == undefined || Header == null) {
        Header = "Message";
    } if (sticky == '' || sticky == undefined || sticky == null) {
        sticky = false;
    }
    MessageType = MessageType.toLocaleLowerCase();
    if (Message != '' && Message != undefined && Message != null) {
        if (!InitializedPageLoad) {
            $(function () {
                toastr[MessageType](Message, Header);
            });
        }
        else
            toastr[MessageType](Message, Header);
    }
}

var getSubValue = function (parent, child) {
    return parent[child];
}

var getGroup = function (Docs, prop, valueprop, SortProp, SortDirection) {
    var groups = [];

    var groupsArray = [];
    $.each(Docs, function (e, element) {
        if (Docs && Docs.constructor === Array) {
            var propPath = (prop.constructor === Array) ? prop : prop.split(".");
            var parent = element;
            var originalparent = element;
            for (var i = 0 ; i < propPath.length; i++) {
                if ((i + 1) >= propPath.length)
                    originalparent = parent;
                parent = getSubValue(parent, propPath[i]);
            }
            if (parent) {
                var isvalid = true;
                $.each(groupsArray, function (se, selement) {
                    if (selement.title == parent)
                        isvalid = false;
                });
                if (isvalid) {
                    groupsArray.push({ title: parent, values: [], Head: '', Sort: '', obj: originalparent });
                }
            }
        }
    });
    $.each(groupsArray, function (e, element) {
        $.each(Docs, function (de, delement) {
            if (Docs && Docs.constructor === Array) {
                var propPath = (prop.constructor === Array) ? prop : prop.split(".");
                var parent = delement;
                for (var i = 0 ; i < propPath.length; i++) {
                    parent = getSubValue(parent, propPath[i]);
                }
                if (parent) {
                    if (parent == element.title) {
                        element.values.push(delement);
                        if ((element.Head == '' || element.Head == undefined || element.Head == null) && valueprop != undefined && valueprop != null) {
                            propPath = (valueprop.constructor === Array) ? valueprop : valueprop.split(".");
                            parent = delement;
                            for (var i = 0 ; i < propPath.length; i++) {
                                parent = getSubValue(parent, propPath[i]);
                            }
                            if (parent)
                                element.Head = parent;
                        }
                        if ((element.Sort == '' || element.Sort == undefined || element.Sort == null) && SortProp != undefined && SortProp != null) {
                            propPath = (SortProp.constructor === Array) ? SortProp : SortProp.split(".");
                            parent = delement;
                            for (var i = 0 ; i < propPath.length; i++) {
                                parent = getSubValue(parent, propPath[i]);
                            }
                            if (parent)
                                element.Sort = parent;
                        }
                    }
                }
            }
        });
    });

    $.each(groupsArray, function (e, element) {
        if (element.Head == undefined || element.Head == null || element.Head == '') {
            element.Head = element.title;
        }
        if (element.Sort == undefined || element.Sort == null || element.Sort == '') {
            if (element.Head != undefined && element.Head != null && element.Head != '')
                element.Sort = element.Head;
            else element.Sort = element.title;
        }
    });
    sortJsonArrayByProperty(groupsArray, 'Sort', SortDirection == 1 ? 1 : -1);
    return groupsArray;
}

function sortJsonArrayByProperty(objArray, prop, direction, type) {
    if (arguments.length < 2) throw new Error("sortJsonArrayByProp requires 2 arguments");
    var direct = arguments.length > 2 ? arguments[2] : 1; //Default to ascending
    if (objArray && objArray.constructor === Array) {
        var propPath = (prop.constructor === Array) ? prop : prop.split(".");
        objArray.sort(function (a, b) {
            if (a != undefined && b != undefined && a != null && b != null) {
                var parent = a;

                for (var i = 0 ; i < propPath.length; i++) {
                    parent = getSubValue(parent, propPath[i]);
                }
                if (parent == true && parent != '')
                    parent = 1;
                if (parent == false && parent != '')
                    parent = 0;
                if (parent || parent == '') {
                    a = parent;
                }
                parent = b;
                for (var i = 0 ; i < propPath.length; i++) {
                    parent = getSubValue(parent, propPath[i]);
                }
                if (parent == true && parent != '')
                    parent = 1;
                if (parent == false && parent != '')
                    parent = 0;
                if (parent || parent == '') {
                    b = parent;
                }
                // convert numeric strings to integers
                if (type == "date") {
                    a = new Date(a);
                    b = new Date(b);
                }
                else if (type == "bool") {
                    if (a == false)
                        a = 1;
                    else a = -1;
                    if (b == false)
                        b = 1;
                    else b = -1;
                    if (a == true)
                        a = -1;
                    else a = 1;
                    if (b == true)
                        b = -1;
                    else b = 1;
                    return ((a < b) ? 1 * direct : ((a > b) ? -1 * direct : 0));
                } 
                else {
                    if (isNaN(a)) { try { a = a.toLowerCase(); } catch (e) { } }
                    if (isNaN(b)) { try { b = b.toLowerCase(); } catch (e) { } }
                    try {
                        a = a.match(/^\d+$/) ? +a : a;
                        b = b.match(/^\d+$/) ? +b : b;
                    } catch (e) {
                        a = parseInt(a);
                        b = parseInt(b);
                    }
                }
                return ((a < b) ? -1 * direct : ((a > b) ? 1 * direct : 0));
            }
        });
    }
}

var GetSelectedItems = function (objArray, index, size) {
    var FilteredList = [];
    if (index < 1)
        index = 1;
    var Total = objArray.length;
    for (var i = ((index - 1) * size) ; i < ((index) * size) ; i++) {
        if (objArray[i] != undefined && objArray[i] != null) {
            FilteredList.push(objArray[i]);
        }
    }
    return FilteredList;
}

var GetGroups = function (objArray, size) {
    var FilteredList = [];
    if (size < 1)
        size = 1;
    var Total = objArray.length;
    for (var i = 0 ; i < Total ; i++) {
        if (objArray[i] != undefined && objArray[i] != null) {
            FilteredList.push(objArray[i]);
        }
    }
    Total = FilteredList.length;
    var GroupedList = [];
    for (var i = 0 ; i < Total ; i++) {
        var group = [];
        group.push(FilteredList[i]);
        for (var j = 1 ; j < size ; j++) {
            i++;
            if ((i) < Total)
                group.push(FilteredList[i]);
        }
        GroupedList.push(group);
    }
    return GroupedList;
}

var GoToClientProfile = function (event, clientid, title, override) {
    if (event != null) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (title == null || title == undefined)
        title = "Contact Profile";
    else {
        if (override == true)
            title = title;
        else
            title = "Contact Profile - " + title;
    }
    if (clientid > 0)
        window.open("contact.aspx?id=" + clientid, '_blank');
}

var GoToCompanyProfile = function (event, companyid, title, override) {
    if (event != null) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (title == null || title == undefined)
        title = "Company Profile";
    else {
        if (override == true)
            title = title;
        else
            title = "Company Profile - " + title;
    }
    if (companyid > 0)
        window.open("Company.aspx?id=" + companyid, '_blank');

}

var GoToAccountantProfile = function (event, id, title, override) {
    if (event != null) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (title == null || title == undefined)
        title = "User Profile";
    else {
        if (override == true)
            title = title;
        else
            title = "User Profile - " + title;
    }
    if (id > 0)
        window.open("AccountantProfile.aspx?accountantid=" + id + '&popup=1', "_blank");
    if (id == null && CurrentUser.AccountantId > 0)
    { window.open("AccountantProfile.aspx?accountantid=" + CurrentUser.AccountantId + '&popup=1', "_blank"); }
}

var GoToAccountantCompanyProfile = function (event, companyid, title, override) {
    if (event != null) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (title == null || title == undefined)
        title = "User\'s Company Profile";
    else {
        if (override == true)
            title = title;
        else
            title = "User\'s Company Profile - " + title;
    }
    if (companyid > 0)
        ShowPopup("UserCompanyProfile.aspx?usercompanyid=" + companyid + '&popup=1', title);
    if (companyid == null && CurrentUser.AccountantCompanyId > 0)
    { ShowPopup("userCompanyProfile.aspx?usercompanyid=" + CurrentUser.AccountantCompanyId + '&popup=1', 'User\'s Company Profile - ' + $('#divCompanies a.dropdown-toggle .name').text()); }
}

var GoToServiceProfile = function (event, id, title, override) {
    if (event != null) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (title == null || title == undefined)
        title = "Service Profile";
    else {
        if (override == true)
            title = title;
        else
            title = "Service Profile - " + title;
    }
    window.open('Services.aspx', "_blank");
    //if (id > 0)
    //    ShowPopup("ServiceProfile.aspx?serviceid=" + id + '&popup=1', title);
}

var GoToTeamProfile = function (event, id, title, override) {
    if (event != null) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (title == null || title == undefined)
        title = "Team Profile";
    else {
        if (override == true)
            title = title;
        else
            title = "Team Profile - " + title;
    }
    window.open('team.aspx', "_blank");
    //if (id > 0)
    //    ShowPopup("teamProfile.aspx?teamid=" + id + '&popup=1', title);
}

var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var DesignGoToProfileAnchor = function (id, title, override, Name, type, className, ExtraText, initialFunction) {
    if (ExtraText == undefined || ExtraText == null)
        ExtraText = '';
    if (initialFunction == undefined || initialFunction == null)
        initialFunction = '';
    else
        initialFunction = 'try{' + initialFunction + '}catch(e){};';
    var template = (ExtraText) + '<a class="ProfileAnchor" title="Go To Profile" onclick="' + initialFunction + 'GoTo' + type + 'Profile(event,' + id + ',\'' + title + '\',' + override + ');">' + Name + '</a>';
    if (className != null && className != undefined && className != '')
        $(template).addClass(className);


    return $(template)[0].outerHTML;
}
var OldMessageCount = 0;

var ShowPopup = function (url, Title, defaultCallBack, UnBlockCallBack) {
    window.open(url, "_blank");
    //$('.btn-group.open').removeClass('open');
    //PopupTitle = null;
    //if (Title == null || Title == undefined)
    //    Title = " ";
    //if (defaultCallBack == null || defaultCallBack == undefined)
    //    defaultCallBack = true;
    //$.blockUI({
    //    message: "<div class='TopPopupBar'><h4 id='PopupTitle' style=\"margin:0px;text-align:left;\">" + Title + "<button class=\"btn btn-danger pull-right btn-xsm\"  onclick=\"$.unblockUI();\"><i class=\"fa fa-close\"></i> Close</button></h2></div><div class='PopupBody'><div style='width:100%;margin-bottom:-5px;'><iframe  frameborder='0' onload=\"PopupLoaded($(this));\"></iframe></div></div>",
    //    css: {
    //        backgroundColor: 'White', cursor: 'default', width: '100%', left: '0', bottom: '0',
    //        top: '0px', marginBottom: '0px', border: '1px solid #000', 'z-index': 2030
    //    },
    //    overlayCSS: {
    //        backgroundColor: '#748DA3',
    //        cursor: 'default'
    //    },
    //    onBlock: function () {
    //        if ($('.blockUI.blockMsg.blockPage').find('.TopPopupBar').length > 0) {
    //            showwaiting($('.blockUI.blockMsg.blockPage').find('iframe').parent());
    //            if (url.indexOf('?') != -1)
    //                url = url + '&time=' + (((new Date()).getTime() * 10000) + 621355968000000000);
    //            else
    //                url = url + '?time=' + (((new Date()).getTime() * 10000) + 621355968000000000);
    //            $('.blockUI.blockMsg.blockPage').find('iframe').attr('src', url);
    //            $('.blockUI.blockMsg.blockPage').find('iframe').css('min-height', $('.blockUI.blockMsg.blockPage').height() - 32 + 'px');
    //            setTimeout(function () {
    //                $('.blockOverlay').css('height', GetscrollHeight($('.MasterParentDiv')));
    //            }, 2000);
    //        }
    //    },
    //    onUnblock: function () {
    //        if (defaultCallBack)
    //            PopupClose();
    //        else if (typeof UnBlockCallBack !== 'undefined') {
    //            if (UnBlockCallBack != undefined && UnBlockCallBack != null) {
    //                if (typeof UnBlockCallBack !== 'undefined' && $.isFunction(UnBlockCallBack)) {
    //                    UnBlockCallBack();
    //                }
    //            }
    //        }
    //    }
    //});
}

var PopupLoaded = function (obj) {
    hidewaiting($(obj).parent());
    $(obj).css('float', 'none');
}

var ShowLoginPopup = function (url, Title, defaultCallBack, UnBlockCallBack) {
    PopupTitle = null;
    if (url == null || url == undefined)
        url = "Login.aspx?popup=1";
    if (Title == null || Title == undefined)
        Title = "";
    if (defaultCallBack == null || defaultCallBack == undefined)
        defaultCallBack = true;
    $.blockUI({
        message: "<div class='TopPopupBar'><h4 id='PopupTitle' style=\"margin:0px;text-align:left;\">" + Title + "</h2></div><div class='PopupBody'><div style='width:100%'><iframe  frameborder='0' onload=\"hidewaiting($(this).parent());\"></iframe></div></div>",
        css: {
            backgroundColor: 'White', cursor: 'default', width: '60%', left: '20%',
            top: '50px', marginBottom: '0px', border: '1px solid #000'
        },
        overlayCSS: {
            backgroundColor: '#748DA3',
            cursor: 'default'
        },
        onBlock: function () {
            if ($('.blockUI.blockMsg.blockPage').find('.TopPopupBar').length > 0) {
                showwaiting($('.blockUI.blockMsg.blockPage').find('iframe').parent());
                if (url.indexOf('?') != -1)
                    url = url + '&time=' + (((new Date()).getTime() * 10000) + 621355968000000000);
                else
                    url = url + '?time=' + (((new Date()).getTime() * 10000) + 621355968000000000);
                $('.blockUI.blockMsg.blockPage').find('iframe').attr('src', url);
                setTimeout(function () {
                    $('.blockOverlay').css('height', GetscrollHeight($('.MasterParentDiv')));
                }, 2000);
            }
        },
        onUnblock: function () {
            if (defaultCallBack)
                PopupClose();
            else if (typeof UnBlockCallBack !== 'undefined') {
                if (UnBlockCallBack != undefined && UnBlockCallBack != null) {
                    if (typeof UnBlockCallBack !== 'undefined' && $.isFunction(UnBlockCallBack)) {
                        UnBlockCallBack();
                    }
                }
            }
        }
    });
}

var ShowDocuments = function (object, url) {
    if (object != null && object != undefined)
        $(object).removeClass('active');

    if (url != null && url != undefined)
        url = ('documents.aspx' + url);
    else
        url = ('documents.aspx');
    if (typeof GetRealFiles == 'undefined' || !$.isFunction(GetRealFiles)) {
        GetRealFiles = null;
    }
    ShowPopup(url, 'Documents', false, GetRealFiles);
}

var ShowReports = function (object, url) {
    if (object != null && object != undefined)
        $(object).removeClass('active');

    if (url != null && url != undefined)
        url = ('reports.aspx' + url);
    else
        url = ('reports.aspx');
    if (typeof GetRealFiles == 'undefined' || !$.isFunction(GetRealFiles)) {
        GetRealFiles = null;
    }
    ShowPopup(url, 'Reports', false, GetRealFiles);
}
function PopupClose() {
    if (typeof ClientProfile !== 'undefined') {
        if (ClientProfile != undefined && ClientProfile != null) {
            if (ClientProfile.PopupClose != undefined && ClientProfile.PopupClose != null) {
                ClientProfile.PopupClose();
            }
        }
    }
    if (typeof AccountantProfile !== 'undefined') {
        if (AccountantProfile != undefined && AccountantProfile != null) {
            if (AccountantProfile.PopupClose != undefined && AccountantProfile.PopupClose != null) {
                AccountantProfile.PopupClose();
            }
        }
    }
    if (typeof CompanyProfile !== 'undefined') {
        if (CompanyProfile != undefined && CompanyProfile != null) {
            if (CompanyProfile.PopupClose != undefined && CompanyProfile.PopupClose != null) {
                CompanyProfile.PopupClose();
            }
        }
    }
    if (typeof AccountantCompanyProfile !== 'undefined') {
        if (AccountantCompanyProfile != undefined && AccountantCompanyProfile != null) {
            if (AccountantCompanyProfile.PopupClose != undefined && AccountantCompanyProfile.PopupClose != null) {
                AccountantCompanyProfile.PopupClose();
            }
        }
    }
    if (typeof ServiceProfile !== 'undefined') {
        if (ServiceProfile != undefined && ServiceProfile != null) {
            if (ServiceProfile.PopupClose != undefined && ServiceProfile.PopupClose != null) {
                ServiceProfile.PopupClose();
            }
        }
    }
    if (typeof TeamProfile !== 'undefined') {
        if (TeamProfile != undefined && TeamProfile != null) {
            if (TeamProfile.PopupClose != undefined && TeamProfile.PopupClose != null) {
                TeamProfile.PopupClose();
            }
        }
    }

}

var MyCompanyDialog = function () {
    var url = ('AccountantCompany.aspx?popup=1');
    window.open(url, '_blank');
}

var ResetFullMasterPage = function () {
    location.href = location.href.replace(/#/g, '');
}

var CreateCompany = function (object) {
    var url = ('AccountantCompany.aspx?popup=1&newcompany=1');
    ShowPopup(url, 'Consultant\'s Companies', false, ResetFullMasterPage);
}

//Only Used by Telerik Windows
var PopupTitle;
function makecenter(sender, eventArgs) {
    $('.RadWindow').css('top', '35px');
    if (PopupTitle != undefined && PopupTitle != null) {
        sender.set_title(PopupTitle);
        setTimeout(function () { sender.set_title(PopupTitle); }, 5000);
    }
}

function ShowAutoCompleteMasterSearch(obj, AppendObj) {
    $(obj).autocomplete({
        source: function (request, response) {
            var data = {
                searchtext: request.term,
                StartDate: null,
                EndDate: null
            }; HideAllBootstrapPopovers($('.ui-autocomplete')); HideAllBootstrapPopovers($('.MasterParentDiv'));
            if (AppendObj != null && AppendObj != undefined)
                $(AppendObj).find('i').addClass('fa-spinner').addClass('fa-spin').removeClass('fa-search');
            $.ajax({
                url: "Home.aspx/GetSearch",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                async: true,
                dataType: "json",
                success: function (datareturn) {
                    if (AppendObj != null && AppendObj != undefined)
                        $(AppendObj).find('i').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-search');
                    if (datareturn.d != undefined) {
                        var message = eval('[' + datareturn.d + ']');
                        if (message[0].Message === "Session Expired") {
                            location.href = "Login.aspx";
                        }
                        else if (message[0].MessageType === "success") {
                            var datas = message[0].datas;
                            var Arrangeddata = [];
                            $.each(datas, function (e, element) {
                                if (element.PR > 49) {
                                    var category = '';
                                    switch (element.C) {
                                        case 'CL': category = "Contact"; break;
                                        case 'C': category = "Company"; break;
                                        case 'A': category = "Accountant"; break;
                                        case 'S': category = "Service"; break;
                                        case 'T': category = "Team"; break;
                                        case 'P': category = "Project"; break;
                                    }
                                    Arrangeddata.push({
                                        label: element.FN + (element.MN != null ? (' ' + element.MN) : '') + (element.LN != null ? (' ' + element.LN) : ''),
                                        category: category,
                                        FN: element.FN,
                                        MN: element.MN,
                                        LN: element.LN,
                                        Image: element.I,
                                        Id: element.Id,
                                        CO: element.CO,
                                        Y: element.Y,
                                        PR: element.PR
                                    });
                                }
                            });
                            sortJsonArrayByProperty(Arrangeddata, "PR", -1);
                            response(Arrangeddata);
                        }
                    }
                },
                error: function (a, b) {
                    if (AppendObj != null && AppendObj != undefined)
                        $(AppendObj).find('i').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-search');
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            if (ui.item) {
                switch (ui.item.category) {
                    case 'Contact': GoToClientProfile(null, ui.item.Id, ui.item.label, false); break;
                    case 'Company': GoToCompanyProfile(null, ui.item.Id, ui.item.label, false); break;
                    case 'Accountant': GoToAccountantProfile(null, ui.item.Id, ui.item.label, false); break;
                    case 'Service': GoToServiceProfile(null, ui.item.Id, ui.item.label, false); break;
                    case 'Team': GoToTeamProfile(null, ui.item.Id, ui.item.label, false); break;
                    case 'Project': ShowPopup('Projects.aspx?popup=1&projectid=' + ui.item.Id, ui.item.label); break;
                }
            }
            return false;
        },
        open: function () {
            $(this).data("ui-autocomplete").menu.element.removeClass("ui-corner-all").addClass("ui-corner-top").addClass("ui-small");
        },
        close: function () {
            HideAllBootstrapPopovers($('.ui-autocomplete')); HideAllBootstrapPopovers($('.MasterParentDiv'));
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        if (item.category == 'Contact' || item.category == 'Company' || item.category == 'Accountant') {
            image = null;
            if (item.Image != null)
                image = GetThumbPath(GetImagePath(item.Image), true);
            else if (item.LN != null)
                image = getInitials({ first: item.FN, last: item.LN }, true);
            else
                image = getInitials(item.FN, true);
            var li = $("<li>").data("ui-autocomplete-item", item).addClass('li-autocomplete-' + item.category).attr('title', item.category).addClass('li-autocomplete-search');
            if (item.category == "Accountant")
                li.append("<a><img src=\"" + image + "\"  class=\"img-circle\" /><span >" + item.label + "</span></a>");

            else if (item.category == "Company") {
                li.append("<a><img src=\"" + image + "\"  class=\"img-square\" /><span>" + item.label + "</span></a>");
                CreateCompanyProfilePopover(item.Id, li, '.MasterParentDiv', 'auto right');
            }
            else if (item.category == "Contact") {
                li.append("<a><img src=\"" + image + "\" class=\"img-circle\" /><span >" + item.label + "</span></a>");
                CreateContactProfilePopover(item.Id, li, '.MasterParentDiv', 'auto right');
            }
            else
                li.append("<a><img src=\"" + image + "\" class=\"img-circle\" /><span ><b>" + item.label + "</b></span></a>");
            return li.appendTo(ul);
        }
        else {
            if (item.category != "Project")
                return $("<li>").data("ui-autocomplete-item", item).addClass('li-autocomplete-' + item.category).attr('title', item.category).addClass('li-autocomplete-search')
                                          .append("<a ><div style=\"margin-left:5px;width:100%;\">" + item.label + "</div></a>")
                                          .appendTo(ul);
            else {
                return $("<li>").data("ui-autocomplete-item", item).addClass('li-autocomplete-' + item.category).attr('title', item.category).addClass('li-autocomplete-search')
                                    .append("<a ><div style=\"margin-left:5px;width:100%;\"><b>" + item.label + "</b></div><div style=\"margin-left:5px;width:100%;\">" + item.CO + "</div><div style=\"margin-left:5px;width:100%;\">" + item.Y + "</div></a>")
                                    .appendTo(ul);
            }
        }
    }

    //    .data("ui-autocomplete")._renderMenu = function (ul, items) {
    //    var that = this,
    //    currentCategory = "";
    //    $.each(items, function (index, item) {
    //        var li;
    //        if (item.category != currentCategory) {
    //            ul.append("<li class='ui-autocomplete-category ui-category-" + item.category + "'>" + item.category + "</li>");
    //            currentCategory = item.category;
    //        }
    //        li = that.renderItem(ul, item);
    //        if (item.category) {
    //            li.attr("aria-label", item.category + " : " + item.label);
    //            li.addClass("ui-category-" + item.category);
    //        }
    //    });
    //};
    //$(obj).data("ui-autocomplete").renderItem = function (ul, item) {
    //    if (item.category == 'Contact' || item.category == 'Company' || item.category == 'Accountant') {
    //        image = null;
    //        if (item.Image != null)
    //            image = GetThumbPath(GetImagePath(item.Image), true);
    //        else if (item.LN != null)
    //            image = getInitials({ first: item.FN, last: item.LN }, true);
    //        else
    //            image = getInitials(item.FN, true);
    //        var li = $("<li>").data("ui-autocomplete-item", item);
    //        if (item.category == "Accountant")
    //            li.append("<a><img src=\"" + image + "\" style=\"max-width:21px;float:left;    margin-right: 10px;\" class=\"img-circle\" /><span style=\" line-height: 16px;vertical-align: middle;\">" + item.label + "</span></a>");

    //        else if (item.category == "Company") {
    //            li.append("<a><img src=\"" + image + "\" style=\"max-width:21px;float:left;    margin-right: 10px;\" class=\"img-square\" /><span style=\" line-height: 16px;vertical-align: middle;\">" + item.label + "</span></a>");
    //            CreateCompanyProfilePopover(item.Id, li, '.MasterParentDiv', 'auto right');
    //        }
    //        else if (item.category == "Contact") {
    //            li.append("<a><img src=\"" + image + "\" style=\"max-width:21px;float:left;    margin-right: 10px;\" class=\"img-square\" /><span style=\" line-height: 16px;vertical-align: middle;\">" + item.label + "</span></a>");
    //            CreateContactProfilePopover(item.Id, li, '.MasterParentDiv', 'auto right');
    //        }
    //        else
    //            li.append("<a><img src=\"" + image + "\" style=\"max-width:21px;float:left;    margin-right: 10px;\" class=\"img-circle\" /><span style=\"line-height: 16px;vertical-align: middle;\"><b>" + item.label + "</b></span></a>");
    //        return li.appendTo(ul);
    //    }
    //    else {
    //        if (item.category != "Project")
    //            return $("<li>").data("ui-autocomplete-item", item)
    //                                      .append("<a ><div style=\"margin-left:5px;width:100%;\">" + item.label + "</div></a>")
    //                                      .appendTo(ul);
    //        else {
    //            return $("<li>").data("ui-autocomplete-item", item)
    //                                .append("<a ><div style=\"margin-left:5px;width:100%;\"><b>" + item.label + "</b></div><div style=\"margin-left:5px;width:100%;\">" + item.CO + "</div><div style=\"margin-left:5px;width:100%;\">" + item.Y + "</div></a>")
    //                                .appendTo(ul);
    //        }
    //    }
    //};
    if (AppendObj != null && AppendObj != undefined)
        _createShowAgainButton(obj, AppendObj);
}

var _createShowAgainButton = function (obj, AppendObj, showall) {
    var input = $(obj);
    $(AppendObj).mousedown(function () {
        wasOpen = input.autocomplete("widget").is(":visible");
    })
    .click(function () {
        if ($(input).attr('disabled') != 'disabled')
            input.focus();
        // Close if already visible
        if (wasOpen) {
            input.autocomplete("widget").hide();
            return false;
        }
        // Pass empty string as value to search for, displaying all results
        if (showall == true)
            input.autocomplete("search", "");
        else
            input.autocomplete("search", input.val());
        return false;
    });

}

var highlight = function (text, str, className) {
    return text.replace(/str/g, "<span class=\"" + className + "\">" + str + "</span>");
};

var SetSeedMessages = function (oldmessage) {
    if (UserSettings != null) {
        if (oldmessage != null && oldmessage != undefined) {
            UserSettings.SeedMessages = jQuery.grep(UserSettings.SeedMessages, function (a) {
                return a.Message !== oldmessage;
            });
        }
        if (UserSettings.SeedMessages.length > 0) {
            oldmessage = UserSettings.SeedMessages[0].Message;
            showglobalmessage(UserSettings.SeedMessages[0].Message, UserSettings.SeedMessages[0].MessageType);
            setTimeout(function () { SetSeedMessages(UserSettings.SeedMessages[0].Message); }, 10000);
        }
    }
}

var MessageSeedCount = 0;
var oldMessage = '';

var cancelSetStatus = function () {
    $('#txtAutoCompleteCurrentStatusProjectFilter').autocomplete("widget").hide();
    $('#txtAutoCompleteCurrentStatusoldFilter').autocomplete("widget").hide();
    $.unblockUI();
    $('.top-bar-right').find('.btn-afterStatus').removeAttr('disabled', 'disabled');
    $('body').css('overflow', '');
}

var waitfirsttime = 2000;
var TakeStatus = function (mode) {
    setTimeout(function () {
        waitfirsttime = 0;
        if ($('.blockUI.StatusblockUI.blockPage').length == 0) {
            var top = '35px';
            if ($('#form1').hasClass('PopupForm')) {
                top = '0px';
            }
            $.blockUI({
                blockMsgClass: 'StatusblockUI',
                message: function () {
                    var template = $('.divStatusInput').clone();
                    $(template).find('.modal-dialog').addClass('divStatusInputBlockUI');
                    $(template).find('#txtCurrentStatusName_0').attr('id', 'txtCurrentStatusName');
                    $(template).find('#txtAutoCompleteCurrentStatusProjectFilter_0').attr('id', 'txtAutoCompleteCurrentStatusProjectFilter');
                    $(template).find('#txtAutoCompleteCurrentStatusProjectFilterAppend_0').attr('id', 'txtAutoCompleteCurrentStatusProjectFilterAppend');
                    $(template).find('#txtAutoCompleteCurrentStatusoldFilter_0').attr('id', 'txtAutoCompleteCurrentStatusoldFilter');
                    $(template).find('#txtAutoCompleteCurrentStatusoldFilterAppend_0').attr('id', 'txtAutoCompleteCurrentStatusoldFilterAppend');
                    $(template).find('#txtCurrentStatusDescription_0').attr('id', 'txtCurrentStatusDescription');
                    $(template).find('#ddlCurrentStatusType_0').attr('id', 'ddlCurrentStatusType');
                    $(template).find('#chkCurrentStatusIsBillable_0').attr('id', 'chkCurrentStatusIsBillable').parent().find('label').attr('for', 'chkCurrentStatusIsBillable');
                    $(template).find('#btnSetStatus_0').attr('id', 'btnSetStatus').attr('onclick', 'SaveStatus(); return false;');
                    $(template).find('#btnCancelSetStatus_0 ').attr('id', 'btnCancelSetStatus').attr('data-id', CurrentUser.SL.ID);
                    $(template).find('#chkIsEdit_0').attr('id', 'chkIsEdit');

                    if (CurrentUser.SL != null && CurrentUser.SL.ID > 0) {
                        $(template).find('a[data-dismiss="modal"]').removeClass('hide').attr('onclick', 'cancelSetStatus();');
                    }
                    return $(template).html();
                },
                css: {
                    backgroundColor: 'none', cursor: 'default', width: '100%', left: '0', bottom: '0',
                    top: top, marginBottom: '0px', border: 'none'
                },
                overlayCSS: {
                    backgroundColor: '#748DA3',
                    cursor: 'default',
                    opacity: '0.90', top: top
                },
                onBlock: function () {
                    if ($('.blockUI.StatusblockUI.blockPage').find('.divStatusInputBlockUI').length > 0) {
                        var elem = document.querySelector('#chkIsEdit');
                        var switchery = new Switchery(elem, { color: '#1AB394' });
                        $('body').css('overflow', 'hidden');
                        $('.top-bar-right').find('.btn-afterStatus').attr('disabled', 'disabled');
                        ShowAutoCompleteCurrentStatusProjectMasterSearch($('#txtAutoCompleteCurrentStatusProjectFilter'), $('#txtAutoCompleteCurrentStatusProjectFilterAppend'), true);
                        ShowAutoCompleteLastStatusFilter();
                    }
                }
            });
        }
    }, waitfirsttime);
}
var ChangeStatusMode = function (obj, e) {
    $('#txtAutoCompleteCurrentStatusProjectFilter').autocomplete("widget").hide();
    $('#txtAutoCompleteCurrentStatusoldFilter').autocomplete("widget").hide();
    if (!$(obj).prop('checked')) {
        $('.divStatusInputBlockUI .divOlderStatusFilter').fadeIn();
        $('.divStatusInputBlockUI #txtCurrentStatusName').val('');
        $('.divStatusInputBlockUI #txtCurrentStatusDescription').text('');
        $('.divStatusInputBlockUI #txtAutoCompleteCurrentStatusProjectFilter').removeAttr('value').removeAttr('data-value');
        $('.divStatusInputBlockUI #txtAutoCompleteCurrentStatusProjectFilter').val('');
        $('#btnSetStatus').html('Set New Status').attr('onclick', 'SaveStatus(); return false;');
    }
    else {
        $('.divStatusInputBlockUI .divOlderStatusFilter').fadeOut();
        $('#btnSetStatus').html('Save Current Status');
        if (CurrentUser.SL != null && CurrentUser.SL != undefined) {
            $('#btnSetStatus').attr('onclick', 'SaveStatus(' + CurrentUser.SL.ID + '); return false;');
            $('.divStatusInputBlockUI').find('.divOlderStatusFilter').hide();
            $('.divStatusInputBlockUI').find('#txtCurrentStatusName').val(CurrentUser.SL.N);
            if (CurrentUser.SL.P != null) {
                SelectedStatusProjectId = CurrentUser.SL.P.Id;
                $('.divStatusInputBlockUI #txtAutoCompleteCurrentStatusProjectFilter').val(CurrentUser.SL.P.N);
                $('.divStatusInputBlockUI #txtAutoCompleteCurrentStatusProjectFilter').attr('value', CurrentUser.SL.P.N).attr('data-value', CurrentUser.SL.P.Id);
            }
            $('.divStatusInputBlockUI').find('#txtCurrentStatusDescription').text(CurrentUser.SL.D);
            $('.divStatusInputBlockUI').find('#btnSetStatus').attr('onclick', 'SaveStatus(' + CurrentUser.SL.ID + '); return false;');
        }
    }
}
var SaveStatus = function (Id) {
    var IsValid = true;
    $('.form-control-error').removeClass('form-control-error');
    if (($('#txtCurrentStatusName').val()).trim() == "") {
        $('#txtCurrentStatusName').addClass('form-control-error');
        IsValid = false;
    }

    if (IsValid) {
        if (Id == undefined || Id == null)
            Id = 0;
        var Name = $('#txtCurrentStatusName').val();
        var ProjectId = parseFloat($("#txtAutoCompleteCurrentStatusProjectFilter").attr('data-value'));
        var Description = $("#txtCurrentStatusDescription").val().trim();
        //var type = $("#ddlCurrentStatusType").val();
        // var IsBillable = $("#chkCurrentStatusIsBillable").prop('checked');
        var IsBillable = false;
        var type = "Other";
        if (ProjectId > 0) {
            type = "Project";
            IsBillable = true;
        }

        SaveCurrentStatus(Id, Name, Description, ProjectId, type, IsBillable);
    }
}

var SaveCurrentStatus = function (Id, Name, Description, ProjectId, type, IsBillable) {
    var data = {
        Id: Id,
        Name: Name,
        Description: Description,
        stype: type,
        ProjectId: ProjectId,
        IsBillable: IsBillable
    };
    showwaiting($('.blockUI.StatusblockUI.blockPage'));
    $.ajax({
        type: "POST",
        url: 'TimeSheet.aspx/SetCurrentStatus',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (response) {
            hidewaiting($('.blockUI.StatusblockUI.blockPage'));

            //  hidewaiting();
            if (response.d != undefined) {

                var message = eval('[' + response.d + ']');

                if (message[0].MessageType == 'success') {
                    var element = message[0].log;
                    showglobalmessage("Status has been Changed Successfully", "success");
                    CurrentUser.SL = element;
                    $('#divAccountantStatus').find('.name').html(element.N);
                    $('#divAccountantStatus').find('.EditStatus').removeClass('hide');
                    // $('#divAccountantStatus').find('.name').attr('title', element.D);
                    $('#divAccountantStatus').find('.name').attr('data-StatusId', element.ID);
                    $.unblockUI();
                    $('.top-bar-right').find('.btn-afterStatus').removeAttr('disabled', 'disabled');
                    $('.top-bar').find('.btn-afterStatus').removeAttr('disabled', 'disabled');

                    $('body').css('overflow', '');

                    if (CurrentUser.SL.P != null)
                        $('#divAccountantStatus').find('.name').attr('data-original-title', "Project :<b>" + CurrentUser.SL.P.N + "</b><br/><em>Contact : <b>" + CurrentUser.SL.P.CL + "</b><br/>Company : <b>" + CurrentUser.SL.P.CO + "</b><br/>Description : " + CurrentUser.SL.D + "<br/>Start Time : " + moment(GetActualLocalDate(CurrentUser.SL.ST)).fromNow() + "</em>");
                    else $('#divAccountantStatus').find('.name').attr('data-original-title', "Project :<b>None</b><br/><em>Description : " + CurrentUser.SL.D + "<br/>Start Time : " + moment(GetActualLocalDate(CurrentUser.SL.ST)).fromNow() + "</em>");
                    //  $('#divAccountantStatus').find('.name').attr('data-original-title', $('#divAccountantStatus').find('.name').attr('title'));

                }
                else {
                    showglobalmessage("Error Saving Status Details", "error");

                }
            }
        },
        failure: function (response) {
            hidewaiting($('.blockUI.StatusblockUI.blockPage'));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            hidewaiting($('.blockUI.StatusblockUI.blockPage'));
        }
    });
}

var ProjectCurrentStatuscache = {};
function ShowAutoCompleteCurrentStatusProjectMasterSearch(obj, AppendObj, cinitialized) {
    cinitialized = false;
    $(obj).autocomplete({
        source: function (request, response) {
            var term = request.term;
            if (term in ProjectCurrentStatuscache) {

                if (ProjectCurrentStatuscache[term].length == 0) {
                    $(obj).val('');
                    $(obj).attr('data-value', '');
                }
                response(ProjectCurrentStatuscache[term]);
                return;
            }
            var data = {
                ProjectId: SelectedStatusProjectId > 0 ? SelectedStatusProjectId : 0,
                text: request.term, StartDate: null,
                EndDate: null
            };
            if (AppendObj != null && AppendObj != undefined)
                $(AppendObj).find('span').addClass('fa').addClass('fa-spinner').addClass('fa-spin').removeClass('caret');
            $.ajax({
                url: "TimeSheet.aspx/GetProjects",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                async: true,
                dataType: "json",
                success: function (datareturn) {
                    if (AppendObj != null && AppendObj != undefined)
                        $(AppendObj).find('span').removeClass('fa').removeClass('fa-spinner').removeClass('fa-spin').addClass('caret');
                    if (datareturn.d != undefined) {
                        var message = eval('[' + datareturn.d + ']');
                        if (message[0].Message === "Session Expired") {
                            location.href = "Login.aspx";
                        }
                        else if (message[0].MessageType === "success") {
                            var datas = message[0].Ps;
                            var Arrangeddata = [];
                            $.each(datas, function (e, element) {
                                Arrangeddata.push({
                                    label: element.N,
                                    category: element.CL,
                                    Id: element.Id,
                                    obj: element,
                                    value: element.Id
                                });
                            });

                            ProjectCurrentStatuscache[term] = Arrangeddata;
                            if (Arrangeddata.length == 0) {
                                $(obj).val('');
                                $(obj).attr('data-value', '');
                            }
                            response(Arrangeddata);
                        }
                    }
                },
                error: function (a, b) {
                    if (AppendObj != null && AppendObj != undefined)
                        $(AppendObj).find('span').removeClass('fa').removeClass('fa-spinner').removeClass('fa-spin').addClass('caret');
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            $(obj).val(ui.item.label);
            $('#txtCurrentStatusName').val(ui.item.label);
            return false;
        },
        change: function (event, ui) {
            if (cinitialized != true) {
                var ccaid = null;
                $(obj).removeAttr('data-value');

                if (ui.item != null && ui.item != undefined) {
                    ccaid = parseInt(ui.item.value);
                    if (ccaid > 0) {
                        $(obj).attr('data-value', ccaid);

                    }
                }
            }
            cinitialized = false;
        },
        open: function () {
            $(this).data("ui-autocomplete").menu.element.removeClass("ui-corner-all").addClass("ui-corner-top").addClass("ui-small");
            $($(this).data("ui-autocomplete").menu.element).highlight($(obj).val());
            $(this).data("ui-autocomplete").menu.element.css('max-width', '300px');
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    }).data("ui-autocomplete")._renderMenu = function (ul, items) {
        var that = this,
        currentCategory = "";
        $.each(items, function (index, item) {
            var li;
            if (item.category != currentCategory) {
                ul.append("<li class='ui-autocomplete-category ui-category-" + item.category + "'>" + item.category + "</li>");
                currentCategory = item.category;
            }
            li = that.renderItem(ul, item);
            if (item.category) {
                li.attr("aria-label", item.category + " : " + item.label);
            }
        });
    };
    $(obj).data("ui-autocomplete").renderItem = function (ul, item) {

        return $("<li>")
            .data("ui-autocomplete-item", item)
                      .append("<a><div style=\"margin:5px;width:100%;float:left;\"><b>" + item.obj.N + "</b><br>" + item.obj.C + "<br>" + item.obj.S + "<br>" + item.obj.Y + "</div></a>")
                      .appendTo(ul);
    };
    if (AppendObj != null && AppendObj != undefined)
        _createShowAgainButton(obj, AppendObj);
}

var ResetOldStatus = function () {
    SelectedStatusProjectId = 0;
}
var SelectedStatusProjectId = 0;
function ShowAutoCompleteLastStatusFilter() {
    var obj = $('#txtAutoCompleteCurrentStatusoldFilter');
    var AppendObj = $('#txtAutoCompleteCurrentStatusoldFilterAppend');
    $(AppendObj).html('<span class="fa fa-spin fa-spinner"></span>');
    var data = {};
    $.ajax({
        type: "POST",
        url: 'TimeSheet.aspx/GetOldStatus',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        async: true,
        dataType: "json",
        success: function (response) {
            $(AppendObj).html('<span class="caret"></span>');
            if (response.d != undefined) {
                var message = eval('[' + response.d + ']');
                if (message[0].Message === "Session Expired") {
                    location.href = "Login.aspx";
                }
                else if (message[0].MessageType === "success") {
                    var logs = eval(message[0].logs);
                    var Arrangeddata = [];
                    $.each(logs, function (e, element) {
                        Arrangeddata.push({
                            label: element.N,
                            Id: element.ID,
                            obj: element,
                            value: element.ID
                        });
                    });
                    logs = Arrangeddata;
                    $(obj).autocomplete({
                        minLength: 0,
                        width: 'auto',
                        source: logs,
                        focus: function (event, ui) {
                            return false;
                        },
                        open: function () {
                            $(this).data("ui-autocomplete").menu.element.removeClass("ui-corner-all").addClass("ui-corner-top").addClass("ui-small");
                            $(this).data("ui-autocomplete").menu.element.css('max-width', '300px');
                        },
                        select: function (event, ui) {
                            $(obj).val(ui.item.label);
                            setTimeout(function () {
                                $(obj).blur();
                            }, 200);
                            return false;
                        },
                        change: function (event, ui) {
                            var TemplateId = null;
                            $(obj).removeAttr('data-value');
                            if (ui.item != null && ui.item != undefined) {
                                TemplateId = parseInt(ui.item.value);
                                if (TemplateId > 0) {
                                    $(obj).attr('data-value', TemplateId);
                                    $('#txtCurrentStatusName').val(ui.item.label);
                                    $('#ddlCurrentStatusType').val(ui.item.obj.T);
                                    $('#chkCurrentStatusIsBillable').prop('checked', ui.item.obj.B);
                                    $('#txtCurrentStatusDescription').text(ui.item.obj.D);
                                    if (ui.item.obj.P != null) {
                                        if (ui.item.obj.P.Id > 0) {
                                            SelectedStatusProjectId = parseFloat(ui.item.obj.P.Id);
                                            $('#txtAutoCompleteCurrentStatusProjectFilter').val(ui.item.obj.P.N);
                                            $('#txtAutoCompleteCurrentStatusProjectFilter').attr('data-value', ui.item.obj.P.Id);
                                        }
                                    }
                                }
                            }
                        }
                    }).data("ui-autocomplete")._renderItem = function (ul, item) {
                        if (item.obj.P != null) {
                            return $("<li>")
                        .append("<a ><div style=\"width:100%;margin-left:5px;white-space:nowrap;\"  title='" + item.obj.D + "'><b>" + item.label + "</b><br>" + moment(item.CD).format('ddd Do MMM YYYY hh:mm:ss a') + "<br/> Project :<b>" + item.obj.P.N + "</b><br/><em>Contact : <b>" + item.obj.P.CL + "</b><br/>Company : <b>" + item.obj.P.CO + "</b></em><br><span>" + item.obj.D + "</span></div></a>")
                        .appendTo(ul);
                        } else {
                            return $("<li>")
                            .append("<a><div style=\"width:100%;margin-left:5px;white-space:nowrap;\"  title='" + item.obj.D + "'><b>" + item.label + "</b><br>" + moment(item.CD).format('ddd Do MMM YYYY hh:mm:ss a') + "<br><span>" + item.obj.D + "</span></div></a>")
                            .appendTo(ul);
                        }
                    };
                    _createShowAgainButton(obj, AppendObj, true);
                }
                else {
                    if (message[0].Message == '')
                        message[0].Message = 'Error Getting logs';
                    showglobalmessage(message[0].Message, message[0].MessageType);
                }
            }
        },
        failure: function (response) {
            $(AppendObj).html('<span class="caret"></span>');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(AppendObj).html('<span class="caret"></span>');
        }
    });
}

var HideAllBootstrapPopovers = function (object, except, exceptid) {
    if (object != null && object != undefined) {
        if (exceptid != null && exceptid != undefined) {
            $.each($(object).find('.popoverEdit'), function (e, element) {
                if (exceptid != $(element).attr('id'))
                    $(element).popover('hide');
            });
        }
        else if (except != null && except != undefined) {
            $(object).find('.popoverEdit').not(except).popover('hide');
            try
            {
                $(object).find('.popoverEdit').data('bs.popover').tip().hide();}
            catch (e)
            { }
        }
        else {
            $(object).find('.popoverEdit').popover('hide');
            //$(object).find('.popoverEdit').data('bs.popover').tip().hide();
        }
    }
}

var ConvertoGB = function (size) {
    var currentprefix = "GB";
    if (size > 999999999) {
        size = Math.round10(size / 1000000000, -2);
    }
    else if (size > 999999) {
        size = Math.round10(size / 1000000, -2); currentprefix = "MB";
    } else {
        size = Math.round10(size / 1000, -2); currentprefix = "KB";
    }
    return size + " " + currentprefix;
}

var SetProjectStatus = function (ProjectStatus) {
    if (ProjectStatus == null || ProjectStatus == undefined)
        return [];
    var ActualOrder = ["All", "Lead", "Not Started", "In Progress", "On Hold", "Completed", "Billed", "Collected"];
    if (ProjectStatus.length > 0) {
        var NewOrder = [];
        $.each(ActualOrder, function (e, element) {
            for (var i = 0; i < ProjectStatus.length; i++) {
                if (ProjectStatus[i].S == element) {
                    NewOrder.push(ProjectStatus[i]);
                    break;
                }
            }
        });
        return NewOrder;
    }
}

var ECBCalls = [];
$.fn.ECBCall = function (type, url, contentType, data, dataType, async, successcallback, errorcallback, failurecallback) {
    $.ajax({
        type: type,
        url: url,
        contentType: contentType,
        data: JSON.stringify(data),
        dataType: dataType,
        async: async,
        beforeSend: function (jqXHR) {
            jqXHR.url = url;
            ECBCalls.push(jqXHR);
        },
        complete: function (jqXHR) {
            var i = ECBCalls.indexOf(jqXHR);
            if (i > -1) ECBCalls.splice(i, 1);
        },
        success: function (response) { if (typeof successcallback == 'function' && successcallback != null) { successcallback(response); } },
        error: function (response) { if (typeof errorcallback == 'function' && errorcallback != null) { errorcallback(response); } },
        failure: function (response) { if (typeof failurecallback == 'function' && failurecallback != null) { failurecallback(response); } }
    });
}
var ECBCallsabortAll = function (url) {
    try {
        $(ECBCalls).each(function (i, jqXHR) {
            if (!url) {
                jqXHR.abort();
                ECBCalls.splice(i, 1);
            }
            else if (jqXHR.url == url) {
                jqXHR.abort();
                ECBCalls.splice(i, 1);
            }
        });
    }
    catch (e) { }
};

var CleatAutoComplete = function (event, obj, DefaultValue) {
    if (event != null && event != undefined) { event.stopPropagation(); event.preventDefault(); }
    if (DefaultValue == null || DefaultValue == undefined)
        DefaultValue = '';
    $(obj).val(DefaultValue);
    $(obj).removeAttr('data-value');
}

var ShowConfirmBox = function (Title, Message, YesCallBack, NoCallBack, type) {
    if ($('.blockUI.StatusblockUI.blockPage').length == 0 && $('.blockUI.ErrorMessageBlockUI.blockPage').length == 0) {

        var timestamp = (((new Date()).getTime() * 10000) + 621355968000000000);
        var top = '0px';
        $.blockUI({
            blockMsgClass: 'ErrorMessageBlockUI',
            message: function () {
                var template = $('.divErrorMessageWrapper').clone();
                if (Title != null && Title != undefined)
                    $(template).find('.dialog h2').html(Title);
                if (type == 'success' || type == "info")
                { $(template).find('.dialog').addClass(type); }
                $(template).find('.Popupclose').attr('onclick', 'cancelErrorMessage(' + timestamp + ');');
                $(template).find('.dialog .dialogContent').html(Message);
                $(template).find('.dialog').addClass('ErrorMessageContentBlockUI_' + timestamp);
                if (YesCallBack == undefined || YesCallBack == null)
                    YesCallBack = '';
                else
                    YesCallBack = 'try{' + YesCallBack + '}catch(e){};';
                if (NoCallBack == undefined || NoCallBack == null)
                    NoCallBack = '';
                else NoCallBack = 'try{' + NoCallBack + '}catch(e){};';
                $(template).find('.dialog').find('#btnErrorMessageTrue').attr('id', 'btnErrorMessageTrue_' + timestamp).attr('onclick', 'cancelErrorMessage();' + YesCallBack);
                $(template).find('.dialog').find('#btnErrorMessageFalse').attr('id', 'btnErrorMessageFalse_' + timestamp).attr('onclick', 'cancelErrorMessage();' + NoCallBack);
                return $(template).html();
            },
            css: {
                backgroundColor: 'none', cursor: 'default', width: '100%', left: '0', bottom: '0',
                top: top, marginBottom: '0px', border: 'none'
            },
            overlayCSS: {
                backgroundColor: '#748DA3',
                cursor: 'default',
                opacity: '0.90', top: top
            },
            onBlock: function () {
                if ($('.blockUI.ErrorMessageBlockUI.blockPage').find('.ErrorMessageContentBlockUI_' + timestamp).length > 0) {
                    HideSideBar();
                    $('body').css('overflow', 'hidden');
                }
            }
        });
    }
}

var cancelErrorMessage = function () {
    $.unblockUI();
    $('body').css('overflow', '');
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function (val, all) {
        var i, removedItems = [];
        if (all) {
            for (i = this.length; i--;) {
                if (this[i] === val) removedItems.push(this.splice(i, 1));
            }
        }
        else {  //same as before...
            i = this.indexOf(val);
            if (i > -1) removedItems = this.splice(i, 1);
        }
        return removedItems;
    };
}

var GetThumbPath = function (imagepath, small) {
    if (imagepath == null)
        imagepath = GetImagePath(DefaultUserImage);
    var filename = imagepath.replace(/^.*[\\\/]/, '');
    return imagepath.replace(filename, '') + (small == true ? "thumb32" : "thumb64") + "/" + filename
}

var HaveRolePermission = function (Property, Page) {
    var IsValid = false;
    if (RoleSettings[Property] == null || RoleSettings[Property] == undefined) {
        try {
            if (CurrentSettings) {
                if (CurrentSettings.Role) {
                    if (CurrentSettings.Role.IMO)
                        IsValid = true;
                    if (Page == null || Page == undefined) {
                        Page = CurrentSettings.Role.EPN;
                    }
                    if (CurrentSettings.Role.S.length > 0 && !IsValid) {
                        $.each(CurrentSettings.Role.S, function (se, selement) {
                            if (Page != null && Page != undefined) {
                                if (selement.N == Property && selement.PN == Page) {
                                    IsValid = true;
                                    return;
                                }
                            }
                            else if (selement.N == Property) {
                                IsValid = true;
                                return;
                            }
                        });
                    }
                }
            }
        }
        catch (e) {
            IsValid = false;
        }
        RoleSettings[Property] = IsValid;
    }
    else {
        return RoleSettings[Property];
    }
    return IsValid;
}

var GlobalDateFormat = function (date, NeedActual) {
    if (date != null && date != undefined) {
        if (NeedActual == false)
            return moment((date)).format('lll');
        else
            return moment(GetActualLocalDate(date)).format('lll');
    }
    else
        return "";
}

var GetColorCode = function (name) {
    if (name != null) {
        name = name.toLowerCase();
        var charcode = name.charCodeAt(0);
        if (charcode >= 97 && charcode <= 102) return "danger";
        else if (charcode >= 102 && charcode <= 107) return "warning";
        else if (charcode >= 108 && charcode <= 113) return "success";
        else if (charcode >= 114 && charcode <= 122) return "info";
        else return "default";
    }
    return "default";
}

var getInitials = function (name, smaller, bgclass) {
    var canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    canvas.width = '64';
    canvas.height = '64';
    if (smaller == true) {
        canvas.width = '32';
        canvas.height = '32';
    }
    document.body.appendChild(canvas);
    var context = canvas.getContext('2d');

    switch (bgclass) {
        case "danger": context.fillStyle = "#ed5565"; break;
        case "primary": context.fillStyle = "#16987e"; break;
        case "warning": context.fillStyle = "#f8ac59"; break;
        case "success": context.fillStyle = "#1872ab"; break;
        case "info": context.fillStyle = "#1eacae"; break;
        default: context.fillStyle = "#7a7a7a"; break;
    }
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = '26px sans-serif';
    if (smaller == true) { context.font = '13px sans-serif'; }
    context.fillStyle = "#FFF";
    var first, last;
    if (name.first == null) {
        name = name.replace('  ', ' ').replace('  ', ' ');
        first = name;
        last = null;
        var temp = name.split(' ');
        if (temp.length > 1) {
            first = temp[0][0];
            last = temp[temp.length - 1][0];
        }
        if (last) {
            var initials = first + last;
            if (smaller == true) {
                context.fillText(initials.toUpperCase(), 7, 21);
            }
            else {
                context.fillText(initials.toUpperCase(), 14, 42);
            }
        } else {
            var initials = first.toUpperCase();
            if (initials.length > 1) {
                initials = initials[0] + initials[1];
                if (smaller == true) {
                    context.fillText(initials, 7, 21);
                }
                else {
                    context.fillText(initials, 18, 42);
                }
            }
            else {
                if (smaller == true) {
                    context.fillText(initials, 13, 21);
                }
                else {
                    context.fillText(initials, 25, 42);
                }
            }
        }
        var data = canvas.toDataURL();
        document.body.removeChild(canvas);
        return data;
    }
    else if (name && name.first && name.first != '') {
        first = name.first[0];
        last = name.last && name.last != '' ? name.last[0] : null;
        if (last) {
            var initials = first + last;
            if (smaller == true) {
                context.fillText(initials.toUpperCase(), 7, 21);
            }
            else {
                context.fillText(initials.toUpperCase(), 14, 42);
            }
        } else {
            var initials = first;
            if (smaller == true) {
                context.fillText(initials.toUpperCase(), 11, 21);
            }
            else {
                context.fillText(initials.toUpperCase(), 18, 42);
            }
        }
        var data = canvas.toDataURL();
        document.body.removeChild(canvas);
        return data;
    } else {
        return DefaultUserImage;
    }
}

var CreatePopoverObject = function (Name, Type, Class, Image, PopoverCallBack, PopoverhideCallBack) {
    var object = {};
    object.N = Name;
    object.T = Type;
    object.I = Image;
    object.B = Class;
    object.PopoverCallBack = PopoverCallBack;
    object.PopoverhideCallBack = PopoverhideCallBack;
    object.setContent = function () { };
    return object;
}

var ShowProfilePopover = function (object, Id, UId, container, dataobject) {
    var PopoverId = 'Popover_' + UId + '_' + Id;
    if (container == null || container == undefined)
        container = '.MasterParentDiv';
    $(object).popover({
        html: true, trigger: 'click focus',
        placement: 'auto left',
        container: container,
        content: function () {
            var template = $('.SampleProfilePopup').find('.ProfilePopover').clone();
            $(template).find('.widget-head-color-box').addClass(dataobject.B);
            $(template).find('.PopoverHead').html(dataobject.N);
            $(template).find('.PopoverImage').attr('src', dataobject.I);
            $(template).find('.PopoverHeadSmall').html(dataobject.T);
            return template.html();
        }
    }).on('show.bs.popover', function (e) {
        HideAllBootstrapPopovers($(container), object);
        $(this).data("bs.popover").tip().addClass('profile-popover-content');

    }).on('shown.bs.popover', function (e) {
        if (parseFloat($(this).data("bs.popover").tip().css('top')) < 0)
        { $(this).data("bs.popover").tip().css('top', '0px'); }
        if (typeof dataobject.PopoverCallBack !== 'undefined') {
            if (dataobject.PopoverCallBack != undefined && dataobject.PopoverCallBack != null) {
                if (typeof dataobject.PopoverCallBack !== 'undefined' && $.isFunction(dataobject.PopoverCallBack)) {
                    dataobject.PopoverCallBack();
                }
            }
        }
    }).on('hidden.bs.popover', function (e) {
        if (typeof dataobject.PopoverhideCallBack !== 'undefined') {
            if (dataobject.PopoverhideCallBack != undefined && dataobject.PopoverhideCallBack != null) {
                if (typeof dataobject.PopoverhideCallBack !== 'undefined' && $.isFunction(dataobject.PopoverhideCallBack)) {
                    dataobject.PopoverhideCallBack();
                }
            }
        }
    });

}

var CreateCompanyProfilePopover = function (Id, object, container, placement) {
    $(object).addClass('popoverEdit');
    var ProfilePopoveCalled = function () {
        if (!$(object).hasClass('GotData')) {
            $(object).addClass('GotData');
            var data = { Id: Id };
            $.ajax({
                type: "POST",
                url: 'Company.aspx/GetCompanyPopover',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                async: true,
                dataType: "json",
                success: function (response) {
                    hidewaiting($(object).data("bs.popover").tip());
                    if (response.d != undefined) {
                        var message = eval('[' + response.d + ']');
                        if (message[0].Message === "Session Expired") {
                            location.href = "Login.aspx";
                        }
                        else if (message[0].MessageType === "success") {
                            var dataobject = message[0].obj;
                            var popoverheight = $(object).data('bs.popover').tip().height();
                            var pc = $(object).data('bs.popover').tip().hasClass('right') ? 'right' : ($(object).data('bs.popover').tip().hasClass('top') ? 'top' : ($(object).data('bs.popover').tip().hasClass('bottom') ? 'bottom' : 'left'));
                            $(object).data('bs.popover').options.content = function () {
                                var template = $('.SampleProfilePopup').find('.ProfilePopover').clone();
                                var titleclass = "default";
                                if (dataobject.B != null) {
                                    titleclass = dataobject.B.B;
                                    if (dataobject.B.DD) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left primary"><i class="fa fa-trash-o"></i> Company Deleted</div>');
                                    }
                                    if (dataobject.B.PH > 0) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left danger">' + dataobject.B.PH + ' Project(s) OnHold' + '</div>');
                                    }
                                    if (dataobject.B.PPB > 0) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left danger">' + dataobject.B.PPB + " Balance" + '</div>');
                                    }
                                    if (dataobject.B.PCF > 0 && !dataobject.B.DD) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left warning">' + dataobject.B.PCF + " Custom Field(s)" + '</div>');
                                    }
                                    if (dataobject.B.AM && !dataobject.B.DD) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left warning"><i class="fa fa-building"></i> Address Missing</div>');
                                    }
                                    if (dataobject.B.CM && !dataobject.B.DD) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left warning"><i class="fa fa-user"></i> Contact Missing</div>');
                                    }
                                    if (dataobject.B.PB > 0) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left success"><i class="fa fa-briefcase"></i> ' + dataobject.B.PB + ' Project(s) Billed</div>');
                                    }
                                    if (dataobject.B.PP > 0) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left primary"><i class="fa fa-briefcase"></i> ' + dataobject.B.PP + ' Project(s) Pending</div>');
                                    }
                                }
                                switch (titleclass) {
                                    case "danger": titleclass = "red-bg"; break;
                                    case "primary": titleclass = "navy-bg"; break;
                                    case "success": titleclass = "lazur-bg"; break;
                                    case "default": titleclass = ""; break;
                                    case "warning": titleclass = "yellow-bg"; break;
                                }
                                $(template).find('.widget-head-color-box').addClass(titleclass);
                                $(template).find('.PopoverHead').html(dataobject.Name);
                                if (dataobject.Name.length > 15)
                                    $(template).find('.PopoverHead').addClass('smallfont');
                                var image = null;
                                if (dataobject.Is != null) {
                                    if (dataobject.Is[0] != null) {
                                        if (dataobject.Is[0].I != null && dataobject.Is[0].I != '') {
                                            image = dataobject.Is[0].I;
                                        }
                                    }
                                }
                                if (dataobject.Adds.length > 0) {
                                    var titleobj = $('<li class="address"></li>');
                                    var add = dataobject.Adds[0];
                                    if (add != null) {
                                        var address = ((add.L1 != null ? add.L1 + "," : "") + (add.L2 != null ? add.L2 + "," : "") + (add.A != null ? add.A + "," : "") + (add.C != null ? add.C + "," : "") + (add.S != null ? add.S + "," : "") + (add.CR != null ? add.CR + "," : "") + (add.Zip != null ? add.Zip : "") + "<br/>").replace(',,', ',').replace(',,', ',').replace(',,', ',').replace(',,', ',').replace(',,', ',').replace(',,', ',');
                                        $(titleobj).html(address);
                                        $(template).find('.popoverdata2').removeClass('hidden').append(titleobj);
                                    }
                                }
                                $(template).find('.checkbox').checkbox('uncheck');
                                $(template).find('.btn.btn-info').attr('href', 'company.aspx?id=' + Id, '_blank');
                                if (image != null)
                                    $(template).find('.PopoverImage').addClass('img-square').attr('src', GetThumbPath(GetImagePath(image), false));
                                else {
                                    $(template).find('.PopoverImage').addClass('img-square').attr('src', getInitials(dataobject.Name, false));
                                }
                                $(template).find('.PopoverHeadSmall').html('<span title="Industry" class="badge">' + dataobject.Ind + '</span> / <span class="badge" title="Legal Structure">' + dataobject.LS + '</span>');
                                var count = 5;
                                $.each(dataobject.CRUs, function (be, belement) {
                                    if (count >0) {
                                        var titleobj = $('<a target="_blank"><img class="img-circle" /></a>');
                                        var cname = '';
                                        if (belement.User != undefined && belement.User != null) {
                                            var image = null;
                                            if (belement.User.Is != null) {
                                                if (belement.User.Is[0] != null) {
                                                    if (belement.User.Is[0].I != null && belement.User.Is[0].I != '') {
                                                        image = belement.User.Is[0].I;
                                                    }
                                                }
                                            }
                                            cname = belement.User.FN + ' ' + belement.User.MN + ' ' + belement.User.LN;
                                            $(titleobj).attr('href', 'contact.aspx?id=' + belement.User.Id);
                                            if (image != null) {
                                                $(titleobj).attr('title', cname + '\n(' + belement.Ps[0].P + ')').find('img').attr('src', GetThumbPath(GetImagePath(image), true));
                                            }
                                            else {
                                                $(titleobj).attr('title', cname + '\n(' + belement.Ps[0].P + ')').find('img').attr('src', getInitials({ first: belement.User.FN, last: belement.User.LN }, true));
                                            }
                                        }
                                        $(template).find('.divPopoverHead2').append(titleobj);
                                    } count--;
                                });
                                return template.html();
                            };
                            var popover = $(object).data('bs.popover');
                            popover.setContent();
                            popoverobject.setContent(true);
                            $(object).data('bs.popover').tip().find('.btn.btn-danger').click(function () {
                                $(object).popover('hide');
                            });
                            $(object).data('bs.popover').tip().addClass(pc);

                        }
                        else {
                            if (message[0].Message == '')
                                message[0].Message = 'Error Getting logs';
                            $(object).popover('hide');
                            showglobalmessage(message[0].Message, message[0].MessageType);
                        }
                    }
                },
                failure: function (response) {
                    hidewaiting($(object).data("bs.popover").tip());
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    hidewaiting($(object).data("bs.popover").tip());
                }
            });
        }
        else { hidewaiting($(object).data("bs.popover").tip()); popoverobject.setContent(false); };
    }
    var ProfileHidePopoveCalled = function () {

    }
    var popoverobject = CreatePopoverObject("Company", "Other", "primary", DefaultCompanyImage, ProfilePopoveCalled, ProfileHidePopoveCalled);
    ShowAjaxProfilePopover(object, Id, "CompanyRelation", container, popoverobject, placement);
}

var CreateContactProfilePopover = function (Id, object, container, placement) {
    $(object).addClass('popoverEdit');
    var ProfilePopoveCalled = function () {
        if (!$(object).hasClass('GotData')) {
            $(object).addClass('GotData');
            var data = { Id: Id };
            $.ajax({
                type: "POST",
                url: 'Contact.aspx/GetContactPopover',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                async: true,
                dataType: "json",
                success: function (response) {
                    hidewaiting($(object).data("bs.popover").tip());
                    if (response.d != undefined) {
                        var message = eval('[' + response.d + ']');
                        if (message[0].Message === "Session Expired") {
                            location.href = "Login.aspx";
                        }
                        else if (message[0].MessageType === "success") {
                            var dataobject = message[0].obj;

                            var popoverheight = $(object).data('bs.popover').tip().height();
                            var pc = $(object).data('bs.popover').tip().hasClass('right') ? 'right' : ($(object).data('bs.popover').tip().hasClass('top') ? 'top' : ($(object).data('bs.popover').tip().hasClass('bottom') ? 'bottom' : 'left'));
               
                            $(object).data('bs.popover').options.content = function () {
                                var template = $('.SampleProfilePopup').find('.ProfilePopover').clone();
                                $(template).find('.PopoverHead').html(dataobject.FN + ' ' + dataobject.LN).attr('title', dataobject.FN + ' ' + dataobject.MN + ' ' + dataobject.LN);
                                var image = null;
                                if (dataobject.Is != null) {
                                    if (dataobject.Is[0] != null) {
                                        if (dataobject.Is[0].I != null && dataobject.Is[0].I != '') {
                                            image = dataobject.Is[0].I;
                                        }
                                    }
                                }
                                if (image == null)
                                    $(template).find('.PopoverImage').addClass('img-circle').attr('src', getInitials({ first: dataobject.FN, last: dataobject.LN }, false));
                                else
                                    $(template).find('.PopoverImage').addClass('img-circle').attr('src', GetThumbPath(GetImagePath(image), false));
                                $(template).find('.checkbox').checkbox('uncheck');
                                var titleclass = "default";
                                if (dataobject.B != null) {
                                    titleclass = dataobject.B.B;
                                    if (dataobject.B.DD) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left primary"><i class="fa fa-trash-o"></i> Contact Deleted</div>');
                                    }
                                    if (dataobject.B.PH > 0) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left danger">' + dataobject.B.PH + ' Project(s) OnHold' + '</div>');
                                    }
                                    if (dataobject.B.PPB > 0) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left danger">' + dataobject.B.PPB + " Balance" + '</div>');
                                    }
                                    if (dataobject.B.PCF > 0 && !dataobject.B.DD) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left warning">' + dataobject.B.PCF + " Custom Field(s)" + '</div>');
                                    }
                                    if (dataobject.B.AM && !dataobject.B.DD) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left warning"><i class="fa fa-building"></i> Address Missing</div>');
                                    }
                                    if (dataobject.B.CM && !dataobject.B.DD) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left warning"><i class="fa fa-university"></i> Company Missing</div>');
                                    }
                                    if (dataobject.B.EM && !dataobject.B.DD) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left warning"><i class="fa fa-envelope"></i> Email Missing</div>');
                                    }
                                    if (dataobject.B.PM && !dataobject.B.DD) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left warning"><i class="fa fa-phone-square"></i> Phone Missing</div>');
                                    }
                                    if (dataobject.B.PB > 0) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left success"><i class="fa fa-briefcase"></i> ' + dataobject.B.PB + ' Project(s) Billed</div>');
                                    }
                                    if (dataobject.B.PP > 0) {
                                        $(template).find('.popoverdata1').append('<div class="title-element left primary"><i class="fa fa-briefcase"></i> ' + dataobject.B.PP + ' Project(s) Pending</div>');
                                    }
                                }
                                switch (titleclass) {
                                    case "danger": titleclass = "red-bg"; break;
                                    case "primary": titleclass = "navy-bg"; break;
                                    case "success": titleclass = "lazur-bg"; break;
                                    case "default": titleclass = ""; break;
                                    case "warning": titleclass = "yellow-bg"; break;
                                }
                                $(template).find('.widget-head-color-box').addClass(titleclass);

                                if (dataobject.Adds.length > 0) {
                                    var titleobj = $('<li class="li-gray address"></li>');
                                    var add = dataobject.Adds[0];
                                    if (add != null) {
                                        var address = ((add.L1 != null ? add.L1 + "," : "") + (add.L2 != null ? add.L2 + "," : "") + (add.A != null ? add.A + "," : "") + (add.C != null ? add.C + "," : "") + (add.S != null ? add.S + "," : "") + (add.CR != null ? add.CR + "," : "") + (add.Zip != null ? add.Zip : "") + "<br/>").replace(',,', ',').replace(',,', ',').replace(',,', ',').replace(',,', ',').replace(',,', ',').replace(',,', ',');
                                        $(titleobj).html(address);
                                        $(template).find('.popoverdata2').removeClass('hidden').append(titleobj);
                                    }
                                }
                                if (dataobject.PHs.length > 0) {
                                    $.each(dataobject.PHs, function (pe, pelement) {
                                        var titleobj = $('<li class="li-gray phone"></li>');
                                        if (pelement != null) {
                                            $(titleobj).html(pelement.Ph);
                                            $(template).find('.popoverdata2').removeClass('hidden').append(titleobj);
                                        }
                                    });
                                }
                                if (dataobject.Es.length > 0) {
                                    $.each(dataobject.Es, function (pe, pelement) {
                                        var titleobj = $('<li class="li-gray email"></li>');
                                        if (pelement != null) {
                                            $(titleobj).html(pelement.E);
                                            $(template).find('.popoverdata2').removeClass('hidden').append(titleobj);
                                        }
                                    });
                                }
                                $(object).data('bs.popover').tip().find('.btn.btn-danger').click(function () {
                                    $(object).popover('hide');
                                });
                                $(template).find('.btn.btn-info').attr('href', 'contact.aspx?id=' + Id, '_blank');
                                // $(template).find('.PopoverHeadSmall').html('<span title="Industry" class="badge">' + dataobject.Ind + '</span> / <span class="badge" title="Legal Structure">' + dataobject.LS + '</span>');
                                var count = 5;
                                $.each(dataobject.CRUs, function (be, belement) {
                                    if (count > 0) {
                                        var titleobj = $('<a target="_blank"><img class="img-square" /></a>');
                                        var cname = '';
                                        if (belement.CO != undefined && belement.CO != null) {
                                            var image = null;
                                            if (belement.CO.Is != null) {
                                                if (belement.CO.Is[0] != null) {
                                                    if (belement.CO.Is[0].I != null && belement.CO.Is[0].I != '') {
                                                        image = belement.CO.Is[0].I;
                                                    }
                                                }
                                            }
                                            cname = belement.CO.Name;
                                            if (image != null)
                                                $(titleobj).find('img').attr('src', GetThumbPath(GetImagePath(image), true));
                                            else {
                                                $(titleobj).find('img').attr('src', getInitials(cname, true));
                                            }

                                            $(titleobj).attr('href', 'company.aspx?id=' + belement.CO.CRId);
                                            $(titleobj).find('img').attr('title', cname + '\n(' + belement.Ps[0].P + ')');
                                        }
                                        $(template).find('.divPopoverHead2').append(titleobj);
                                    }
                                    count--;
                                });
                                return template.html();
                            };
                            $(object).data('bs.popover').setContent();
                            popoverobject.setContent(true);
                            $(object).data('bs.popover').tip().find('.btn.btn-danger').click(function () {
                                $(object).popover('hide');
                            });
                            $(object).data('bs.popover').tip().addClass(pc);

                        }
                        else {
                            if (message[0].Message == '')
                                message[0].Message = 'Error Getting logs';
                            $(object).popover('hide');
                            showglobalmessage(message[0].Message, message[0].MessageType);
                        }
                    }
                },
                failure: function (response) {
                    hidewaiting($(object).data("bs.popover").tip());
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    hidewaiting($(object).data("bs.popover").tip());
                }
            });
        }
        else { hidewaiting($(object).data("bs.popover").tip()); popoverobject.setContent(false); }
    }
    var ProfileHidePopoveCalled = function () {

    }
    var popoverobject = CreatePopoverObject("Contact", "Other", "primary", DefaultUserImage, ProfilePopoveCalled, ProfileHidePopoveCalled);
    ShowAjaxProfilePopover(object, Id, "Contact", container, popoverobject, placement);
}

var ShowAjaxProfilePopover = function (object, Id, UId, container, popoverobject, placement) {
    var PopoverId = 'Popover_' + UId + '_' + Id;
    if (container == null || container == undefined)
        container = '.MasterParentDiv';
    if (placement == null || placement == undefined)
        placement = 'auto';
    placement = 'auto bottom';
    var dtitle = $(object).attr('title');
    $(object).removeAttr('title');
    $(object).addClass('popoverEdit').popover({
        html: true, trigger: 'manual', animation: false,
        placement: placement, viewport: { selector: '.MasterParentDiv', padding: 10 },
        container: container,
        content: function () {
            var template = $('.SampleProfilePopup').find('.ProfilePopover').clone();
            return template.html();
        }
    }).on('show.bs.popover', function (e) {
        $(object).data('bs.popover').tip().addClass('popin');
        HideAllBootstrapPopovers($(container), $(object));
        $(this).data("bs.popover").tip().addClass('profile-popover-content');
    }).on('shown.bs.popover', function (e) {
        if (parseFloat($(object).data('bs.popover').tip().find('.arrow').css('left')) <= 50) {
            $(object).data('bs.popover').tip().find('.arrow').addClass('custom');
            $(object).data('bs.popover').tip().css('left', 'calc(' + $(object).data('bs.popover').tip().css('left') + ' + 92px)');
        }
        else {
            //var leftmargin = 134;
            //if ($(object).data('bs.popover').tip().find('.arrow').css('left') == '50%') {
            //    $(object).data('bs.popover').tip().find('.arrow').addClass('rightarrow');
            //}
            //else {
            //    $(object).data('bs.popover').tip().find('.arrow').css('left', 'calc(100% - ' + $(object).data('bs.popover').tip().find('.arrow').css('left') + ') !important');
            //}
            //     $(object).data('bs.popover').tip().css('left', 'calc(' + $(object).data('bs.popover').tip().css('left') + ' - ' + leftmargin + 'px)');
        }
        showwaiting($(this).data("bs.popover").tip());
        popoverobject.setContent = function (reset) {
            setTimeout(function () {
                if (reset && $(object).data("bs.popover").tip().hasClass('top')) {
                    $(object).data('bs.popover').tip().css('top', 'calc(' + $(object).data('bs.popover').tip().css('top') + ' - ' + ($(object).data('bs.popover').tip().height() - 105) + 'px)');
                }
            }, 150);
        }
        $(object).attr('data-popoverid', $(object).data('bs.popover').tip().attr('id'));
        $(object).data('bs.popover').tip().find('.btn.btn-danger').click(function () {
            $(object).popover('hide');
        });
        $(object).data('bs.popover').tip().hover(function () {
            $(object).addClass('childhover').addClass('childhover1');
        });
        $(object).data('bs.popover').tip().focusout(function () {
            $(object).popover('hide');
        });
        $(object).data('bs.popover').tip().mouseleave(function () {
            $(object).removeClass('childhover1');
            setTimeout(function () {
                if (!$(object).hasClass('childhover1')) {
                    $(object).popover('hide');
                    $('#' + $(object).attr('data-popoverid')).hide();
                }
            }, 1000);
        });

        if (typeof popoverobject.PopoverCallBack !== 'undefined') {
            if (popoverobject.PopoverCallBack != undefined && popoverobject.PopoverCallBack != null) {
                if (typeof popoverobject.PopoverCallBack !== 'undefined' && $.isFunction(popoverobject.PopoverCallBack)) {
                    popoverobject.PopoverCallBack();
                }
            }
        }
    }).on('hidden.bs.popover', function (e) {
        $(object).data('bs.popover').tip().removeClass('popin');
    }).on('hidden.bs.popover', function (e) {
        onchildhover = false;
        if (typeof popoverobject.PopoverhideCallBack !== 'undefined') {
            if (popoverobject.PopoverhideCallBack != undefined && popoverobject.PopoverhideCallBack != null) {
                if (typeof popoverobject.PopoverhideCallBack !== 'undefined' && $.isFunction(popoverobject.PopoverhideCallBack)) {
                    popoverobject.PopoverhideCallBack();
                }
            }
        }
    });
    $(object).attr('title', dtitle);
    var hoverTimeout;
    $(object).hover(function () {
        hoverTimeout = setTimeout(function () {
            if (!$(object).data('bs.popover').tip().hasClass('popin')) {
                $(object).popover('show');
            }
        }, 1000);
    }, function () {
        clearTimeout(hoverTimeout);
        setTimeout(function () {
            if (!$(object).hasClass('childhover')) {
                $(object).popover('hide');
                $('#' + $(object).attr('data-popoverid')).hide();
            }
        }, 1000);
    });
}

var GetProjectVisibility = function (VP, VPobj) {
    if (VP == null || VP == undefined)
        VP = "0";
    switch (VP) {
        default: $(VPobj).html('No Projects'); break;
        case "1": $(VPobj).attr('title', '1 Previous Project').html('1 Project'); break;
        case "2": $(VPobj).attr('title', '2 Previous Projects').html('2 Projects'); break;
        case "3": $(VPobj).attr('title', '3 Previous Projects').html('3 Projects'); break;
        case "4": $(VPobj).attr('title', '4 Previous Projects').html('4 Projects'); break;
        case "5": $(VPobj).attr('title', '5 Previous Projects').html('5 Projects'); break;
        case "6": $(VPobj).attr('title', '6 Previous Projects').html('6 Projects'); break;
        case "7": $(VPobj).attr('title', '7 Previous Projects').html('7 Projects'); break;
        case "8": $(VPobj).attr('title', '8 Previous Projects').html('8 Projects'); break;
        case "9": $(VPobj).attr('title', '9 Previous Projects').html('9 Projects'); break;
        case "10": $(VPobj).attr('title', '10 Previous Projects').html('10 Projects'); break;
        case "11": $(VPobj).attr('title', '11 Previous Projects').html('11 Projects'); break;
        case "12": $(VPobj).attr('title', '12 Previous Projects').html('12 Projects'); break;
        case "13": $(VPobj).attr('title', '13 Previous Projects').html('13 Projects'); break;
        case "14": $(VPobj).attr('title', '14 Previous Projects').html('14 Projects'); break;
        case "15": $(VPobj).attr('title', '15 Previous Projects').html('15 Projects'); break;
        case "16": $(VPobj).attr('title', '16 Previous Projects').html('16 Projects'); break;
        case "17": $(VPobj).attr('title', '17 Previous Projects').html('17 Projects'); break;
        case "18": $(VPobj).attr('title', '18 Previous Projects').html('18 Projects'); break;
        case "19": $(VPobj).attr('title', '19 Previous Projects').html('19 Projects'); break;
        case "20": $(VPobj).attr('title', '20 Previous Projects').html('20 Projects'); break;
        case "21": $(VPobj).attr('title', '21 Previous Projects').html('21 Projects'); break;
        case "22": $(VPobj).attr('title', '22 Previous Projects').html('22 Projects'); break;
        case "23": $(VPobj).attr('title', '23 Previous Projects').html('23 Projects'); break;
        case "24": $(VPobj).attr('title', '24 Previous Projects').html('24 Projects'); break;
        case "1M": $(VPobj).attr('title', 'Last 1 Month Projects').html('1 Month'); break;
        case "2M": $(VPobj).attr('title', 'Last 2 Month Projects').html('2 Months'); break;
        case "3M": $(VPobj).attr('title', 'Last 3 Month Projects').html('3 Months'); break;
        case "4M": $(VPobj).attr('title', 'Last 4 Month Projects').html('4 Months'); break;
        case "5M": $(VPobj).attr('title', 'Last 5 Month Projects').html('5 Months'); break;
        case "6M": $(VPobj).attr('title', 'Last 6 Month Projects').html('6 Months'); break;
        case "7M": $(VPobj).attr('title', 'Last 7 Month Projects').html('7 Months'); break;
        case "8M": $(VPobj).attr('title', 'Last 8 Month Projects').html('8 Months'); break;
        case "9M": $(VPobj).attr('title', 'Last 9 Month Projects').html('9 Months'); break;
        case "10M": $(VPobj).attr('title', 'Last 10 Month Projects').html('10 Months'); break;
        case "11M": $(VPobj).attr('title', 'Last 11 Month Projects').html('11 Months'); break;
        case "12M": $(VPobj).attr('title', 'Last 12 Month Projects').html('12 Months'); break;
    }
}

function goToByScroll1(id, extra) {
    if (!(extra > 0)) extra = 0;

    id = id.replace("link", "");
    // Scroll
    console.log($("#" + id).offset().top);
    $('html,body').animate({
        scrollTop: $("#" + id).offset().top + extra - 50
    },
        'slow');
    if ($("#" + id).offset() != undefined) {
        $('.MasterParentDiv').animate({
            scrollTop: $("#" + id).offset().top + extra - 50
        },
            'slow');
    }
    else {
        setTimeout(function () {
            if ($("#" + id).offset() != undefined) {
                if ($("#" + id).offset().top > 50) {
                    $('.MasterParentDiv').animate({
                        scrollTop: $("#" + id).offset().top + extra -50
                    },
                        'slow');
                }
            }
        }, 2000);
    }
    
}
