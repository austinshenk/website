module Model exposing (..)

import Browser.Navigation
import Preferences.Model


type alias Model =
    { navigationKey : Browser.Navigation.Key
    , preferences : Preferences.Model.Model
    }
