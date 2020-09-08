port module Port exposing (IncomingMsg(..), outgoingMessage, subscriptions)

import Json.Decode
import Json.Encode


subscriptions : Sub IncomingMsg
subscriptions =
    incomingMessage IncomingMsg


port incomingMessage : (IncomingModel -> msg) -> Sub msg


type IncomingMsg
    = IncomingMsg IncomingModel


type alias IncomingModel =
    { key : String
    , value : Json.Decode.Value
    }


port outgoingMessage : OutgoingModel -> Cmd msg


type alias OutgoingModel =
    { key : String
    , value : Json.Encode.Value
    }
