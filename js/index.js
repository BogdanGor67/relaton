const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    monthMin = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
    days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    daysMin = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], seasons = ["зима", "весна", "лето", "осень"];

function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {
    const _counterLength = 60;
    for (let counter = 0; counter < _counterLength; counter++) {
        innerDate(counter, 'date-');
        innerDate(counter, 'date')
    }

    function innerDate(counter, dateType) {
        let newCounter;
        dateType === 'date-' ? newCounter = -counter : newCounter = counter;
        const _msInDay = 86400000, _localDate = new Date(Date.now() + (newCounter * _msInDay)),
            _day = _localDate.getDate(), _month = _localDate.getMonth() + 1, _year = _localDate.getFullYear();
        const dayDefault = addZero(_day), monthDefault = addZero(_month),
            defaultDate = dayDefault + '.' + monthDefault + '.' + _year;
        const dateClass = dateType + counter, nodeList = document.querySelectorAll('.' + dateClass);
        for (let i = 0; i < nodeList.length; i++) {
            const dateFormat = nodeList[i].dataset.format;
            dateFormat !== undefined && dateFormat !== '' ? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)) : nodeList[i].innerHTML = defaultDate
        }
    }

    function changeFormat(_day, _month, _year, format, counter) {
        let innerFormat = format;
        const testFormat = ["dd", "mm", "yyyy", "monthFull", "year"], dateFormat = {
            dd: _day,
            mm: addZero(_month),
            yyyy: _year,
            monthFull: getMonthName(_month, monthsName, false),
            year: getYearWithCounter(_year, counter),
        };
        for (let i = 0; i < testFormat.length; i++) {
            let string = testFormat[i];
            let regExp = new RegExp(string);
            innerFormat = innerFormat.replace(regExp, dateFormat[string]);
        }
        return innerFormat.split(' ').join(' ')
    }

    function getMonthName(_month, monthsName, bigFirstLetter, counter) {
        const monthCounter = !!counter ? counter : 0;
        let month;
        _month + monthCounter > 12 ? month = monthCounter - (12 - _month) : month = _month + monthCounter;
        _month + monthCounter <= 0 ? month = 12 + monthCounter + 1 : month = _month + monthCounter;
        return changeFirstLetter(bigFirstLetter, monthsName[month - 1])
    }

    function getYearWithCounter(year, counter) {
        return year + counter
    }

    function addZero(numb) {
        return numb < 10 ? '0' + numb : numb
    }

    function changeFirstLetter(isBig, str) {
        return isBig && str && str.length > 0 ? str[0].toUpperCase() + str.slice(1) : str
    }
}

if (document.body.classList.contains('ev-date')) {
    document.addEventListener("DOMContentLoaded", function () {
        postDate(days, daysMin, months, monthMin, seasons)
    });
}

function main() {
    function e() {
        u -= 1;
        var e = Math.floor(u / 60),
            t = u - 60 * e;
        0 == e && 0 == t && clearInterval(n), t = t >= 10 ? t : "0" + t, $("#min").html("0" + e), $("#sec").html(t)
    }

    var t = document.querySelector(".spin-result-wrapper");
    $(function () {
        $("a[href^='#']").click(function () {
            var e = $(this).attr("href");
            return $("html, body").animate({
                scrollTop: $(e).offset().top + "px"
            }), !1
        })
    });
    var n, o, i, u = 600;
    o = this, i = function (e, t, n) {
        return function (e, t) {
            var n = (t = $.extend({}, t)).aggressive || !1,
                o = p(t.sensitivity, 20),
                i = p(t.timer, 1e3),
                u = p(t.delay, 0),
                c = p(t.oneEvent, !0),
                r = t.callback || function () {
                },
                l = v(t.cookieExpire) || "",
                a = t.cookieDomain ? ";domain=" + t.cookieDomain : "",
                d = t.cookieName ? t.cookieName : "viewedOuibounceModal",
                s = !0 === t.sitewide ? ";path=/" : "",
                m = null,
                f = document.documentElement;

            function p(e, t) {
                return void 0 === e ? t : e
            }

            function v(e) {
                var t = 24 * e * 60 * 60 * 1e3,
                    n = new Date;
                return n.setTime(n.getTime() + t), "; expires=" + n.toUTCString()
            }

            function y(e) {
                e.clientY > o || g(d, "true") && !n || (m = setTimeout(E, u))
            }

            function k(e) {
                m && (clearTimeout(m), m = null)
            }

            setTimeout(function () {
                f.addEventListener("mouseleave", y), f.addEventListener("mouseenter", k), f.addEventListener("keydown", b)
            }, i);
            var h = !1;

            function b(e) {
                h || g(d, "true") && !n || e.metaKey && 76 === e.keyCode && (h = !0, m = setTimeout(E, u))
            }

            function g(e, t) {
                return function () {
                    for (var e = document.cookie.split("; "), t = {}, n = e.length - 1; n >= 0; n--) {
                        var o = e[n].split("=");
                        t[o[0]] = o[1]
                    }
                    return t
                }()[e] === t
            }

            function E() {
                w(), r()
            }

            function w() {
                e && (e.style.display = "block"), T()
            }

            function T(e) {
                void 0 !== (e = e || {}).cookieExpire && (l = v(e.cookieExpire)), !0 === e.sitewide && (s = ";path=/"), void 0 !== e.cookieDomain && (a = ";domain=" + e.cookieDomain), void 0 !== e.cookieName && (d = e.cookieName), document.cookie = d + "=true" + l + a + s, c && (f.removeEventListener("mouseleave", y), f.removeEventListener("mouseenter", k), f.removeEventListener("keydown", b))
            }

            return {
                fire: w,
                disable: T
            }
        }
    }, "function" == typeof define && define.amd ? define(i) : "object" == typeof exports ? module.exports = i(require, exports, module) : o.ouibounce = i();
    ouibounce(document.getElementById("ouibounce-modal"), {
        aggressive: !0,
        timer: 0,
        oneEvent: !0,
        sensitivity: 100
    });
    $(".qqq").on("click", function () {
        document.getElementById("square").style.display = "none", document.getElementById("square2").style.display = "block", setTimeout(function () {
            t.style.display = "block"
        }, 1e3), setTimeout(function () {
            $(".bilet").slideUp(), $(".order_block").slideDown(), n = setInterval(e, 1e3)
        }, 3500)
    }), $(".underlay").on("click", function () {
        $("#ouibounce-modal").hide()
    }), $(".close-over").on("click", function () {
        $("#ouibounce-modal").hide()
    }), $("#ouibounce-modal .modal-footer a").on("click", function () {
        $("#ouibounce-modal").hide()
    }), $("#ouibounce-modal .modal").on("click", function (e) {
        e.stopPropagation()
    }), t = document.querySelector(".spin-result-wrapper"), $(".close-popup, .pop-up-button").on("click", function (e) {
        e.preventDefault(), $(".spin-result-wrapper").fadeOut()
    });

}

document.documentElement.clientWidth < 480 ? window.addEventListener("scroll", function () {
    return setTimeout(main, 1e3)
}, {
    once: !0,
    passive: !0
}) : main();

function showMonth() {
    var firstMonth = document.getElementById("first");
    d = new Date();
    p = new Date(d.getTime() + 15 * 86400000);
    monthA = 'январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь'.split(',');
    firstMonth.innerHTML = monthA[p.getMonth()];
}

document.addEventListener('DOMContentLoaded', showMonth);