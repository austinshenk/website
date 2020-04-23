module Main exposing (main)

import Browser
import Browser.Navigation
import Json.Decode as Json
import Json.Encode
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


type alias Supports =
    { variables : Bool }


type alias FlagsModel =
    { preferences : Preferences
    , supports : Supports
    }


type alias Model =
    { preferences : Preferences
    , supports : Supports
    , modalOpen : Bool
    }


type Msg
    = Noop
    | Modal Bool
    | TextSize String


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
            Json.map2 FlagsModel
                (Json.field "preferences"
                    (Json.map3 Preferences
                        (Json.field "colorScheme" Json.string)
                        (Json.field "reducedMotion" Json.string)
                        (Json.field "textSize" Json.string)
                    )
                )
                (Json.field "supports"
                    (Json.map Supports
                        (Json.field "variables" Json.bool)
                    )
                )

        model =
            case Json.decodeValue flagsDecoder flags of
                Ok value ->
                    Model value.preferences value.supports False

                Err error ->
                    Model (Preferences "" "" "100") (Supports False) False
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
            [ Html.nav []
                [ Html.a [ Attributes.href "#" ] [ Html.text "About" ]
                , Html.a [ Attributes.href "#" ] [ Html.text "Blog" ]
                ]
            , Html.button [ Html.onclick (Modal True) ] [ Html.text "Accessibility" ]
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
                    , Attributes.attribute "align" "center"
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
            [ Html.section []
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
            ]
            |> Html.toNode
        ]
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        preferences =
            model.preferences
    in
    case msg of
        Noop ->
            ( model, Cmd.none )

        Modal open ->
            ( { model | modalOpen = open }, Cmd.none )

        TextSize textSize ->
            ( { model
                | preferences =
                    { preferences
                        | textSize = textSize
                    }
              }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


onUrlRequest : Browser.UrlRequest -> Msg
onUrlRequest request =
    Noop


onUrlChange : Url -> Msg
onUrlChange url =
    Noop
