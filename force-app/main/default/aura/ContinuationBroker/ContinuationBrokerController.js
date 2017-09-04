({
	onContinuationRequest : function(component, event, helper) {
        var methodName = event.getParam("methodName");
        var methodParams = event.getParam("methodParams");
        methodParams = JSON.parse(JSON.stringify(methodParams));
        var callback = event.getParam("callback");
        component.find("proxy").invoke(methodName, methodParams, callback);
    }

})