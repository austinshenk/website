module Ui exposing (..)

import W3.Html as Html
import W3.Html.Attributes as Attributes


nav attributes =
    Html.nav (Attributes.attribute "am-mod" "container" :: attributes)


a attributes =
    Html.a (Attributes.attribute "am-mod" "interactive" :: attributes)


checkbox attributes =
    Html.checkbox (Attributes.attribute "am-mod" "interactive" :: attributes)


headerAnchor attributes =
    Html.a
        (Attributes.attribute "am-mod" "interactive"
            :: Attributes.attribute "am-align" "center"
            :: attributes
        )


button attributes =
    Html.button
        (Attributes.attribute "am-mod" "interactive"
            :: Attributes.attribute "am-floating" ""
            :: attributes
        )
