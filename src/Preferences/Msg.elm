module Preferences.Msg exposing (..)


type Msg
    = TextSize String
    | ColorScheme (SystemPreferenceMsg String) Bool


type SystemPreferenceMsg a
    = Override
    | AppValue a a
    | SystemValue a
