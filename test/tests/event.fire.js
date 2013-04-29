
buster.testCase('Event#fire()', {

  "Should fire all callbacks registered under the name": function() {
    var emitter = new Event();
    var callback1 = this.spy();
    var callback2 = this.spy();
    var name = 'eventname';

    emitter.on(name, callback1);
    emitter.on(name, callback2);

    emitter.fire(name);

    assert.called(callback1);
    assert.called(callback2);
  },

  "The callback should receive the arguments that the event was fired with": function() {
    var emitter = new Event();
    var callback = this.spy();
    var name = 'eventname';
    var arg1 = 'foo';
    var arg2 = 'bar';

    emitter.on(name, callback);
    emitter.fire(name, arg1, arg2);

    assert.isTrue(callback.calledWith(arg1, arg2));
  },

  "Should be able to fire and event name without any `.on()` listeners being registered": function() {
    var emitter = new Event();
    var spy = this.spy();
    try {
      emitter.fire('eventname');
    } catch (error) {
      spy.call();
    }
    refute.called(spy);
  },

  "Should not create a namespace (only Event#on should create namespaces)": function() {
    var emitter = new Event();

    emitter.fire('eventname');

    refute.defined(emitter._cbs['eventname']);
  },

  "Should be chainable": function() {
    var emitter = new Event();
    var callback = this.spy();

    emitter.on('eventname', callback);

    emitter
      .fire('eventname')
      .fire('eventname');

    assert.isTrue(callback.calledTwice);
  }
});