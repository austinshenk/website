module Preferences.Msg exposing (..)


type Msg
    = Noop
    | Open Bool
    | TextSize String
    | ColorScheme (SystemPreferenceMsg String)
    | ReducedMotion (SystemPreferenceMsg String)


type SystemPreferenceMsg a
    = AppValue (Maybe a)
    | SystemValue a
