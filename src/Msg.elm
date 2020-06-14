module Msg exposing (..)

import Browser
import Port
import Preferences.Msg
import Url exposing (Url)


type Msg
    = Noop
    | UrlRequest Browser.UrlRequest
    | UrlChange Url
    | Preference Preferences.Msg.Msg
    | Port Port.IncomingMsg
