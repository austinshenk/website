module Msg exposing (Msg(..))

import Browser
import Port
import Preferences.Msg
import Url exposing (Url)


type Msg
    = Noop
    | Loaded ()
    | UrlRequest Browser.UrlRequest
    | UrlChange Url
    | Preference Preferences.Msg.Msg
    | Port Port.IncomingMsg
