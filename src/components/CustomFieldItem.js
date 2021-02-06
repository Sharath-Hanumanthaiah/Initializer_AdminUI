import React, { useEffect, useState } from 'react';
import {
    ComboBox,
    ComboBoxItem,
    MultiComboBox,
    MultiComboBoxItem,
    Input,
    FlexBox,
    FlexBoxJustifyContent,
    FlexBoxDirection,
    FlexBoxWrap,
    FlexBoxAlignItems,
    FilterItem,
    FilterType,
    SuggestionItem
} from '@ui5/webcomponents-react';
import { DatePicker } from '@ui5/webcomponents-react/lib/DatePicker';
// import { ComboboxInput } from 'fundamental-react';
// import Select from 'react-select'
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import "@ui5/webcomponents/dist/DateRangePicker";
import { spacing } from '@ui5/webcomponents-react-base';
import axios from 'axios';


export default function CustomFieldItem(props) {

    // if(props.filterProps === undefined) {
    //     return(<> </>);
    // }else {
    //     props.filterProps.map(filter => {
    //         const label = filter.label;
    // const component = props.component;
    // const suggestion = props.suggestion;
    // const field = props.field;
    //     })
    // }
    const label = props.label;
    const component = props.component;
    const [suggestion, setSuggestion] = useState([]);
    // let suggestion = [];
    // const suggestion = props.suggestion === undefined ? [] : props.suggestion;
    const field = props.field;
    const value = props.value === undefined ? "" : props.value;
    console.log("sugg", suggestion);
    useEffect(() => {
        if (props.suggestion !== undefined && props.suggestion.valueType === "constant") {
            setSuggestion(...suggestion, props.suggestion.value);
        } else if (props.suggestion !== undefined && props.suggestion.valueType === "standard") {
            axios.get(`${process.env.REACT_APP_DOMAIN}${props.suggestion.value}`).then((data) => {
                setSuggestion(...suggestion, data.data);
            })
        }
        const dateRange = document.getElementById(field);
        if (dateRange) {
            dateRange.addEventListener("change", props.onFilterChange);
        }
    }, [])
    switch (component) {
        case "MultiComboBox":
            return (
                <FlexBox
                    direction={FlexBoxDirection.Row}
                    justifyContent={FlexBoxJustifyContent.Start}
                    wrap={FlexBoxWrap.Wrap}
                    alignItems={FlexBoxAlignItems.Start}
                >
                <FilterItem
                    label={label}
                    id={field}
                    type={FilterType.Custom}
                    style={{maxWidth: "210px", ...spacing.sapUiSmallMarginBeginEnd}}
                >
                    <MultiComboBox
                        allowCustomValues={true}
                        id={field}
                        value={value}
                        onSelectionChange={props.onFilterChange}
                        // style={{width: "50%"}}
                    >
                        {
                            suggestion.map(suggestion => (
                                <MultiComboBoxItem id={suggestion.key} text={suggestion.value} />
                            ))
                        }
                    </MultiComboBox>
                </FilterItem >
                </FlexBox>

            );
        case "ComboBox":
            return (
                <FilterItem
                    label={label}
                    id={field}
                    type={FilterType.Custom}
                    style={{maxWidth: "210px", ...spacing.sapUiSmallMarginBeginEnd}}
                    // style={{maxWidth: "210px", padding: "19px"}}
                    // style={{width: "62%"}}
                    
                >
                    {/* <ComboBox
                        // allowCustomValues={true}
                        id={field}
                        // onChange={props.onFilterChange
                        // }
                        value={value}
                    >
                        {
                            // suggestion.map(suggestion => (
                            //     <ComboBoxItem id={suggestion.key} text={suggestion.value} />
                            // ))
                            <ComboBoxItem text="test" />
                        }
                    </ComboBox> */}
                    <Input
                        id={field}
                        showSuggestions
                    >
                        {
                            suggestion.map(suggestion => (
                                <SuggestionItem text={suggestion.value} itemID={suggestion.key} />
                                ))
                        }
                    </Input>
                    {/* <Select  options={ suggestion.map(x => {
                        return({value: x.key, label: x.value});
                    })} /> */}
                    {/* <ComboboxInput
                        id={field}
                        selectionType="manual"
                        onClick = {(e) => {debugger}}
                        onSelectionChange={props.onFilterChange}
                        // onClick={props.onFilterChange}
                        options={[{key:"a",text:"aa"}]}
                    //     options={ suggestion.map(x => {
                    //     return({key: x.key, text: x.value});
                    // })}
                    > */}

                    {/* </ComboboxInput> */}
                </FilterItem>
            );
        case "Input":
            return (
                <FilterItem
                    label={label}
                    key={field}
                    type={FilterType.Custom}
                    style={{maxWidth: "210px", ...spacing.sapUiSmallMarginBeginEnd, overflow:"hidden"}}
                >
                    <Input id={field}
                        showSuggestions={false}
                        value={value}
                        onChange={props.onFilterChange}
                        nodeName="UI5-COMBOBOX"
                        // style={{maxWidth: "180px", padding: "20px"}}
                        style={{width: "100%"}}
                    >
                    </Input>
                </FilterItem>

            );
        case "DateRange":
            return (
                // <ui5-daterange-picker
                //     id="mydaterange-picker1"
                //     change={props.onFilterChange}>
                // </ui5-daterange-picker>
                // <ui5-date-picker id="myDatepicker1"></ui5-date-picker>
                <FilterItem
                    label={label}
                    key={field}
                    type={FilterType.Custom}
                    style={{maxWidth: "210px", ...spacing.sapUiSmallMarginBeginEnd}}
                >
                    <ui5-daterange-picker
                        id={field}
                    // readonly
                    // onChange={props.onFilterChange}
                    >
                    </ui5-daterange-picker>
                    {/* <DatePicker enableRangeSelection /> */}
                </FilterItem>
            );
        case "DatePicker":
            return(
                <FilterItem
                    label={label}
                    key={field}
                    type={FilterType.Custom}
                    style={{maxWidth: "210px", ...spacing.sapUiSmallMarginBeginEnd}}
                >
                    <DatePicker
                        id={field}
                        onChange={props.onFilterChange}
                        primaryCalendarType="Gregorian"
                    />
                </FilterItem>
            );
        default:
            return (<></>);
    }
}