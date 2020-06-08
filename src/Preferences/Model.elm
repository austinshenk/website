module Preferences.Model exposing (..)


type alias Model =
    { open : Bool
    , colorScheme : SystemPreference String
    , reducedMotion : SystemPreference String
    , textSize : Int
    }


type alias SystemPreference a =
    { override : Bool
    , systemValue : a
    , appValue : a
    }
