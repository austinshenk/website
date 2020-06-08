module Preferences.Msg exposing (..)


type Msg
    = Open Bool
    | TextSize String
    | ColorScheme (SystemPreferenceMsg String) Bool


type SystemPreferenceMsg a
    = Override
    | AppValue a a
    | SystemValue a
