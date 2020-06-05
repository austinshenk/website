port module Port exposing (..)

import Json.Decode
import Json.Encode


type IncomingMsg
    = IncomingMsg IncomingModel


type alias IncomingModel =
    { key : String
    , value : Json.Decode.Value
    }


port incomingMessage : (IncomingModel -> msg) -> Sub msg


subscriptions : Sub IncomingMsg
subscriptions =
    incomingMessage IncomingMsg


port outgoingMessage : OutgoingModel -> Cmd msg


type alias OutgoingModel =
    { key : String
    , value : Json.Encode.Value
    }


outgoingMsg : String -> Json.Encode.Value -> OutgoingModel
outgoingMsg key value =
    { key = key
    , value = value
    }
