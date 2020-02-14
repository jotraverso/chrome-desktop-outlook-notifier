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
            var reminderButton = mutation.target.querySelector('[data-storybook="reminder"]');
            if (!reminderButton || breakNotification === true) {
                return;
            }
            if (window.Notification) {
                var reminderParts = remove_non_ascii_from_start(reminderButton.innerText).split("\n");
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
    }

    function remove_non_ascii_from_start(str) {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
        return str.replace(/^([^\x20-\x7E]+)/, '');
    }
})(this);
