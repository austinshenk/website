module Preferences.Msg exposing (..)


type Msg
    = Noop
    | Open Bool
    | TextSize String
    | ColorScheme (SystemPreferenceMsg String)


type SystemPreferenceMsg a
    = AppValue (Maybe a)
    | SystemValue a
