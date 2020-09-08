module Preferences exposing (decoder, encoder, init, setAppValue, setColorScheme, setOverride, setReducedMotion, setSystemValue, setTextSize, systemPreferenceValue, update, view)

import Am
import Browser.Dom as Dom
import Html
import Html.Attributes as Attributes
import Html.Events as Events
import Icon
import Json.Decode
import Json.Encode
import Port
import Preferences.Model
import Preferences.Msg exposing (Msg(..), SystemPreferenceMsg(..))
import Process
import Task
import Tooltip exposing (tooltip)
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

        ColorScheme systemPreferenceMsg ->
            let
                preferences =
                    setColorScheme
                        (updateSystemPreference systemPreferenceMsg model.colorScheme)
                        model
            in
            ( preferences
            , Port.outgoingMessage (storePreferences preferences)
            )

        ReducedMotion systemPreferenceMsg ->
            let
                preferences =
                    setReducedMotion
                        (updateSystemPreference systemPreferenceMsg model.reducedMotion)
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


updateSystemPreference : SystemPreferenceMsg a -> Preferences.Model.SystemPreference a -> Preferences.Model.SystemPreference a
updateSystemPreference msg model =
    case msg of
        AppValue value ->
            case value of
                Nothing ->
                    model |> setOverride False

                Just appValue ->
                    model |> setAppValue appValue |> setOverride True

        SystemValue value ->
            model |> setSystemValue value


view : Preferences.Model.Model -> Html.Html Msg
view model =
    let
        { colorScheme, textSize, reducedMotion } =
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
            , Am.flexboxJustifyContent "space-between"
            ]
            [ Html.span [ Attributes.attribute "role" "heading", Attributes.attribute "aria-level" "2" ] [ Html.text "Accessibility" ]
            , tooltip "btn-preferences-close"
                (Html.text "Close")
                Ui.button
                [ Events.onClick (Open False) ]
                [ Icon.base "cross" "outline" ]
            ]
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
                , Html.label [ Am.groupItem, Am.interactive, Attributes.attribute "am-radio" "" ]
                    [ Ui.radio (textSize == 80)
                        [ Attributes.value "80"
                        , Attributes.name "textSize"
                        , Events.onInput TextSize
                        ]
                        []
                    , Icon.base
                        (if textSize == 80 then
                            "bigRadio"

                         else
                            "smallRadio"
                        )
                        "fill"
                    , Html.span [] [ Html.text "smaller" ]
                    ]
                , Html.label [ Am.groupItem, Am.interactive, Attributes.attribute "am-radio" "" ]
                    [ Ui.radio (textSize == 100)
                        [ Attributes.value "100"
                        , Attributes.name "textSize"
                        , Events.onInput TextSize
                        ]
                        []
                    , Icon.base
                        (if textSize == 100 then
                            "bigRadio"

                         else
                            "smallRadio"
                        )
                        "fill"
                    , Html.span [] [ Html.text "default" ]
                    ]
                , Html.label [ Am.groupItem, Am.interactive, Attributes.attribute "am-radio" "" ]
                    [ Ui.radio (textSize == 120)
                        [ Attributes.value "120"
                        , Attributes.name "textSize"
                        , Events.onInput TextSize
                        ]
                        []
                    , Icon.base
                        (if textSize == 120 then
                            "bigRadio"

                         else
                            "smallRadio"
                        )
                        "fill"
                    , Html.span [] [ Html.text "larger" ]
                    ]
                , Html.label [ Am.groupItem, Am.interactive, Attributes.attribute "am-radio" "" ]
                    [ Ui.radio (textSize == 150)
                        [ Attributes.value "150"
                        , Attributes.name "textSize"
                        , Events.onInput TextSize
                        ]
                        []
                    , Icon.base
                        (if textSize == 150 then
                            "bigRadio"

                         else
                            "smallRadio"
                        )
                        "fill"
                    , Html.span [] [ Html.text "largest" ]
                    ]
                ]
            , Html.section
                [ Am.groupItem
                , Am.group ""
                , Am.containerInvisible
                , Am.flexbox ""
                , Am.flexboxJustifyContent "start"
                ]
                [ Html.label [ Am.groupHeader, Attributes.for "preferences-colorscheme" ]
                    [ Html.text "Color Scheme" ]
                , Html.section [ Am.groupItem, Attributes.attribute "am-select" "", Am.interactive ]
                    [ Icon.base "downArrow" "outline"
                    , Html.select
                        [ Attributes.id "preferences-colorscheme"
                        , Events.onInput
                            (\value ->
                                if value == "default" then
                                    ColorScheme (AppValue Nothing)

                                else
                                    ColorScheme (AppValue (Just value))
                            )
                        , Attributes.value
                            (if colorScheme.override then
                                colorScheme.appValue

                             else
                                "default"
                            )
                        ]
                        [ Html.option [ Attributes.value "default" ] [ Html.text "system default" ]
                        , Html.option [ Attributes.value "light" ] [ Html.text "light" ]
                        , Html.option [ Attributes.value "dark" ] [ Html.text "dark" ]
                        ]
                    ]
                ]
            , Html.section
                [ Am.groupItem
                , Am.group ""
                , Am.containerInvisible
                , Am.flexbox ""
                , Am.flexboxJustifyContent "start"
                ]
                [ Html.label [ Am.groupHeader, Attributes.for "preferences-reducemotion" ]
                    [ Html.text "Reduce Motion" ]
                , Html.section [ Am.groupItem, Attributes.attribute "am-select" "", Am.interactive ]
                    [ Icon.base "downArrow" "outline"
                    , Html.select
                        [ Attributes.id "preferences-reducemotion"
                        , Events.onInput
                            (\value ->
                                if value == "default" then
                                    ReducedMotion (AppValue Nothing)

                                else
                                    ReducedMotion (AppValue (Just value))
                            )
                        , Attributes.value
                            (if reducedMotion.override then
                                reducedMotion.appValue

                             else
                                "default"
                            )
                        ]
                        [ Html.option [ Attributes.value "default" ] [ Html.text "system default" ]
                        , Html.option [ Attributes.value "no-preference" ] [ Html.text "no" ]
                        , Html.option [ Attributes.value "reduce" ] [ Html.text "yes" ]
                        ]
                    ]
                ]
            ]
        ]
