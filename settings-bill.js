module.exports = function SettingsBill() {
    let callCost;
    let smsCost;
    let warningLevel;
    let criticalLevel;

    let actionList = [];


    function setSettings(settings) {
        callCost = Number(settings.callCost);
        smsCost = Number(settings.smsCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }

    function getSettings() {

        return {
            callCost,
            smsCost,
            warningLevel,
            criticalLevel
        }
    }

    function recordAction(action) {
        let cost = 0;
        if (action === 'sms') {
            cost = smsCost;
        }
        else if (action === 'call') {
            cost = callCost;
        }

        actionList.push({
            type: action,
            cost,
            timestamp: new Date()
        });
    }

    function actions() {
        return actionList;
    }

    function actionsFor(type) {
        return actionList.filter((action) => action.type === type);
    }



    function getTotal(type) {

        return actionList.reduce((total, action) => {
            let val = action.type === type ? action.cost : 0;
            return total + val;
        }, 0);
    }



    function totals() {
        let smsTotal = getTotal('sms')
        let callTotal = getTotal('call')
        let grandTotal = smsTotal + callTotal
        return {
            smsTotal,
            callTotal,
            grandTotal
        }
    }


    function hasReachedTheWarningLevel() {
        let smsTotal = getTotal('sms')
        let callTotal = getTotal('call')
        let grandTotal = smsTotal + callTotal
        var total = grandTotal;
        return total >= warningLevel && total <= criticalLevel;
    }


    function hasReachedTheCriticalLevel() {
        let smsTotal = getTotal('sms')
        let callTotal = getTotal('call')
        let grandTotal = smsTotal + callTotal
        var total = grandTotal;
        return total >= criticalLevel;
    }

    function totalClassName() {
        if (hasReachedTheCriticalLevel()) {
            return "danger";
        }

        else if (hasReachedTheWarningLevel()) {
            return "warning";
        }

    }
    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        getTotal,
        totals,
        hasReachedTheWarningLevel,
        totalClassName,
        hasReachedTheCriticalLevel

    };
}