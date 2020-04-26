port module Main exposing (main)

import Browser
import Browser.Navigation
import Json.Decode as Json
import Url exposing (Url)
import W3.Html as Html
import W3.Html.Attributes as Attributes


type alias Flags =
    Json.Value


type alias Preferences =
    { colorScheme : String
    , reducedMotion : String
    , textSize : String
    }


type alias Model =
    { preferences : Preferences
    , modalOpen : Bool
    }


type Msg
    = Noop
    | Modal Bool
    | TextSize String
    | ColorScheme String
    | Port Preferences


port sendMessage : Preferences -> Cmd msg


port messageReceiver : (Preferences -> msg) -> Sub msg


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
        flagsDecoder =
            Json.map3 Preferences
                (Json.field "colorScheme" Json.string)
                (Json.field "reducedMotion" Json.string)
                (Json.field "textSize" Json.string)

        model =
            case Json.decodeValue flagsDecoder flags of
                Ok value ->
                    Model value False

                Err _ ->
                    Model (Preferences "" "" "100") False
    in
    ( model, Cmd.none )


view : Model -> Browser.Document Msg
view model =
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
            [ Html.nav [ Attributes.attribute "am-mod" "container" ]
                [ Html.a [ Attributes.attribute "am-mod" "interactive", Attributes.href "#" ] [ Html.text "About" ]
                , Html.a [ Attributes.attribute "am-mod" "interactive", Attributes.href "#" ] [ Html.text "Blog" ]
                ]
            , Html.button [ Attributes.attribute "am-mod" "interactive", Attributes.attribute "am-floating" "", Html.onclick (Modal True) ] [ Html.text "Accessibility" ]
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
                [ Html.a
                    [ Attributes.href "#about"
                    , Attributes.id "about"
                    , Attributes.attribute "am-mod" "interactive"
                    , Attributes.attribute "am-align" "center"
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
                                (Json.map (\textSize -> Html.Event (TextSize textSize) True True)
                                    (Json.at [ "target", "value" ] Json.string)
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
                        , Html.checkbox
                            [ Attributes.attribute "am-mod" "interactive"
                            , Attributes.checked
                                (model.preferences.colorScheme == "dark")
                            , Html.on "change"
                                (Json.map
                                    (\checked ->
                                        Html.Event
                                            (ColorScheme
                                                (if checked then
                                                    "dark"

                                                 else
                                                    "light"
                                                )
                                            )
                                            True
                                            True
                                    )
                                    (Json.at [ "target", "checked" ] Json.bool)
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
                    model.preferences

                preferencesUpdated =
                    { preferences
                        | textSize = textSize
                    }
            in
            ( { model
                | preferences = preferencesUpdated
              }
            , sendMessage preferencesUpdated
            )

        ColorScheme colorScheme ->
            let
                preferences =
                    model.preferences

                preferencesUpdated =
                    { preferences
                        | colorScheme = colorScheme
                    }
            in
            ( { model
                | preferences = preferencesUpdated
              }
            , sendMessage preferencesUpdated
            )

        Port preferences ->
            ( { model
                | preferences = preferences
              }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    messageReceiver Port


onUrlRequest : Browser.UrlRequest -> Msg
onUrlRequest request =
    Noop


onUrlChange : Url -> Msg
onUrlChange url =
    Noop
