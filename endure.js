//	Author: 	Ryan Mitchener
//	Date: 		October, 2013

// Endure Event Object
function Endure(target, selector, type, callback, useCapture) {
	this.target = target || document.body;
	this.selector = selector;
	this.eventType = type;
	this.callback = callback;
	this.useCapture = useCapture || false;
	this.elements = [];
	this.config = {attributes: true, childList: true, characterData: true, subtree: true};
	this.connect();
};


// Connect the Mutation Observer
Endure.prototype.connect = function() {
	this.observer = new MutationObserver(this.observerCallback.bind(this));
	this.observer.observe(this.target, this.config);
	this.attach();
};


// Mutation Observer Callback
Endure.prototype.observerCallback = function(recordList) {
	// Remove all events and start with a clean slate
	for (var i=0, l=this.elements.length; i < l; i++) {
		this.elements[i].removeEventListener(this.eventType, this.callback, this.useCapture);
	}
	this.elements = [];
	this.attach();
};


// Attaches all events for endure instance
Endure.prototype.attach = function() {
	var elements = this.target.querySelectorAll(this.selector);
	for (var i=0, l=elements.length; i < l; i++) {
		elements[i].addEventListener(this.eventType, this.callback, this.useCapture);
		this.elements.push(elements[i]);
	}
}


// Detaches all events for endure instance
Endure.prototype.detach = function() {
	for (var i=0, l=this.elements.length; i < l; i++) {
		this.elements[i].removeEventListener(this.eventType, this.callback, this.useCapture);
	}
	this.elements = [];
}