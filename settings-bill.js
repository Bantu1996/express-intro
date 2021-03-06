module.exports = function SettingsBill() {
    let callCost;
    let smsCost;
    let warningLevel;
    let criticalLevel;

    let actionList = [];


    function setSettings(settings) {
        callCost = Number(settings.callCost);
        smsCost = Number(settings.smsCost);
        warningLevel = Number(settings.warningLevel);
        criticalLevel = Number(settings.criticalLevel);
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
        if (!hasReachedTheCriticalLevel()) {
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


function grandTotal() {
   return getTotal('sms') + getTotal('call')
}
    function totals() {
        let smsTotal = getTotal('sms').toFixed(2)
        let callTotal = getTotal('call').toFixed(2)
    
        return {
            smsTotal,
            callTotal,
            grandTotal: grandTotal().toFixed(2)
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
        hasReachedTheCriticalLevel,
        grandTotal

    };
}