import moment from 'moment';

export default function getFieldValue(e) {
    const component = e.target.nodeName;
    switch (component) {
        case "UI5-MULTI-COMBOBOX":
            const multivalue = e.detail.items.map(item => item.id);
            if (multivalue.length <= 0) {
                return ("");
            } else {
                return (multivalue);
            }
        case "UI5-COMBOBOX":
            const value = e.target.value;
            const filteredItem = e.target.items.filter(item => item.text === value);
            if (filteredItem.length > 0) {
                return (filteredItem[0].id);
            } else {
                return ("");
            }
            break;
        case "UI5-INPUT":
            const nodeMap = e.target.attributes;
            if(!nodeMap.getNamedItem("show-suggestions")) {
                return (e.target.value);
            }else {
                let value = e.target.value;
                let returnValue = null;
                e.target.childNodes.forEach(element => {
                    if(value === element.text) {
                        returnValue = element.attributes.itemid.nodeValue;
                    }
                });
                if(!returnValue) {
                    e.target.value ="";
                }
                return(returnValue);
            }
            

        case "UI5-DATERANGE-PICKER":
            return ({
                "firstValue": e.target.firstDateValue,
                "lastValue": e.target.lastDateValue
            });
        case "UI5-DATEPICKER": 
            if(e.target.value) {
                return(formatDate(e.target.value));
            }else {
                return("");
            }
        default:
            break;
    }
}

const formatDate = (date) => {
    return (moment(date).format('YYYY-MM-DD[T00:00:00.000Z]'));
}