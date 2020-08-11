module Preferences exposing (decoder, encoder, init, setAppValue, setColorScheme, setOverride, setReducedMotion, setSystemValue, setTextSize, systemPreferenceValue, update, view)

import Am
import Browser.Dom as Dom
import Html
import Html.Attributes as Attributes
import Html.Events as Events
import Json.Decode
import Json.Encode
import Port
import Preferences.Model
import Preferences.Msg exposing (Msg(..), SystemPreferenceMsg(..))
import Process
import Task
import Ui


encoder : Preferences.Model.Model -> Json.Encode.Value
encoder model =
    Json.Encode.object
        [ ( "colorScheme", systemPreferenceEncoder model.colorScheme )
        , ( "reducedMotion", systemPreferenceEncoder model.reducedMotion )
        , ( "textSize", Json.Encode.int model.textSize )
        ]


systemPreferenceEncoder : Preferences.Model.SystemPreference String -> Json.Encode.Value
systemPreferenceEncoder systemPreference =
    Json.Encode.object
        [ ( "override", Json.Encode.bool systemPreference.override )
        , ( "appValue", Json.Encode.string systemPreference.appValue )
        , ( "systemValue", Json.Encode.string systemPreference.systemValue )
        ]


decoder : Json.Decode.Decoder Preferences.Model.Model
decoder =
    Json.Decode.map3 (Preferences.Model.Model False)
        (Json.Decode.field "colorScheme" systemPreferenceDecoder)
        (Json.Decode.field "reducedMotion" systemPreferenceDecoder)
        (Json.Decode.field "textSize" Json.Decode.int)


systemPreferenceDecoder : Json.Decode.Decoder (Preferences.Model.SystemPreference String)
systemPreferenceDecoder =
    Json.Decode.map3 Preferences.Model.SystemPreference
        (Json.Decode.field "override" Json.Decode.bool)
        (Json.Decode.field "systemValue" Json.Decode.string)
        (Json.Decode.field "appValue" Json.Decode.string)


systemPreferenceValue : Preferences.Model.SystemPreference a -> a
systemPreferenceValue systemPreference =
    if systemPreference.override then
        systemPreference.appValue

    else
        systemPreference.systemValue


setColorScheme : Preferences.Model.SystemPreference String -> Preferences.Model.Model -> Preferences.Model.Model
setColorScheme colorScheme model =
    { model | colorScheme = colorScheme }


setReducedMotion : Preferences.Model.SystemPreference String -> Preferences.Model.Model -> Preferences.Model.Model
setReducedMotion reducedMotion model =
    { model | reducedMotion = reducedMotion }


setTextSize : Int -> Preferences.Model.Model -> Preferences.Model.Model
setTextSize textSize model =
    { model | textSize = textSize }


setSystemValue : a -> Preferences.Model.SystemPreference a -> Preferences.Model.SystemPreference a
setSystemValue systemValue systemPreference =
    { systemPreference | systemValue = systemValue }


setAppValue : a -> Preferences.Model.SystemPreference a -> Preferences.Model.SystemPreference a
setAppValue appValue systemPreference =
    { systemPreference | appValue = appValue }


setOverride : Bool -> Preferences.Model.SystemPreference a -> Preferences.Model.SystemPreference a
setOverride override systemPreference =
    { systemPreference | override = override }


storePreferences : Preferences.Model.Model -> Port.OutgoingModel
storePreferences =
    Port.outgoingMsg "StorePreferences" << encoder


init : Json.Decode.Value -> ( Preferences.Model.Model, Cmd Msg )
init model =
    let
        decodedModel =
            case Json.Decode.decodeValue decoder model of
                Ok value ->
                    value

                Err _ ->
                    Preferences.Model.Model False (Preferences.Model.SystemPreference False "" "") (Preferences.Model.SystemPreference False "" "") 100
    in
    ( decodedModel, Port.outgoingMessage (storePreferences decodedModel) )


update : Msg -> Preferences.Model.Model -> ( Preferences.Model.Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        TextSize textSize ->
            let
                preferences =
                    setTextSize (Maybe.withDefault 100 (String.toInt textSize)) model
            in
            ( preferences
            , Port.outgoingMessage (storePreferences preferences)
            )

        ColorScheme systemPreferenceMsg checked ->
            let
                preferences =
                    setColorScheme
                        (updateSystemPreference systemPreferenceMsg checked model.colorScheme)
                        model
            in
            ( preferences
            , Port.outgoingMessage (storePreferences preferences)
            )

        Open open ->
            let
                focusId =
                    if open then
                        "dialog-preferences"

                    else
                        "btn-preferences"
            in
            ( { model | open = open }
            , Task.attempt
                (\_ -> Preferences.Msg.Noop)
                (Task.sequence [ Process.sleep 250, Dom.focus focusId ])
            )


updateSystemPreference : SystemPreferenceMsg a -> Bool -> Preferences.Model.SystemPreference a -> Preferences.Model.SystemPreference a
updateSystemPreference msg checked model =
    case msg of
        Override ->
            setOverride checked model

        AppValue truthy falsy ->
            setAppValue
                (if checked then
                    truthy

                 else
                    falsy
                )
                model

        _ ->
            model


onKeyUp : (Int -> msg) -> Html.Attribute msg
onKeyUp tagger =
    Events.on "keyup" (Json.Decode.map tagger Events.keyCode)


view : Preferences.Model.Model -> Html.Html Msg
view model =
    let
        { colorScheme, textSize } =
            model
    in
    Html.section
        [ Am.group "vertical"
        , Am.container
        , Attributes.tabindex 0
        , Attributes.id "dialog-preferences"
        ]
        [ Html.section
            [ Am.groupHeader
            , Am.flexbox ""
            , Am.flexboxJustifyContent "end"
            ]
            [ Ui.button [ Events.onClick (Open False) ] [ Html.text "Close" ] ]
        , Html.form [ Am.groupItem, Am.group "vertical" ]
            [ Html.section
                [ Am.groupItem
                , Am.group ""
                , Am.containerInvisible
                , Am.flexbox ""
                , Am.flexboxJustifyContent "start"
                ]
                [ Html.span [ Am.groupHeader ]
                    [ Html.text "Text Size" ]
                , Html.label [ Am.groupItem ]
                    [ Ui.radio (textSize == 80)
                        [ Attributes.value "80"
                        , Attributes.name "textSize"
                        , Events.onInput TextSize
                        ]
                        []
                    , Html.span [] [ Html.text "small" ]
                    ]
                , Html.label [ Am.groupItem ]
                    [ Ui.radio (textSize == 100)
                        [ Attributes.value "100"
                        , Attributes.name "textSize"
                        , Events.onInput TextSize
                        ]
                        []
                    , Html.span [] [ Html.text "medium" ]
                    ]
                , Html.label [ Am.groupItem ]
                    [ Ui.radio (textSize == 120)
                        [ Attributes.value "120"
                        , Attributes.name "textSize"
                        , Events.onInput TextSize
                        ]
                        []
                    , Html.span [] [ Html.text "large" ]
                    ]
                ]
            , Html.section
                [ Am.groupItem
                , Am.group ""
                , Am.containerInvisible
                , Am.flexbox ""
                , Am.flexboxJustifyContent "start"
                ]
                [ Html.span [ Am.groupHeader ]
                    [ Html.text "Color Scheme" ]
                , Html.label
                    [ Am.groupItem
                    , Am.interactive
                    ]
                    [ Ui.checkbox colorScheme.override
                        [ Events.onCheck (ColorScheme Override)
                        ]
                        []
                    , Html.span [] [ Html.text "override" ]
                    ]
                , Html.label
                    [ Am.groupItem
                    , Am.interactive
                    , Attributes.attribute "disabled"
                        (if not colorScheme.override then
                            "true"

                         else
                            "false"
                        )
                    ]
                    [ Ui.checkbox (colorScheme.appValue == "dark")
                        [ Attributes.disabled (not colorScheme.override)
                        , Events.onCheck (ColorScheme (AppValue "dark" "light"))
                        ]
                        []
                    , Html.span [] [ Html.text "dark mode" ]
                    ]
                ]
            ]
        ]
