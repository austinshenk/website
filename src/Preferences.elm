module Preferences exposing (Model, SystemPreference, decoder, encoder, setAppValue, setColorScheme, setOverride, setReducedMotion, setSystemValue, setTextSize, systemPreferenceValue)

import Json.Decode
import Json.Encode


type alias Model =
    { colorScheme : SystemPreference String
    , reducedMotion : SystemPreference String
    , textSize : String
    }


type alias SystemPreference a =
    { override : Bool
    , systemValue : a
    , appValue : a
    }


encoder : Model -> Json.Encode.Value
encoder model =
    Json.Encode.object
        [ ( "colorScheme", systemPreferenceEncoder model.colorScheme )
        , ( "reducedMotion", systemPreferenceEncoder model.reducedMotion )
        , ( "textSize", Json.Encode.string model.textSize )
        ]


systemPreferenceEncoder : SystemPreference String -> Json.Encode.Value
systemPreferenceEncoder systemPreference =
    Json.Encode.object
        [ ( "override", Json.Encode.bool systemPreference.override )
        , ( "appValue", Json.Encode.string systemPreference.appValue )
        , ( "systemValue", Json.Encode.string systemPreference.systemValue )
        ]


decoder : Json.Decode.Decoder Model
decoder =
    Json.Decode.map3 Model
        (Json.Decode.field "colorScheme" systemPreferenceDecoder)
        (Json.Decode.field "reducedMotion" systemPreferenceDecoder)
        (Json.Decode.field "textSize" Json.Decode.string)


systemPreferenceDecoder : Json.Decode.Decoder (SystemPreference String)
systemPreferenceDecoder =
    Json.Decode.map3 SystemPreference
        (Json.Decode.field "override" Json.Decode.bool)
        (Json.Decode.field "systemValue" Json.Decode.string)
        (Json.Decode.field "appValue" Json.Decode.string)


systemPreferenceValue : SystemPreference a -> a
systemPreferenceValue systemPreference =
    if systemPreference.override then
        systemPreference.appValue

    else
        systemPreference.systemValue


setColorScheme : SystemPreference String -> Model -> Model
setColorScheme colorScheme model =
    { model | colorScheme = colorScheme }


setReducedMotion : SystemPreference String -> Model -> Model
setReducedMotion reducedMotion model =
    { model | reducedMotion = reducedMotion }


setTextSize : String -> Model -> Model
setTextSize textSize model =
    { model | textSize = textSize }


setSystemValue : a -> SystemPreference a -> SystemPreference a
setSystemValue systemValue systemPreference =
    { systemPreference | systemValue = systemValue }


setAppValue : a -> SystemPreference a -> SystemPreference a
setAppValue appValue systemPreference =
    { systemPreference | appValue = appValue }


setOverride : Bool -> SystemPreference a -> SystemPreference a
setOverride override systemPreference =
    { systemPreference | override = override }
