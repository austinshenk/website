module Tooltip exposing (..)

import Am
import Html
import Html.Attributes as Attributes


tooltip : String -> Html.Html msg -> (List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg) -> List (Html.Attribute msg) -> List (Html.Html msg) -> Html.Html msg
tooltip id content origin attributes body =
    Html.section [ Am.tooltip ]
        [ origin
            (Attributes.attribute "aria-labelledby" (id ++ "-tooltip")
                :: Attributes.tabindex 0
                :: attributes
            )
            body
        , Html.section
            [ Attributes.attribute "id" (id ++ "-tooltip")
            , Am.containerFloating
            , Attributes.attribute "role" "tooltip"
            ]
            [ content ]
        ]
