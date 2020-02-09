(function(win) {
    var appElement = document.querySelector("#app");
    var OutlookMutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var bodyObserver = new OutlookMutationObserver(check);
    bodyObserver.observe(win.document.body, {
        childList: true,
        subtree: true
    });

    function check() {
        var portalElement = document.querySelector('[data-portal-element="true"]');
        if (portalElement) {
            var portalElementObs = new OutlookMutationObserver(notifyReminder);
            portalElementObs.observe(portalElement, {
                childList: true,
                subtree: true

            });
            bodyObserver.disconnect();
        }
    }

    function notifyReminder(mutations) {
        Notification.requestPermission();
        var breakNotification = false;
        mutations.forEach(function(mutation) {
            var reminderButton = mutation.target.querySelector('[data-storybook]');
            if (!reminderButton || breakNotification === true) {
                return;
            }
            if (window.Notification) {
              var reminderParts = reminderButton.innerText.split("\n");
              var subject = reminderParts[0];
                var notification = new Notification(subject, {
                    type: 'basic',
                    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEfklEQVRoge2YW2xURRjHf3PO2e6tu9ttt90ChSIFShOFtoGgGC/4RBVD8AWMMb6pQWM0MWKQ8KDwYkQT44uSyIO3aOLlyRJf1BCREBIjyM3GykVol+122fa0u3TPnvGhtKXdyznt2VpM9vc43zfffP85c2bmG6hQoUKFhUQ4DRDY8uHrpmCvAH85EipCSgj5yvD3zx+eaXAmoOt9dzVuHdAcxbFHTO9+rnFmo6OBQ4rmk4qrr5SPAKTXbRlL9XssPMybhVodCQjXL5KGFEtLDqsqw8baloBFqMHGB9bUWvhkknkLCBSLTnc8FQELzf9eQP5P3HXwZST7sbGvX+zvLWoTQhCqrsMXCDtK0Ir8L2AzeSuklKT0hNMwlhTaRst2okopkQbXhCF9pfwUoQ6bhhgpGQtZ/nPADjeGzMXR65Q8ByS5wWRcWJwDIlOoddYC6oIeWptqyeUkf1waYCSTnW2IsmJbQDTs44Ndj7B90ypUZfwKlR4zONR9mt0fHyUzZsxbkqWwJSDoq+Lnt3fQ2hQmnkpz5OTf+NwuujbcxUvbOli9JMxj+77FlHK+883DloA9OzfS2hSmtz/Fg69+ydWEDkBHSwNH39nBlvXL2flwK5//eH5eky2ErYPsqc1rANj/xfHJ5AF+++s6H3WfuuXTNg/pWWMpIOR30xQZ30SOnb2WZz92dvw2fXdzpMypzcAw3I0t+7pmNlsuoYkfFiBrmHn2bC437qcWqY1MJQO4Sg4iRAY5vs9L09SEKdU8H8MQWsj/HTCtuLAUkNQzDAyliQS9dKxsoLc/Nc3euTIKQM/VZMH+VelBt56qL1mtSKTH+KmnZNXj8is07H26iid2T2u3XEJSwje/9ACwZ8dG/J6pyVxSV82uresA+PqWT7kRLoWa9giLtrWgrViUZ7e1C7352XG2b1pF58oGfn3vSQ7/cAavW+OFreuIBL383hvnUPfpMmcO/hVBwh0RVG/xNG0JuJrQ2bz7Kz597VHaV9Tz7rMPTdqOnLzIMwePcDObc570LTyNPmrX1+MKW9fStk/iM5cSdL74CRtWN9K2tJacKTnZE+P8lUFHyd6OK1hFTXsdvmarEnqKWd2FpIQTF/o5caHfdh/hcVk+3Sgelwh3Rgi0hRHK7F565v02qj5+XzV9I9A3Mj4DtyEUgXdNPYF7l9ao7tI7bTEKCdCB6jlFm4HQNHBpQi4LQdSP+GcYBkZBgmd5mND9zahBDzh4YCsk4A3gAA5FCE3Dt/aeqQa3hmwJozQH4zXL6kxvNBB1En9ynLl2rDt82dHV01vjI7gkhFY1u1V8ql1My/m/eNMsSPrGKJmhNP76AMFoEFHsKmLBgj6rSFOix4aInetjNKEzl096R7wL5bI5kpeTxC/EGNML1u5FuSMETJAdHSPec51E7wC5m/ZK1AX7B0qRSaWJDWXw1voJLg6hasXnee5fQKBbO80dKSWjCZ34uT5GBvSJM3B4pt+cBaiK+pZQRH6FU2ZyhsmNK0nif8Zy2bRxYL7Hq1ChQoXZ8S+QOlIdCqNTRAAAAABJRU5ErkJggg==',
                    title: subject,
                    body: reminderParts[2] + " - " + reminderParts[1]
                });
                setTimeout(notification.close.bind(notification), 45000);
                notification.onclick = function() {
                    reminderButton.click();
                    this.close();
                };
            }
            breakNotification = true;
        });


        // var reminder = document.querySelector('[data-portal-element="true"] button[data-storybook="reminder"]');
        // if (reminder) {
        //     console.log(reminder);
        //     if (window.Notification) {
        //         var notification = new Notification('Outlook.com', {
        //             type: 'basic',
        //             icon: 'data:image/png;base64,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',
        //             body: 'Remninder: ' + reminder.innerText
        //         });
        //         notification.onclick = function() {
        //             reminder.click();
        //             this.close();
        //         };
        //     }
        // }
    }
})(this);