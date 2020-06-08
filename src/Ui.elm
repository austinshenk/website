module Ui exposing (..)

import Am
import Html
import Html.Attributes as Attributes


type alias Node msg =
    List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg


nav : Node msg
nav attributes =
    Html.nav (Am.container :: attributes)


a : Node msg
a attributes =
    Html.a (Am.interactive :: attributes)


checkbox : Bool -> Node msg
checkbox checked attributes =
    Html.input
        (Attributes.attribute "type" "checkbox"
            :: Attributes.attribute "checked" (boolToString checked)
            :: Attributes.checked checked
            :: attributes
        )


switch : Bool -> Node msg
switch checked attributes =
    Html.input
        (Attributes.attribute "type" "checkbox"
            :: Am.interactive
            :: Attributes.attribute "am-switch" ""
            :: Attributes.attribute "checked" (boolToString checked)
            :: Attributes.checked checked
            :: attributes
        )


radio : Bool -> Node msg
radio checked attributes =
    Html.input
        (Attributes.attribute "type" "radio"
            :: Am.interactive
            :: Attributes.attribute "checked" (boolToString checked)
            :: Attributes.checked checked
            :: attributes
        )


headerAnchor : List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg
headerAnchor attributes =
    Html.a
        (Am.interactive
            :: Attributes.attribute "am-align" "center"
            :: attributes
        )


button : Node msg
button attributes =
    Html.button
        (Am.interactiveFloating
            :: attributes
        )


boolToString : Bool -> String
boolToString bool =
    if bool then
        "true"

    else
        "false"
