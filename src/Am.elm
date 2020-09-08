module Am exposing (container, containerFloating, containerInvisible, flexbox, flexboxAlignContent, flexboxAlignItems, flexboxJustifyContent, flexboxWrap, flexitem, flexitemGrow, flexitemShrink, grid, gridAlignContent, gridAlignItems, gridAutoFlow, gridGap, gridJustifyContent, gridJustifyItems, group, groupHeader, groupItem, icon, iconStyle, interactive, interactiveFloating, tooltip)

import Html exposing (Attribute)
import Html.Attributes as Attributes


interactive : Attribute msg
interactive =
    Attributes.attribute "am-interactive" ""


interactiveFloating : Attribute msg
interactiveFloating =
    Attributes.attribute "am-interactive" "floating"


container : Attribute msg
container =
    Attributes.attribute "am-container" ""


containerInvisible : Attribute msg
containerInvisible =
    Attributes.attribute "am-container" "invisible"


containerFloating : Attribute msg
containerFloating =
    Attributes.attribute "am-container" "floating"


flexbox : String -> Attribute msg
flexbox =
    Attributes.attribute "am-flexbox"


flexboxWrap : String -> Attribute msg
flexboxWrap =
    Attributes.attribute "am-flexbox-wrap"


flexboxJustifyContent : String -> Attribute msg
flexboxJustifyContent =
    Attributes.attribute "am-flexbox-justify-content"


flexboxAlignItems : String -> Attribute msg
flexboxAlignItems =
    Attributes.attribute "am-flexbox-align-items"


flexboxAlignContent : String -> Attribute msg
flexboxAlignContent =
    Attributes.attribute "am-flexbox-align-content"


flexitem : String -> Attribute msg
flexitem =
    Attributes.attribute "am-flexitem"


flexitemGrow : String -> Attribute msg
flexitemGrow =
    Attributes.attribute "am-flexitem-grow"


flexitemShrink : String -> Attribute msg
flexitemShrink =
    Attributes.attribute "am-flexitem-shrink"


grid : Attribute msg
grid =
    Attributes.attribute "am-grid" ""


gridJustifyItems : String -> Attribute msg
gridJustifyItems =
    Attributes.attribute "am-grid-justify-items"


gridAlignItems : String -> Attribute msg
gridAlignItems =
    Attributes.attribute "am-grid-align-items"


gridJustifyContent : String -> Attribute msg
gridJustifyContent =
    Attributes.attribute "am-grid-justify-content"


gridAlignContent : String -> Attribute msg
gridAlignContent =
    Attributes.attribute "am-grid-align-content"


gridAutoFlow : String -> Attribute msg
gridAutoFlow =
    Attributes.attribute "am-grid-auto-flow"


gridGap : String -> Attribute msg
gridGap =
    Attributes.style "gap"


group : String -> Attribute msg
group =
    Attributes.attribute "am-group"


groupHeader : Attribute msg
groupHeader =
    Attributes.attribute "am-group-header" ""


groupItem : Attribute msg
groupItem =
    Attributes.attribute "am-group-item" ""


tooltip : Attribute msg
tooltip =
    Attributes.attribute "am-tooltip" ""


icon : String -> Attribute msg
icon =
    Attributes.attribute "am-icon"


iconStyle : String -> Attribute msg
iconStyle =
    Attributes.attribute "am-icon-style"
