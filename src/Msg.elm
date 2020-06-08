module Msg exposing (..)

import Port
import Preferences.Msg


type Msg
    = Noop
    | Preference Preferences.Msg.Msg
    | Port Port.IncomingMsg
