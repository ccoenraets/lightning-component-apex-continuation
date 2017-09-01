({
	doInvoke : function(component, event, helper) {
        // calling invoke passing (methodName, args, callback)
        component.find("proxy").invoke("count", [component.get("v.count")], function(result) {
            component.set("v.result", result);
        })
    },

})