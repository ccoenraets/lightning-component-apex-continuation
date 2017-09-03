({
	doInit: function (component, event, helper) {
		var vfBaseURL = "https://" + component.get("v.vfHost");
		// Listen for messages posted by the iframed VF page
		window.addEventListener("message", function (event) {
			if (event.origin !== vfBaseURL) {
				// Not the expected origin: reject message
				return;
			}
			// Only handle messages we are interested in
			if (event.data.topic === "com.mycompany.message") {
				var result = event.data.result;
				var plainText = result.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
				component.set("v.result", plainText);
			}
		}, false);
	},

	getProduct: function (component, event, helper) {
		var vfBaseURL = "https://" + component.get("v.vfHost");
		var vf = component.find("vfFrame").getElement().contentWindow;
		var message = {
			topic: "com.mycompany.message",
			productId: component.get("v.productId"),
			latency: component.get("v.latency"),
		};
		vf.postMessage(message, vfBaseURL);
	}
})