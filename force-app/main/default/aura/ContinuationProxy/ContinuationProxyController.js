({
    doInit: function (component, event, helper) {

        component.invocationCallbacks = {};

        var action = component.get("c.getVFBaseURL");
        action.setStorable();
        action.setCallback(this, function (response) {
            var vfBaseURL = response.getReturnValue();
            component.set("v.vfBaseURL", vfBaseURL);
            var topic = component.get("v.topic");
            window.addEventListener("message", function (event) {
                if (event.origin !== vfBaseURL) {
                    // Not the expected origin: reject message
                    return;
                }
                // Only handle messages we are interested in
                if (event.data.topic === topic) {
                    // Retrieve the callback for the specified invocation id
                    var callback = component.invocationCallbacks[event.data.invocationId];
                    if (callback && typeof callback == 'function') {
                        callback(event.data.result);
                        delete component.invocationCallbacks[event.data.invocationId];
                    }
                }
            }, false);
        });
        $A.enqueueAction(action);
    },

    doInvoke: function (component, event, helper) {
        var vfBaseURL = component.get("v.vfBaseURL");
        var topic = component.get("v.topic");
        var args = event.getParam('arguments');
        var invocationId = helper.getUniqueId();
        component.invocationCallbacks[invocationId] = args.callback;
        var message = {
            topic: topic,
            invocationId: invocationId,
            methodName: args.methodName,
            methodParams: args.methodParams
        };
        var vf = component.find("vfFrame").getElement().contentWindow;
        vf.postMessage(message, vfBaseURL);
    }

})