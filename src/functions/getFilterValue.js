import moment from 'moment';

export default function getFilterValuegetFilterValue(e) {
    const component = e.target.nodeName;
    switch (component) {
        case "UI5-MULTI-COMBOBOX":
            const multivalue = e.detail.items.map(item => item.id);
            if (multivalue.length <= 0) {
                return ({});
            } else {
                return ({
                    "operend": multivalue,
                    "operator": "eq"
                });
            }
        case "UI5-COMBOBOX":
            const value = e.target.value;
            const filteredItem = e.target.items.filter(item => item.text === value);
            if (filteredItem.length > 0) {
                return ({
                    "operend": filteredItem[0].id,
                    "operator": "eq"
                });
            } else {
                return ({});
            }
            break;
        case "UI5-INPUT":
            const nodeMap = e.target.attributes;
            if(!nodeMap.getNamedItem("show-suggestions")) {
                return ({
                    "operend": e.target.value,
                    "operator": "eq"
                });
            }else {
                let value = e.target.value;
                let returnValue = {};
                e.target.childNodes.forEach(element => {
                    if(value === element.text) {
                        returnValue ={
                            "operend": element.attributes.itemid.nodeValue,
                            "operator": "eq"
                        };
                    }
                });
                if(Object.keys(returnValue).length <= 0) {
                    e.target.value ="";
                }
                return(returnValue);
            }
            break;

        case "UI5-DATERANGE-PICKER":
            if(e.target.value === ""){
                return({});
            }else {
                return ([{
                    "operend": formatDate(e.target.firstDateValue),
                    "operator": "ge"
                }, {
                    "operend": formatDate(e.target.lastDateValue),
                    "operator": "le"
                }]);
            }
        case "UI5-DATEPICKER": 
        if (e.target.value) {
            return ({
                "operend": formatDate(e.target.value),
                "operator": "eq"
            });
        } else {
            return ({});
        }
        default:
            break;
    }
}

const formatDate = (date) => {
    return (moment(date).format('YYYY-MM-DD[T00:00:00.000Z]'));
}