/*
 * Copyright (c) boogiedev.com, all rights reserved.
 * This code is licensed under the LGPL 3.0 license,
 * available at the root application directory.
 */

(function(pub, $) {

    "use strict";
    
    /*
     * PRIVATE MEMBERS
     */
    
    var
    
    /** Notifications styles (backgrounds, borders and colors), depending on the message type (error, warning, info or success). */
    styles = {
        _base: {
            position:   "fixed",
            bottom:     "16px",
            right:      "16px",
            padding:    "8px 8px 8px 48px",
            display:    "none",
            zIndex:     "10000",
            boxShadow:  "1px 1px 12px #555"
        },
        error: {
            background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAABQVJREFUWIXFl11sVEUUx/9n5u5uP7fQUgq6GECBAprQpi3xC1vlgSUla/tijBCjxPiAMWiiBJ9MSNQHEyR+JD6oYMRoTBtNsFQliImJH1iKqQKWlmDVfrG7lHZb7u6dmeND27W7vftRjeEkJ7m5M+f8fzNzZs9dYmbcSBM3VB2AlWngV29JaUHtypdJikoVjb269vyl0wtN3t+w8UXh82xUMfvomu4Ln7rNIbcj6LkpUFa8fvkJY3QdDIM8MuGEx7dVn+39Ol/xvi2b2smyWlgpCK8H2nZ2r/n27Ls5AbpWrCjzr19+Qo3F6uKjVwFmWP5i+KoWJ5xoLLjhzIWTucR7m2rbjaNa4oNhsDYQBT4UBiphFO9e901XCkQKwNma6rLCJf6vEmOx+nh4DMKSAADWBrLIh8Kq8kQiGgve0e0OQSCcb6xp145qsYcigBAgAtgwSAoUBZaCQTvXnzx9dDYmpQhlSeFj16/G6ievjEFLCYcBhwElBOzJOCaGo15ZXtJxpmbd/W4AvzTWtCUSqmViMAIlBBRm4ongKI2Jv65AJRKHuptqpStA7MrY1GR0HMaS0ECKGykQn4pjYjjq85b7O36qqU5CEAg9jbXtTkK1TgxFYKSYF6+FmIYYjk7pcZtdAXRJ6REjRacC4OZaCthTNsaHIz5veWnH97Xr7gWA7saatoSjWq4NhaElucYqAIpIG8t6oq7rnEnCpxdh5+YN0hedOMaGt7ltMwhgZeAp8sG/rGIMwM+OHb9vfDAMktI1ZCZOkxChpt6Bz1Neu13D45sbpCcydIw5AwSmC9NbXIACfzGuDUUghAAoo7wmIUNbL/7+efqAKwAAfHZPvfQODx9DNgjDYGOStyWjuJShbb3zxbMCAEDb3XXSOzKSFSKHaZIy1JxBPCcAAHzcUCO9kfC/gdAkRejBiwMZxYE8mtFDP3braPMjQU3UnrG653vMSPlALvG8AABg96FXoAhxDUaebhLEU/nkznkEAPDBrYF2MLcs5MuBgDiEDO7sG8jawHICHFkdaGPm1gVoz7U4SRl8NAtEVoB3Vi985fMEpiG2P9434N7AMgG8/d9WnipC08fxpMtOuAK8sSrQhnzECZNEdI4N1+cxN05CBvf0p0Kk3IL376qzDq0KtGk2rdmqXIGhAG2EbN1z6c8GTdSpct0MZp/S+vjrt92yJSNAZHR0l2LTmuuea0CzFKGn+we+BABeuniHIcrYRf9x9jlaH36tenVSNwXAYS53ciaBNlKGnun/I/kjs/eHHmUvW9asiTpzxTvMi+K2nWxbKQBUUHjYCNnjMKDS3GFAgYwRMvTcHPFZe+G7Lm1XVDYbUKdbvJqOB3u8z++7PKiTmulF+NaddRWRkZFTrPXtc0cIUB7L2rG/f6AzXTzdDqy8uYOZgynxRPB4fU/t7730ZsqimRkW0YwGhGLWL9VtqrQj4VPEZgMYAJEeN/zwwYHBTyyispm56d2fAUADiU3Lq8x2j+iwiJrADBDBWJ5nD/RdPkhEUgIGACvmJEABgAoApQB8Goiv9ZcGtvqL91nAot/sxIdfhKMnJLBkzrG5AgBgDVwvsCy5q6pibxHRyhFtjn80NPoegGIJOAAmAEQUsz0LYAEoAuAD4AHg0dPfknEAEoBHTsPNCtOc5xTxuTsxI8QADAFFYqYOZ/JOKWaVVzMCMHtM6ZYOkDSVZ968Af4vu+H/jv8GDbPyAFEbLDQAAAAASUVORK5CYII=) 8px center no-repeat, linear-gradient(to bottom, #FFBABA, #ff8989)",
            border:     "outset 1px #FFBABA",
            color:      "#D8000C"
        },
        warning: {
            background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAABQhJREFUWIXFl2uIVVUUx39rn9d9OKOOM4qVST6w+tSDPmSBRCVpEUJfiiAI+lIUoRQ9qIwkgyCIIgg0+hBRVETQAzWCqOhhQQ9GpYxsJgoZHfTOde7jnLP36sM5M3Pnes+M1gc3LC77nv1f67//6+y19hFV5VwOc06jA/7ZApp75QIJuQo/WIcEq0EDlFFs8w9N2F++UQ+ejT850xQ098kmifrvl3D59XjVKOPuptwACq6JJmM/anzsdW2zq7JZW/+bQOMTuUii0sumsvpmzAI0rUFyHHWnQOMsMD6YCuIPIMESEIc2R37T5viD5U265z8TaHwk10ll8D2prBrQ9hjaGgFVEMksdaAgIaga0Kn5EFK+CJJjuMkjj1c26XNnTWDyA9lg+pZ9KuULAjdxEGwTzMwrozbFW7Ie8ZeS/PUZpnQKxM8U0RQQZMEloAmufnh79RZ95owJnHpfVpjKwLBUVvS72oHMqXjZL6BJQrjuUcJLs421Dn5F84sbiVYmqO04WC7B9K0F18bVR++obtG3u2P1PoZeebdEy/rtyV8zVZ2HWlAraOoQr0Kwetv08tKl16JyGa5lszVTpiH25O8gFQgHXp1411s6L4H6O2ajhAMbXWMckgSsB1Y6DKCcK9IhZWkQbdO1VkAD7MQo4i9aaEzw5PwKeNWHUA83eQLVYPaOrKDW4JI2mk7Oxtl2plaP9dqO0bgFft/dtTfDgUICtTfC5SLRBm01Zhy4bjNo3ELj2jROU4c2j4P0Wi+o+rhmHdSvipjNxQqIv16thK7dBtctfW7OoEkKHQpo3ETTCVBTjIlTNLVAcH1nyNmlWM0lmlo0dT2zk7NEE9D2xAysWUOTOqo+OOkNU4U4BWfWFhNwwXKNU+arzpqCax2fgTVOZu+ENagrQmXKCQwVElArYRZ9niaZgrbrMwRaNdA2aiNwc2EV7To+XQTcUbRAws51KWjr5My8eQJcitryTH/qOQTEnCgkgDVHzqw7CsnR7ynls3jkO/AAK3OkIEcKo4UElPAb7LwdFLw+4sMfM/n5VpB+4kMv4fX1ocl86ikq3led/8xKWGXdQ4fUyvDpxaTLEgeU0LgBroFUB3GtJKsRc2KNQvThLEW6JR9/ceg+dekr2SWjYBfxJP1b3iK6+DYA0mMjnNh1DRJN5B2xNw4xewe3jt9UqAAA0XmvYc2fPQuKFUgcprSUcM3N0xB/aCXe0JVos9UbM90Xoie6w51GYMm9P7dVg3sKZVQfWx8nGflyGuPq46Rjw2DKBdKDOu+FwW3//NAdr/BCcmzn0GOqurNnKmyMlBZSufoBJFpM49td2PFhJKpMXRk6hiJi9gXJmpsWbf/6tKdzXsnGdizdjurTpz0QQW2Sl2NFggoSVOl5BkX2SfX8W4e2/djuFWPeS+n4juW3W2tfAoYU6bHDbo8guU/jmecHnzr6yJzLuwn4IrkbxAKq6g48fOF5C8P40cDonb4woHkkVUXJ76g5yCrWquxx4j17/o6/v8l9GjLqmnbFE1XFFwmBhUAVCIGArEgZwLMQA5M3rCmvvuvy8oZVA+aK/khWRL5ZbAQvtlqbjHVstOZ+2XM4/nL3/vpP+S6qJivODkiBhNwXUEtV4yICfm5eTsIAxmYOGvlmQyN+OfKRZuJa4NpkF7YIKOUdx+bBbU4g7UmgIAXTqegwplKTj85Po6k2N+VQu4zCFJzLcc6/jv8FNTz8JSkDuH0AAAAASUVORK5CYII=) 8px center no-repeat, linear-gradient(to bottom, #FEEFB3, #ffe57f)",
            border:     "outset 1px #FEEFB3",
            color:      "#9F6000"
        },
        info: {
            background: "url(data:image/png;base64,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) 8px center no-repeat, linear-gradient(to bottom, #BDE5F8, #83d2f7)",
            border:     "outset 1px #BDE5F8", 
            color:      "#00529B"
        },
        success: {
            background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAABDBJREFUWIXdl2toHFUUx//n3tnd7MZuQmiCTSJqrLWuqKGQWiW2USGFFBKtMVW/+IAWjE2p1SqoqOAX/VCrTalEbX1B2igRWgW/iC2ipM07FmJtjU2QQpI1SbPZ18zchx+ySfeZhyQWO3CY3Z175ve795zZy5DWGlfzYFeVfs0LHGyj3KZ2Y/1cY2i5euBI963lDl7SwshRqLT5S8Tq3b2jzN/5nwh81rPBxymvLSqHvEKNwcmL4eSrtFSX3x0J/PzWK5u0uWwCn3T5rnfwmzrD9vkiIcfByAmlTXC2Am7HbZA68HXHX+11TTXT3CXtgddOEnFe0hqyhopMMQkNN6Rm0PDAVhYC0V8RsYerbi9YyWdyjKUUuCVny/tRe+S+qO0HsSxIpQHQFRQRSFPD7nv9cskFDndXP2bL4K6gdQmELEAhDg4QCIwcDbs2/PFpfN6S9MDHXVWFUqvfAtHfvRoKlKayBPbG3vKBt5N/z7gC77WVVWc7VtXbKnx25/of9s4lILXxxZR50SuUAlHqLRmxL18uv5ACBzI04YEzlY+7HcXHoyK0GXC9dKijuiUTvKnz0Z1he/yhiJiCghNSs4RQmneHdc4zmfJTStDYXvUEI2fzePg8bBUCgZDrXg0X935VX/bNtvixH3bV3miJYP9EZMDDKN1cKGiQ685XN/YNZhJIyDpw5pGNgKvZH7wASwoAHmi4MRYaRMSeqmts35qwEkKKI5PREY9UBKFYSmjt2D4XPEVgMjJ6/0hgAFFbQEoDQhCEIEjlxOjUIMJWsO6D01uPTcvWbp+KTjwYMkMJY2dzBD/6ZsXZY3PBgaQSvPj9mhKCcZpA+ekGS21jZfbNyHbl9UXtwFp/8E9X2o4nGmXkXvPO5o7JRQkAwAvf3eXTWp0CkFZCaYm87CKEzAlYMpL2kePMqN23pbd1PnhaAQBoOH63T2l1EkBBSgIAqQWIOBgIydlE7NuDNX3VC4EDGR7Dxpq+fimNB4Qgv5CE+LAlQSkHpGSwk64JyUJQWc8tFA7M80/4bEupT6nM5Ug+OOPPH97Wc2jJBADgyc9LfWqOnpi9Eaj96NN99ywGDixgO25+qrffsliFacJvmoBlpYZpQQvbsWOxcGARm9HDH61ba1viJxDyMbPLxlI5Y/tP1Pfu+TcCaTcjgwgxxExAaH2ucn/pJqXVKTAUQE1fIdAlaTtfJyKDX9GKn9XMdy3STJa01jCInAC8ADwAnAAcMTkGgMfOJIGJGyoK1hVX5O9jWbwYQltjPYE951qHfuRATjwsFgqAjJ0FABuABSAMICC0tuIFcgFkA3DF4EYcnM+shgRCnhVZ3sLKgjuCF8PDw91/D3HguhgkfvY6Di5jAgKACSAE4PKswDzLn1AKApgApNbaJiLGp4XjocmfEyK5DMv2XrDQ49p+NftfCPwDIKskFDb/Fv8AAAAASUVORK5CYII=) 8px center no-repeat, linear-gradient(to bottom, #DFF2BF, #c1ed76)",
            border:     "outset 1px #DFF2BF",
            color:      "#4F8A10"
        }
    }
    
    /** Notification box, appended to the body. */
    ,$container = $("<div />")
        .css(styles._base)
        .appendTo("body")
        
        /**
         * On mouse enter, stops any currently running animation and displays the notification box.
         */
        .off("mouseenter").on("mouseenter", function() {
            stop(show);
        })
        
        /**
         * On mouse leave, fades the notification box out.
         */
        .off("mouseleave").on("mouseleave", function() {
            fadeOut();
        })
    
    /** Notifications timeout id. */
    ,timeout
    
    /**
     * Clears the timeout and stops any currently running animation on the notification box.
     *
     * @param callback
     *          Will be executed on complete if defined.
     */
    ,stop = function(callback) {
        clearTimeout(timeout);
        $container.stop();
        if (callback) {
            callback();
        }
    }
    
    /**
     * Displays the notification box, without any animation.
     */
    ,show = function() {
        $container.css({display: "block", opacity: 1});
    }
    
    /**
     * Hides the notification box, without any animation.
     */
    ,hide = function() {
        $container.css({display: "none", opacity: 1});
    }
    
    /**
     * Fades the notification box in. The animation begins immediately, and its duration is parameterizable via Boo.Notif.fadeInDuration (milliseconds).
     *
     * @param callback
     *          Will be executed on complete if defined.
     */
    ,fadeIn = function(callback) {
        $container.fadeIn({duration: pub.fadeInDuration, queue: false, complete: callback});
    }
    
    /**
     * Fades the notification box out. The animation begins immediately, and its duration is parameterizable via Boo.Notif.fadeOutDuration (milliseconds).
     *
     * @param callback
     *          Will be executed on complete if defined.
     */
    ,fadeOut = function(callback) {
        $container.fadeOut({duration: pub.fadeOutDuration, queue: false, complete: callback});
    }
    
    /**
     * Delays a callback. The delay duration is parameterizable via Boo.Notif.delayDuration (milliseconds).
     *
     * @param callback
     *          Will be executed after Boo.Notif.delayDuration milliseconds.
     */
    ,delay = function(callback) {
        timeout = setTimeout(callback, pub.delayDuration);
    }
    
    /*
     * PUBLIC MEMBERS
     */
    
    $.extend(pub, {
    
        /** The duration of the notification box fade in animation (milliseconds). */
        fadeInDuration: 200
        
        /** The duration of the notification box fade out animation (milliseconds). */
        ,fadeOutDuration: 2000
        
        /** The duration the notification box will be displayed (milliseconds). */
        ,delayDuration: 5000
    
        /**
         * Displays an error notification.
         *
         * @param message
         *          The error message to display (either a string or a promise).
         */
        ,error: function(message) {
            this.display("error", message);
        }
    
        /**
         * Displays a warning notification.
         *
         * @param message
         *          The warning message to display (either a string or a promise).
         */
        ,warning: function(message) {
            this.display("warning", message);
        }
    
        /**
         * Displays an info notification.
         *
         * @param message
         *          The info message to display (either a string or a promise).
         */
        ,info: function(message) {
            this.display("info", message);
        }
    
        /**
         * Displays a success notification.
         *
         * @param message
         *          The success message to display (either a string or a promise).
         */
        ,success: function(message) {
            this.display("success", message);
        }
    
        /**
         * Displays a notification.
         *
         * @param type
         *          The type of notification: error, warning, info or success.
         * @param message
         *          The message to display (either a string or a promise).
         */
        ,display: function(type, message) {
            if (typeof message.then === "function") {
                // message is a promise, wait for deferred message
                message.then(function(deferredMessage) {
                    this.display(type, deferredMessage);
                });
            } else if (["error", "warning", "info", "success"].indexOf(type) >= 0) {
                // stop any currently running animation on the notification box and hide it
                stop(hide);
                // set notification box style
                $container.css(styles[type]).html(message);
                // fade in, delay, fade out
                fadeIn(function() {
                    delay(fadeOut);
                });
            } else {
            	throw "type '" + type + "' not managed";
            }
        }
    
    });
    
}((window.Boo = window.Boo || {}).Notif = Boo.Notif || {}, jQuery));
