({
	getProduct : function(component, event, helper) {
        var productId = component.get("v.productId");
        var duration = component.get("v.duration");
        component.find("proxy").invoke("getProduct", [productId, duration], function(result) {
            var plainText = result.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
            component.set("v.result", plainText);
        })
    },

	getProducts : function(component, event, helper) {
        var duration = component.get("v.duration");
        component.find("proxy").invoke("getProducts", [duration], function(result) {
            var plainText = result.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
            component.set("v.result", plainText);
        })
    },

})