module Am exposing (..)

import Html.Attributes as Attributes


interactive =
    Attributes.attribute "am-interactive" ""


interactiveFloating =
    Attributes.attribute "am-interactive" "floating"


container =
    Attributes.attribute "am-container" ""


containerInvisible =
    Attributes.attribute "am-container" "invisible"


containerFloating =
    Attributes.attribute "am-container" "floating"


flexbox =
    Attributes.attribute "am-flexbox"


flexboxWrap =
    Attributes.attribute "am-flexbox-wrap"


flexboxJustifyContent =
    Attributes.attribute "am-flexbox-justify-content"


flexboxAlignItems =
    Attributes.attribute "am-flexbox-align-items"


flexboxAlignContent =
    Attributes.attribute "am-flexbox-align-content"


flexitem =
    Attributes.attribute "am-flexitem"


flexitemGrow =
    Attributes.attribute "am-flexitem-grow"


flexitemShrink =
    Attributes.attribute "am-flexitem-shrink"


group =
    Attributes.attribute "am-group"


groupHeader =
    Attributes.attribute "am-group-header" ""


groupItem =
    Attributes.attribute "am-group-item" ""


tooltip =
    Attributes.attribute "am-tooltip" ""
