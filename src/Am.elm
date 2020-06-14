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


tooltip =
    Attributes.attribute "am-tooltip" ""
