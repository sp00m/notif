# Fading Notifications

## Description

Fading notifications in JavaScript.

## How-to

Include boogiedev-notif-1.0.js (or the minified version). Then:

    // display an error message:
    Boo.Notif.error("Error message");
    
    // display a warning message:
    Boo.Notif.warning("Warning message");
    
    // display an info message:
    Boo.Notif.info("Info message");
    
    // display a success message:
    Boo.Notif.success("Success message");

You can also pass the message type as argument:

    // display a success message:
    Boo.Notif.display("success", "Success message");

You can parameterize the notifications timeouts:

    // duration of the notification box fade in animation (milliseconds):
    Boo.Notif.fadeInDuration = 200; // defaulted to 0.2s
    
    // duration of the notification box fade out animation (milliseconds):
    Boo.Notif.fadeOutDuration = 2000; // defaulted to 2s
    
    // duration the notification box will be displayed (milliseconds):
    Boo.Notif.delayDuration = 5000; // defaulted to 5s