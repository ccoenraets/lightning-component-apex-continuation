({
	getProduct : function(component, event, helper) {
        var productId = component.get("v.productId");
        var latency = component.get("v.latency");
        component.find("proxy").invoke("getProduct", [productId, latency], function(result) {
            var plainText = result.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
            component.set("v.result", plainText);
        })
    },

	getProducts : function(component, event, helper) {
        var latency = component.get("v.latency");
        component.find("proxy").invoke("getProducts", [latency], function(result) {
            var plainText = result.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
            component.set("v.result", plainText);
        })
    },

})