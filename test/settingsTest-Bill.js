const assert = require('assert');

const SettingsBill = require('../settings-bill');



describe("The bill with settings function", function () {

    it("should be able to record a call", function () {
        let settingsBills = SettingsBill();

        settingsBills.recordAction('call');
        assert.equal(1, settingsBills.actionsFor('call').length);

    })

    it("should be able to record an sms", function () {
        let settingsBills = SettingsBill();

        settingsBills.recordAction('sms');
        assert.equal(1, settingsBills.actionsFor('sms').length);

    })

    it("should be able to record sms and call", function () {
        let settingsBills = SettingsBill();
        settingsBills.recordAction('call');
        settingsBills.recordAction('sms');

        assert.equal(1, settingsBills.actionsFor('call').length);
        assert.equal(1, settingsBills.actionsFor('sms').length);

    });

    it("should be able to set the Settings", function () {
        let settingsBills = SettingsBill();
        settingsBills.setSettings({
            callCost: 2.42,
            smsCost: 1.45,
            warningLevel: 20,
            criticalLevel: 30
        });
        assert.deepEqual({
            callCost: 2.42,
            smsCost: 1.45,
            warningLevel: 20,
            criticalLevel: 30
        }, settingsBills.getSettings())
    });

    it("should be able to correctly calculate totals", function () {

        const settingsBills = SettingsBill();
        settingsBills.setSettings({
            callCost: 2.42,
            smsCost: 1.45,
            warningLevel: 20,
            criticalLevel: 30
        });

        settingsBills.recordAction('call');
        settingsBills.recordAction('sms');

        assert.equal(2.42, settingsBills.totals().callTotal);
        assert.equal(1.45, settingsBills.totals().smsTotal);
        assert.equal(3.87, settingsBills.totals().grandTotal);
    });
    it("should be able to show when the warning level is reached", function () {

        const settingsBills = SettingsBill();
        settingsBills.setSettings({
            callCost: 2.42,
            smsCost: 1.45,
            warningLevel: 3,
            criticalLevel: 10
        });

        settingsBills.recordAction('call');
        settingsBills.recordAction('call');
        settingsBills.recordAction('sms');

        assert.equal(true, settingsBills.hasReachedTheWarningLevel());

    });
    it("should be able to show when the critical level is reached", function () {

        const settingsBills = SettingsBill();
        settingsBills.setSettings({
            callCost: 2.42,
            smsCost: 1.45,
            warningLevel: 3,
            criticalLevel: 4
        });

        settingsBills.recordAction('call');
        settingsBills.recordAction('call');
        settingsBills.recordAction('sms');

        assert.equal(true, settingsBills.hasReachedTheCriticalLevel());

    });

    it ("should return a class name of 'warning' if warning level is reached", function() {

    let settingsBills = SettingsBill();
        settingsBills.setSettings({
            callCost: 2.42,
            smsCost: 1.45,
            warningLevel: 3,
            criticalLevel: 4
            
        })
        settingsBills.recordAction('call');
        settingsBills.recordAction('sms');

    assert.equal("warning", settingsBills.totalClassName());

});


it ("should return a class name of 'danger' if critical level is reached", function() {

    let settingsBills = SettingsBill();
        settingsBills.setSettings({
            callCost: 2.42,
            smsCost: 1.45,
            warningLevel: 3,
            criticalLevel: 4
            
        })
        settingsBills.recordAction('call');
        settingsBills.recordAction('call');
        settingsBills.recordAction('sms');

    assert.equal("danger", settingsBills.totalClassName());

});



});

//       it ("should be able to add up totals of", function () {

//         let settingsBills = SettingsBill();
//         settingsBills.setCriticalLevel(30);

//         assert.equal(30, settingsBills.getCriticalLevel());

//       });       

//       it ("should be able to set the warning and critical level", function () {

//         let settingsBills = SettingsBill();
//         settingsBills.setWarningLevel(15);
//         settingsBills.setCriticalLevel(25);

//     assert.equal(15, settingsBills.getWarningLevel());
//     assert.equal(25, settingsBills.getCriticalLevel());

//       });  

// });

// describe ("Use values", function() {
//     it("should be able to use call cost set 3 call at 2.25 each", function() {
//           let settingsBills = SettingsBill();

// settingsBills.setCriticalLevel(10);
//     settingsBills.setCallCost(2.25); 
//    settingsBills.setSmsCost(0.70);

//    settingsBills.makeCall();
//    settingsBills.makeCall();
//    settingsBills.makeCall();


//    assert.equal(6.75, settingsBills.getTotalCallCost());
//    assert.equal(0.00, settingsBills.getTotalSmsCost());
//    assert.equal(6.75, settingsBills.getTotalCost());
//     });

//     it("should be able to use call cost set for 2 call at 1.35 each", function() {
//         let settingsBills = SettingsBill();

// settingsBills.setCriticalLevel(10);
//   settingsBills.setCallCost(1.35); 
//  settingsBills.setSmsCost(0.70);

//  settingsBills.makeCall();
//  settingsBills.makeCall();

//  assert.equal(2.70, settingsBills.getTotalCallCost());
//  assert.equal(0.00, settingsBills.getTotalSmsCost());
//  assert.equal(2.70, settingsBills.getTotalCost());
//   });

//   it("should be able to send 2 sms's at 0.85 each", function() {
//     let settingsBills = SettingsBill();

//     settingsBills.setCriticalLevel(10);
// settingsBills.setCallCost(1.35); 
// settingsBills.setSmsCost(0.85);

// settingsBills.sendSms();
// settingsBills.sendSms();

// assert.equal(0.00, settingsBills.getTotalCallCost());
// assert.equal(1.70, settingsBills.getTotalSmsCost());
// assert.equal(1.70, settingsBills.getTotalCost());
// });

// it("should be able to send 2 sms's at 0.85 each & 1 call at 1.35", function() {
//     let settingsBills = SettingsBill();
// settingsBills.setCriticalLevel(10);
// settingsBills.setCallCost(1.35); 
// settingsBills.setSmsCost(0.85);

// settingsBills.makeCall();
// settingsBills.sendSms();
// settingsBills.sendSms();

// assert.equal(1.35, settingsBills.getTotalCallCost());
// assert.equal(1.70, settingsBills.getTotalSmsCost());
// assert.equal(3.05, settingsBills.getTotalCost());
// });
// });

// describe("warning and critical level", function () {
// it ("should return a class name of 'warning' if warning level is reached", function() {

//     let settingsBills = SettingsBill();

//     settingsBills.setCallCost(1.35); 
// settingsBills.setSmsCost(0.85);
// settingsBills.setWarningLevel(5);
// settingsBills.setCriticalLevel(10);


// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.sendSms();
// settingsBills.sendSms();

//     assert.equal("warning", settingsBills.totalClassName());

// });

// it ("should return a class name of 'critical' if critical level has been reached", function() {

//     let settingsBills = SettingsBill();


// settingsBills.setCallCost(2.50); 
// settingsBills.setSmsCost(0.75);
// settingsBills.setCriticalLevel(10);

// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.sendSms();
// settingsBills.sendSms();

//     assert.equal("danger" , settingsBills.totalClassName());

// });

// it ("should stop the Call Total from increasing when the critical level has been reached", function() {

//     let settingsBills = SettingsBill();


// settingsBills.setCallCost(2.50); 
// settingsBills.setSmsCost(0.75);
// settingsBills.setCriticalLevel(10);

// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.makeCall();

//     assert.equal("danger", settingsBills.totalClassName());
//     assert.equal(10, settingsBills.getTotalCallCost());

// });

// it ("should allow the totals to increase after reaching the critical level & then upping the critical level", function() {

//     let settingsBills = SettingsBill();


// settingsBills.setCallCost(2.50); 
// settingsBills.setSmsCost(0.75);
// settingsBills.setWarningLevel(8);
// settingsBills.setCriticalLevel(10);

// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.makeCall();
// settingsBills.makeCall();

//     assert.equal("danger", settingsBills.totalClassName());
//     assert.equal(10, settingsBills.getTotalCallCost());

//     settingsBills.setCriticalLevel(20);

//     assert.equal("warning", settingsBills.totalClassName());
//     settingsBills.makeCall();
//     settingsBills.makeCall();
//     assert.equal(15, settingsBills.getTotalCallCost());



// });
// });