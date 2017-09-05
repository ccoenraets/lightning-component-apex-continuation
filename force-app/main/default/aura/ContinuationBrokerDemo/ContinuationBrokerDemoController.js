({
    getProduct : function(component, event, helper) {
        var productId = component.get("v.productId");
        var latency = component.get("v.latency");
        var request = $A.get("e.c:ContinuationRequest");
        request.setParams({ 
            methodName: "getProduct",
            methodParams: [productId, latency],
            callback: function(result) {
                var plainText = result.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
                component.set("v.result", plainText);
            }
        });
        request.fire();
    },

	getProducts : function(component, event, helper) {
        var latency = component.get("v.latency");
        var request = $A.get("e.c:ContinuationRequest");
        request.setParams({ 
            methodName: "getProducts",
            methodParams: [latency],
            callback: function(result) {
                var plainText = result.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
                component.set("v.result", plainText);
            }
        });
        request.fire();
    },

})