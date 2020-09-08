module Preferences.Msg exposing (Msg(..), SystemPreferenceMsg(..))


type Msg
    = Noop
    | Open Bool
    | TextSize String
    | ColorScheme (SystemPreferenceMsg String)
    | ReducedMotion (SystemPreferenceMsg String)


type SystemPreferenceMsg a
    = AppValue (Maybe a)
    | SystemValue a
