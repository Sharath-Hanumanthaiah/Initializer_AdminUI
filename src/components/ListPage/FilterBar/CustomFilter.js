import React from 'react';
import {
    Button,
    ButtonDesign,
    FlexBox,
    FlexBoxJustifyContent,
    FlexBoxDirection,
    FlexBoxWrap,
    FlexBoxAlignItems,
    FilterBar
} from '@ui5/webcomponents-react'
import CustomSearch from './CustomSearch';
import { spacing } from '@ui5/webcomponents-react-base';
import CustomFieldItem from '../../CustomFieldItem.js';

export default function CustomFilter(props) {
    const searchProps = props.search;
    const filterProps = props.filter === undefined ? [] : props.filter;
    const suggestion = props.suggestion;
    if (Object.keys(props.property).length <= 0 || props.search === undefined && props.filter === undefined) {
        return (
            <>
            </>
        );
    }
    return (
        <FilterBar
            search={
                <FlexBox
                    direction={FlexBoxDirection.Row}
                    justifyContent={FlexBoxJustifyContent.SpaceAround}
                    wrap={FlexBoxWrap.Wrap}
                    alignItems={FlexBoxAlignItems.Center}
                    style={{marginTop:"10px"}}

                >
                    <CustomSearch id={"searchBar"} property={searchProps} onFilterChange={props.onFilterChange} />
                    <Button design={ButtonDesign.Emphasized} style={{ ...spacing.sapUiSmallMarginBegin }}
                        onClick={props.onGoClick}>GO</Button>
                </FlexBox>
            }
        >
            {
                <>
                <FlexBox
                    direction={FlexBoxDirection.Row}
                    justifyContent={FlexBoxJustifyContent.SpaceBetween}
                    wrap={FlexBoxWrap.Wrap}
                    alignItems={FlexBoxAlignItems.Start}
                    // style={{overflow: "hidden"}}

                >
                    {
                        filterProps.map(filter => (
                            <CustomFieldItem label={props.property[filter].label === undefined ? filter : props.property[filter].label}
                                component={props.property[filter].filterComponent}
                                field={filter}
                                suggestion={suggestion === undefined ? [] :
                                    suggestion[props.property[filter].suggestion]}
                                onFilterChange={props.onFilterChange} />
                        ))
                    }
                </FlexBox>
                </>
                
            }
        </FilterBar>
    );
}