module Icon exposing (accessibility, base)

import Am
import Svg
import Svg.Attributes as Attributes


base : String -> String -> Svg.Svg msg
base icon style =
    Svg.svg [ Am.icon icon, Am.iconStyle style, Attributes.width "16px", Attributes.height "16px", Attributes.viewBox "0 0 16 16" ]
        [ Svg.path [] [] ]


accessibility : Svg.Svg msg
accessibility =
    Svg.svg [ Am.icon "", Am.iconStyle "fill", Attributes.style "margin-bottom: 0; width: auto; height: calc(8px + 2ex)", Attributes.viewBox "0 0 1224 792" ]
        [ Svg.path [ Attributes.d "M834 368c-8-8-19-13-30-12l-134 7 74-83c10-12 13-28 9-43-2-9-8-18-17-24L560 111c-15-9-33-7-45 4l-86 77a38 38 0 1051 57l65-58 54 31-95 109c-39 6-75 24-103 50l50 50a126 126 0 01211 94c0 32-12 62-33 84l50 50a196 196 0 0033-221l52-3-12 155a38 38 0 0076 6l16-198c1-12-3-22-10-30zM762 203a64 64 0 100-129 64 64 0 000 129zM536 651a126 126 0 01-105-197l-50-51a197 197 0 00276 276l-50-50c-21 14-45 22-71 22z" ] []
        ]
