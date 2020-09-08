module Model exposing (Model)

import Browser.Navigation
import Preferences.Model


type alias Model =
    { loaded : Bool
    , navigationKey : Browser.Navigation.Key
    , preferences : Preferences.Model.Model
    }
