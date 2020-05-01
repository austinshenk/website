port module Main exposing (main)

import Browser
import Browser.Navigation
import Json.Decode
import Json.Encode
import Preferences exposing (SystemPreference)
import Ui
import Url exposing (Url)
import W3.Html as Html
import W3.Html.Attributes as Attributes


type alias Flags =
    Json.Decode.Value


type alias Model =
    { preferences : Preferences.Model
    , modalOpen : Bool
    }


type Msg
    = Noop
    | Modal Bool
    | TextSize String
    | ColorScheme (SystemPreference String)
    | IncomingMsg IncomingModel


type alias IncomingModel =
    { key : String
    , value : Json.Decode.Value
    }


port incomingMessage : (IncomingModel -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions _ =
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


storePreferences : Preferences.Model -> OutgoingModel
storePreferences =
    outgoingMsg "StorePreferences" << Preferences.encoder


main : Program Flags Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = onUrlRequest
        , onUrlChange = onUrlChange
        }


init : Flags -> Url -> Browser.Navigation.Key -> ( Model, Cmd Msg )
init flags url key =
    let
        model =
            case Json.Decode.decodeValue Preferences.decoder flags of
                Ok value ->
                    Model value False

                Err _ ->
                    Model (Preferences.Model (SystemPreference False "" "") (SystemPreference False "" "") "100") False
    in
    ( model, outgoingMessage (storePreferences model.preferences) )


view : Model -> Browser.Document Msg
view model =
    let
        colorScheme =
            model.preferences.colorScheme
    in
    { title = "Austin Bookhart"
    , body =
        [ Html.header
            [ Attributes.class
                [ if model.modalOpen then
                    "modalOpen"

                  else
                    ""
                ]
            ]
            [ Ui.nav []
                [ Ui.a [ Attributes.href "#" ] [ Html.text "About" ]
                , Ui.a [ Attributes.href "#" ] [ Html.text "Blog" ]
                ]
            , Ui.button [ Html.onclick (Modal True) ] [ Html.text "Accessibility" ]
            ]
            |> Html.toNode
        , Html.main_
            [ Attributes.class
                [ if model.modalOpen then
                    "modalOpen"

                  else
                    ""
                ]
            ]
            [ Html.h1 []
                [ Ui.headerAnchor
                    [ Attributes.href "#about"
                    , Attributes.id "about"
                    ]
                    [ Html.text "#" ]
                , Html.text "About"
                ]
            , Html.p []
                [ Html.text "Hello, my name is Austin Bookhart. I'm a Software Engineer that has worked primarily as a Full-Stack Developer with an emphasis towards Frontend development. My goal is to create UIs that facilitate concise user experiences and are accessible to a wide variety of audiences." ]
            ]
            |> Html.toNode
        , Html.div
            [ Attributes.id "backdrop"
            , Html.onclick (Modal False)
            , Attributes.class
                [ if model.modalOpen then
                    "visible"

                  else
                    ""
                ]
            ]
            []
            |> Html.toNode
        , Html.dialog [ Attributes.open model.modalOpen ]
            [ Html.section [ Attributes.attribute "am-mod" "container" ]
                [ Html.div []
                    [ Html.label []
                        [ Html.text "Text Size"
                        , Html.range
                            [ Attributes.value model.preferences.textSize
                            , Attributes.min 0
                            , Attributes.max 200
                            , Html.on "input"
                                (Json.Decode.map (\textSize -> Html.Event (TextSize textSize) True True)
                                    (Json.Decode.at [ "target", "value" ] Json.Decode.string)
                                )
                            ]
                        ]
                    , Html.span
                        []
                        [ Html.text model.preferences.textSize ]
                    ]
                , Html.div []
                    [ Html.label []
                        [ Html.text "Dark Mode"
                        , Ui.checkbox
                            [ Attributes.attribute "checked"
                                (if model.preferences.colorScheme.override then
                                    "true"

                                 else
                                    "false"
                                )
                            , Attributes.checked model.preferences.colorScheme.override
                            , Html.on "change"
                                (Json.Decode.map
                                    (\checked ->
                                        Html.Event
                                            (ColorScheme (Preferences.setOverride checked colorScheme))
                                            True
                                            True
                                    )
                                    (Json.Decode.at [ "target", "checked" ] Json.Decode.bool)
                                )
                            ]
                        , Ui.checkbox
                            [ Attributes.attribute "checked"
                                (if Preferences.systemPreferenceValue model.preferences.colorScheme == "dark" then
                                    "true"

                                 else
                                    "false"
                                )
                            , Attributes.checked (Preferences.systemPreferenceValue model.preferences.colorScheme == "dark")
                            , Html.on "change"
                                (Json.Decode.map
                                    (\checked ->
                                        Html.Event
                                            (ColorScheme
                                                (Preferences.setAppValue
                                                    (if checked then
                                                        "dark"

                                                     else
                                                        "light"
                                                    )
                                                    colorScheme
                                                )
                                            )
                                            True
                                            True
                                    )
                                    (Json.Decode.at [ "target", "checked" ] Json.Decode.bool)
                                )
                            ]
                        ]
                    ]
                ]
            ]
            |> Html.toNode
        ]
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        Modal open ->
            ( { model | modalOpen = open }, Cmd.none )

        TextSize textSize ->
            let
                preferences =
                    Preferences.setTextSize textSize model.preferences
            in
            ( { model
                | preferences = preferences
              }
            , outgoingMessage (storePreferences preferences)
            )

        ColorScheme colorScheme ->
            let
                preferences =
                    Preferences.setColorScheme colorScheme model.preferences
            in
            ( { model
                | preferences = preferences
              }
            , outgoingMessage (storePreferences preferences)
            )

        IncomingMsg message ->
            let
                preferences =
                    model.preferences
            in
            if message.key == "UpdateSystemColorScheme" then
                ( { model
                    | preferences =
                        { preferences
                            | colorScheme =
                                Preferences.setSystemValue
                                    (Result.withDefault preferences.colorScheme.systemValue
                                        (Json.Decode.decodeValue Json.Decode.string message.value)
                                    )
                                    preferences.colorScheme
                        }
                  }
                , Cmd.none
                )

            else
                ( model, Cmd.none )


onUrlRequest : Browser.UrlRequest -> Msg
onUrlRequest request =
    Noop


onUrlChange : Url -> Msg
onUrlChange url =
    Noop
